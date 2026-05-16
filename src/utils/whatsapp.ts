const FALLBACK_PHONE = '910000000000'

export function getAdminPhoneNumber(): string {
  return import.meta.env.VITE_ADMIN_PHONE_NUMBER?.trim() || FALLBACK_PHONE
}

export function buildWhatsAppUrl(phoneNumber: string, text: string): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
}

export async function trackConversionPath(path: string): Promise<void> {
  const previous = `${window.location.pathname}${window.location.search}${window.location.hash}`
  window.history.pushState({}, '', path)
  await new Promise((resolve) => setTimeout(resolve, 0))
  window.history.replaceState({}, '', previous)
}

export async function openWhatsAppWithFallback(message: string, conversionPath: string): Promise<void> {
  await trackConversionPath(conversionPath)
  const url = buildWhatsAppUrl(getAdminPhoneNumber(), message)
  const popup = window.open(url, '_blank', 'noopener,noreferrer')
  if (!popup) {
    window.location.assign(url)
  }
}
