import { type FormEvent, useState } from 'react'
import { CAB_DROPOFF_POINTS, CAB_PICKUP_POINTS } from '../constants/locations'
import { openWhatsAppWithFallback } from '../utils/whatsapp'

export function CabForm() {
  const [name, setName] = useState('')
  const [pickup, setPickup] = useState<string>(CAB_PICKUP_POINTS[0])
  const [dropoff, setDropoff] = useState<string>(CAB_DROPOFF_POINTS[0])
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [category, setCategory] = useState('SUV')
  const isValid = name.trim().length > 0 && date.length > 0 && Number.isInteger(Number(passengers)) && Number(passengers) >= 1
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const message = `Cab Quote Request\nName: ${name.trim()}\nPickup: ${pickup}\nDrop-off: ${dropoff}\nDate: ${date}\nPassengers: ${passengers}\nCategory: ${category}`
    await openWhatsAppWithFallback(message, '/events/whatsapp-open/cab')
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
        <input 
          aria-label="Name" 
          placeholder="e.g. John Doe"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-pine-green focus:outline-none" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wider">Pickup</label>
        <select 
          aria-label="Pickup" 
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-pine-green focus:outline-none" 
          value={pickup} 
          onChange={(e) => setPickup(e.target.value)}
        >
          {CAB_PICKUP_POINTS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wider">Drop-off</label>
        <select 
          aria-label="Drop-off" 
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-pine-green focus:outline-none" 
          value={dropoff} 
          onChange={(e) => setDropoff(e.target.value)}
        >
          {CAB_DROPOFF_POINTS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wider">Travel Date</label>
        <input 
          aria-label="Date" 
          type="date" 
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-pine-green focus:outline-none [color-scheme:light]" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wider">Passengers</label>
        <input 
          aria-label="Passengers" 
          type="number" 
          min="1" 
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-pine-green focus:outline-none" 
          value={passengers} 
          onChange={(e) => setPassengers(e.target.value)} 
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-1 block text-xs font-semibold text-slate-500 uppercase tracking-wider">Preferred Vehicle (SUV, Sedan, etc.)</label>
        <input 
          aria-label="Category" 
          placeholder="e.g. SUV, Innova"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm focus:border-pine-green focus:outline-none" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
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
