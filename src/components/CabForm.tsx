import { type FormEvent, useState, lazy, Suspense } from 'react'
import { CAB_DROPOFF_POINTS, CAB_PICKUP_POINTS } from '../constants/locations'
import { CAB_VEHICLES } from '../constants/vehicles'
import { openWhatsAppWithFallback } from '../utils/whatsapp'
import { CustomSelect } from './ui/CustomSelect'

const CustomDatePicker = lazy(() =>
  import('./ui/CustomDatePicker').then(m => ({ default: m.CustomDatePicker }))
)

const today = new Date().toLocaleDateString('en-CA')

export function CabForm() {
  const [name, setName] = useState('')
  const [pickup, setPickup] = useState<string>(CAB_PICKUP_POINTS[0])
  const [dropoff, setDropoff] = useState<string>(CAB_DROPOFF_POINTS[0])
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [category, setCategory] = useState<string>('')
  const isValid = name.trim().length > 0 && date.length > 0 && Number.isInteger(Number(passengers)) && Number(passengers) >= 1 && category.length > 0
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const message = `Cab Quote Request\nName: ${name.trim()}\nPickup: ${pickup}\nDrop-off: ${dropoff}\nDate: ${date}\nPassengers: ${passengers}\nVehicle: ${category}`
    await openWhatsAppWithFallback(message, '/events/whatsapp-open/cab')
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <label htmlFor="cab-name">Full Name <span className="text-red-500">*</span></label>
        <input
          id="cab-name"
          placeholder="e.g. Amit Singh"
          className="w-full"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="cab-pickup">Pickup <span className="text-red-500">*</span></label>
        <CustomSelect
          id="cab-pickup"
          required
          value={pickup}
          options={CAB_PICKUP_POINTS}
          onChange={setPickup}
        />
      </div>

      <div>
        <label htmlFor="cab-dropoff">Drop-off <span className="text-red-500">*</span></label>
        <CustomSelect
          id="cab-dropoff"
          required
          value={dropoff}
          options={CAB_DROPOFF_POINTS}
          onChange={setDropoff}
        />
      </div>

      <div>
        <label htmlFor="cab-date">Travel Date <span className="text-red-500">*</span></label>
        <Suspense fallback={<div className="h-12 rounded-lg bg-slate-100 animate-pulse" />}>
          <CustomDatePicker
            id="cab-date"
            label="Date"
            required
            value={date}
            onChange={setDate}
            minDate={today}
            placeholder="yyyy-mm-dd"
          />
        </Suspense>
      </div>

      <div>
        <label htmlFor="cab-passengers">Passengers <span className="text-red-500">*</span></label>
        <input
          id="cab-passengers"
          type="number"
          min="1"
          required
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="cab-category">Preferred Vehicle <span className="text-red-500">*</span></label>
        <CustomSelect
          id="cab-category"
          required
          value={category}
          placeholder="Select a vehicle"
          options={CAB_VEHICLES}
          onChange={setCategory}
        />
      </div>

      <button 
        disabled={!isValid} 
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-sunset-orange py-3 font-semibold text-white transition-all hover:bg-opacity-90 active:scale-[0.98] disabled:opacity-40 md:col-span-2" 
        type="submit"
      >
        Request Quote
      </button>
    </form>
  )
}
