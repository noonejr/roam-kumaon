import { type FormEvent, useState } from 'react'
import { BIKE_RENTAL_LOCATION } from '../constants/locations'
import { BIKE_VEHICLES } from '../constants/vehicles'
import { openWhatsAppWithFallback } from '../utils/whatsapp'
import { CustomDatePicker } from './ui/CustomDatePicker'
import { CustomSelect } from './ui/CustomSelect'

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
        <CustomSelect
          id="bike-vehicle"
          required
          value={preferredVehicle}
          placeholder="Select a vehicle"
          options={BIKE_VEHICLES}
          onChange={setPreferredVehicle}
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
