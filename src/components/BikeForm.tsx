import { type FormEvent, useState } from 'react'
import { BIKE_RENTAL_LOCATION } from '../constants/locations'
import { openWhatsAppWithFallback } from '../utils/whatsapp'

export function BikeForm() {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const isValid = name.trim().length > 0 && startDate.length > 0 && returnDate.length > 0 && returnDate >= startDate
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const message = `Bike Rental Quote Request\nName: ${name.trim()}\nStart Date: ${startDate}\nReturn Date: ${returnDate}\nPickup & Return: ${BIKE_RENTAL_LOCATION}`
    await openWhatsAppWithFallback(message, '/events/whatsapp-open/bike')
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
        <input 
          aria-label="Name" 
          placeholder="e.g. Jane Smith"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-pine-green focus:outline-none" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wider">Pickup & Return Location</label>
        <div className="w-full rounded-lg border border-slate-200 bg-slate-100 p-3 text-sm text-slate-600">
          {BIKE_RENTAL_LOCATION}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wider">Start Date</label>
        <input 
          aria-label="Start Date" 
          type="date" 
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-pine-green focus:outline-none [color-scheme:light]" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wider">Return Date</label>
        <input 
          aria-label="Return Date" 
          type="date" 
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-pine-green focus:outline-none [color-scheme:light]" 
          value={returnDate} 
          min={startDate} 
          onChange={(e) => setReturnDate(e.target.value)} 
        />
      </div>

      <button 
        disabled={!isValid} 
        className="w-full rounded-lg bg-sunset-orange py-3 font-semibold text-white transition-all hover:bg-opacity-90 active:scale-[0.98] disabled:opacity-40 md:col-span-2" 
        type="submit"
      >
        Request Quote via WhatsApp
      </button>
    </form>
  )
}
