import { expect, test } from '@playwright/test'

test('service tabs and no mobile overflow', async ({ page }) => {
  await page.goto('/')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  expect(overflow).toBeFalsy()
  await expect(page.getByRole('button', { name: 'Book a Cab' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Rent a Bike' })).toBeVisible()
  await expect(page.getByText('Request a Quote')).toBeVisible()
  await page.getByRole('button', { name: 'Rent a Bike' }).click()
  // Ensure the form is still visible after switching
  await expect(page.getByText('Request a Quote')).toBeVisible()
})

test('cab form submission builds expected whatsapp message', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => { 
    (window as any).__lastOpenUrl = ''; 
    window.open = ((u: string) => { (window as any).__lastOpenUrl = u; return {} as Window }) as any;
    // Also mock location.assign as it's used as fallback
    (window as any).location.assign = (u: string) => { (window as any).__lastOpenUrl = u; };
  })
  await page.getByLabel('Name').fill('Ravi')
  await page.getByLabel('Date').fill('2026-05-20')
  await page.getByLabel('Passengers').fill('3')
  await page.locator('#cab-category').click()
  await page.getByRole('option', { name: '7 Seater' }).click()
  await page.getByRole('button', { name: 'Request Quote via WhatsApp' }).click()
  
  // Wait a bit for the async submission to complete
  await page.waitForFunction(() => (window as any).__lastOpenUrl !== '')
  
  const text = await page.evaluate(() => {
    const urlStr = (window as any).__lastOpenUrl;
    if (!urlStr) return '';
    const url = new URL(urlStr);
    return decodeURIComponent(url.searchParams.get('text') || '');
  })
  expect(text).toContain('Cab Quote Request')
  expect(text).toContain('Name: Ravi')
  expect(text).toContain('Vehicle: 7 Seater')
})

test('bike form submission includes fixed rental location', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Rent a Bike' }).click()
  await expect(page.getByText('Pickup & Return Location')).toHaveCount(0)
  await page.evaluate(() => { 
    (window as any).__lastOpenUrl = ''; 
    window.open = ((u: string) => { (window as any).__lastOpenUrl = u; return {} as Window }) as any;
    (window as any).location.assign = (u: string) => { (window as any).__lastOpenUrl = u; };
  })
  await page.getByLabel('Name').fill('Asha')
  await page.getByLabel('Start Date').fill('2026-05-20')
  await page.getByLabel('Return Date').fill('2026-05-21')
  await page.locator('#bike-vehicle').click()
  await page.getByRole('option', { name: 'Scooter (Activa/Jupiter)' }).click()
  await page.getByRole('button', { name: 'Request Quote via WhatsApp' }).click()
  
  await page.waitForFunction(() => (window as any).__lastOpenUrl !== '')

  const text = await page.evaluate(() => {
    const urlStr = (window as any).__lastOpenUrl;
    if (!urlStr) return '';
    const url = new URL(urlStr);
    return decodeURIComponent(url.searchParams.get('text') || '');
  })
  expect(text).toContain('Bike Rental Quote Request')
  expect(text).toContain('Vehicle: Scooter (Activa/Jupiter)')
  expect(text).toContain('Pickup & Return: Kathgodam')
})
