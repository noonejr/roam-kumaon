import { useState } from 'react'
import { Header } from './components/Header'
import { BikeForm } from './components/BikeForm'
import { CabForm } from './components/CabForm'

function App() {
  const [service, setService] = useState<'cab' | 'bike'>('cab')

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-4xl overflow-x-hidden px-4 py-10">
        <h1 className="text-3xl font-semibold text-brand-secondary md:text-4xl">Roam Kumaon</h1>
        <p className="mt-2">Request a quick travel quote on WhatsApp.</p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <button className={`rounded p-3 ${service === 'cab' ? 'bg-brand-primary text-white' : 'bg-white'}`} onClick={() => setService('cab')}>Book a Cab</button>
          <button className={`rounded p-3 ${service === 'bike' ? 'bg-brand-secondary text-white' : 'bg-white'}`} onClick={() => setService('bike')}>Rent a Bike</button>
        </div>
        <section className="mt-6 rounded bg-white p-4 shadow">
          {service === 'cab' ? <><h2 className="mb-3 text-xl">Cab Booking</h2><CabForm /></> : <><h2 className="mb-3 text-xl">Bike Rental</h2><BikeForm /></>}
        </section>
      </main>
    </div>
  )
}

export default App
