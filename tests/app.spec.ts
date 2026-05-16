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
  // Blur any open date pickers
  await page.mouse.click(0, 0)
  await page.locator('#cab-category').click()
  await page.getByRole('option', { name: '7 Seater' }).click()
  await page.getByRole('button', { name: 'Request Quote' }).click({ force: true })
  
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
  // Blur any open date pickers by clicking outside
  await page.mouse.click(0, 0)
  await page.locator('#bike-vehicle').click()
  await page.getByRole('option', { name: 'Scooter (Activa/Jupiter)' }).click()
  await page.getByRole('button', { name: 'Request Quote' }).click({ force: true })
  
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

test('layout and view experience integrity', async ({ page }) => {
  await page.goto('/')
  
  // 1. Programmatic Chipping Check (Horizontal Overflow)
  const overflowingElements = await page.evaluate(() => {
    const allElements = document.querySelectorAll('*')
    const overflow = []
    const viewportWidth = window.innerWidth
    
    for (const el of allElements) {
      const rect = el.getBoundingClientRect()
      // We check if any element extends beyond the right edge of the viewport.
      // We allow a 1px margin for rounding errors in some browsers.
      if (rect.right > viewportWidth + 1) {
        const style = window.getComputedStyle(el)
        // Only report if it's not a hidden element or something that's meant to be off-screen
        if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
          overflow.push({
            tag: el.tagName,
            id: el.id,
            className: el.className,
            right: rect.right,
            viewport: viewportWidth
          })
        }
      }
    }
    return overflow
  })

  expect(overflowingElements, `Found ${overflowingElements.length} elements causing horizontal overflow (chipping): ${JSON.stringify(overflowingElements, null, 2)}`).toEqual([])

  // 2. Visual Regression Snapshot
  // Ensure everything is settled before snapshot
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveScreenshot('landing-page.png', { 
    fullPage: true,
    maxDiffPixelRatio: 0.05 
  })
})
