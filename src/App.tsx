import { useState } from 'react'
import { Header } from './components/Header'
import { BikeForm } from './components/BikeForm'
import { CabForm } from './components/CabForm'
import { Features } from './components/Features'
import { Routes } from './components/Routes'
import { Fleet } from './components/Fleet'
import { Footer } from './components/Footer'

function App() {
  const [service, setService] = useState<'cab' | 'bike'>('cab')

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section id="hero" className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-20">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop" 
              alt="Kumaon Mountains" 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-pine-green/60 mix-blend-multiply" />
          </div>
          
          <div className="relative z-10 grid w-full max-w-7xl gap-12 lg:grid-cols-2">
            <div className="text-white">
              <h1 className="!text-white text-4xl font-bold leading-tight md:text-6xl">
                Your Journey Through the Kumaon Himalayas Starts Here
              </h1>
              <p className="mt-6 text-lg !text-white opacity-90">
                Reliable local experts providing premium rentals from Haldwani and Kathgodam to destinations across Kumaon.
              </p>
            </div>
            
            <div id="quote-form" className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
              <h2 className="mb-2 text-center text-2xl font-bold">Request a Quote</h2>
              <p className="mb-6 text-center text-sm text-slate-500">Select your transport type to get started.</p>
              
              <div className="mb-8 flex rounded-lg bg-slate-100 p-1">
                <button 
                  className={`flex-1 rounded-md py-2 text-sm font-semibold transition-all ${service === 'cab' ? 'bg-white shadow-sm text-pine-green' : 'text-slate-500'}`}
                  onClick={() => setService('cab')}
                >
                  Book a Cab
                </button>
                <button 
                  className={`flex-1 rounded-md py-2 text-sm font-semibold transition-all ${service === 'bike' ? 'bg-white shadow-sm text-pine-green' : 'text-slate-500'}`}
                  onClick={() => setService('bike')}
                >
                  Rent a Bike
                </button>
              </div>
              
              {service === 'cab' ? <CabForm /> : <BikeForm />}
            </div>
          </div>
        </section>

        <Features />
        <Routes />
        <Fleet />
      </main>
      <Footer />
    </div>
  )
}

export default App
