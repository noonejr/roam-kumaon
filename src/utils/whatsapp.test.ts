import { beforeEach, describe, expect, it, vi } from 'vitest'
import { buildWhatsAppUrl, getAdminPhoneNumber, openWhatsAppWithFallback, trackConversionPath } from './whatsapp'

describe('whatsapp utils', () => {
  beforeEach(() => vi.restoreAllMocks())
  it('builds encoded wa url', () => {
    expect(buildWhatsAppUrl('91123', 'Hi there')).toContain('text=Hi%20there')
  })
  it('returns fallback phone when env not set', () => {
    expect(getAdminPhoneNumber()).toBeTruthy()
  })
  it('uses popup flow when available', async () => {
    const open = vi.spyOn(window, 'open').mockReturnValue({} as Window)
    await openWhatsAppWithFallback('test', '/events/whatsapp-open/cab')
    expect(open).toHaveBeenCalled()
  })
  it('tracks conversion path with push and replace', async () => {
    vi.useFakeTimers()
    const push = vi.spyOn(window.history, 'pushState')
    const replace = vi.spyOn(window.history, 'replaceState')
    const p = trackConversionPath('/events/whatsapp-open/cab')
    vi.runAllTimers()
    await p
    expect(push).toHaveBeenCalled()
    expect(replace).toHaveBeenCalled()
    vi.useRealTimers()
  })
})
