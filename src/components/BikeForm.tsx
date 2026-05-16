import { type FormEvent, useState } from 'react'
import { BIKE_RENTAL_LOCATION } from '../constants/locations'
import { openWhatsAppWithFallback } from '../utils/whatsapp'
import { CustomDatePicker } from './ui/CustomDatePicker'

const today = new Date().toLocaleDateString('en-CA')

export function BikeForm() {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [preferredVehicle, setPreferredVehicle] = useState('')
  const minReturnDate = startDate && startDate > today ? startDate : today

  const isValid = 
    name.trim().length > 0 && 
    startDate.length > 0 && 
    returnDate.length > 0 && 
    returnDate >= startDate &&
    returnDate >= today &&
    preferredVehicle.length > 0

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const message = `Bike Rental Quote Request\nName: ${name.trim()}\nVehicle: ${preferredVehicle}\nStart Date: ${startDate}\nReturn Date: ${returnDate}\nPickup & Return: ${BIKE_RENTAL_LOCATION}`
    await openWhatsAppWithFallback(message, '/events/whatsapp-open/bike')
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <label htmlFor="bike-name">Full Name <span className="text-red-500">*</span></label>
        <input 
          id="bike-name"
          aria-label="Name" 
          placeholder="e.g. Amit Singh"
          className="w-full"
          required
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

      <div>
        <label htmlFor="bike-start">Start Date <span className="text-red-500">*</span></label>
        <CustomDatePicker
          id="bike-start"
          label="Start Date"
          required
          value={startDate}
          onChange={(d) => { setStartDate(d); if (returnDate && d > returnDate) setReturnDate('') }}
          minDate={today}
          placeholder="yyyy-mm-dd"
        />
      </div>

      <div>
        <label htmlFor="bike-return">Return Date <span className="text-red-500">*</span></label>
        <CustomDatePicker 
          id="bike-return"
          label="Return Date" 
          required
          value={returnDate} 
          onChange={setReturnDate}
          minDate={minReturnDate}
          placeholder="yyyy-mm-dd"
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="bike-vehicle">
          Preferred Vehicle <span className="text-red-500">*</span>
        </label>
        <select 
          id="bike-vehicle"
          required
          value={preferredVehicle}
          onChange={(e) => setPreferredVehicle(e.target.value)}
          className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sunset-orange/20 focus:border-sunset-orange"
        >
          <option value="" disabled>Select a vehicle</option>
          <option value="Scooter (Activa/Jupiter)">Scooter (Activa/Jupiter)</option>
          <option value="Bike - Normal (Pulsar/Apache)">Bike - Normal (Pulsar/Apache)</option>
          <option value="Bike - Bullet (Royal Enfield)">Bike - Bullet (Royal Enfield)</option>
        </select>
      </div>

      <button 
        disabled={!isValid} 
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-sunset-orange py-3 font-semibold text-white transition-all hover:bg-opacity-90 active:scale-[0.98] disabled:opacity-40 md:col-span-2" 
        type="submit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.12.54 4.19 1.57 6.05L0 24l6.12-1.61a11.783 11.783 0 005.92 1.58h.005c6.634 0 12.03-5.391 12.032-12.03a11.82 11.82 0 00-3.417-8.435z"/>
        </svg>
        Request Quote via WhatsApp
      </button>
    </form>
  )
}
