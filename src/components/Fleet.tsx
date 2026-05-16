interface FleetProps {
  service?: 'cab' | 'bike'
}

export function Fleet({ service = 'cab' }: FleetProps) {
  const cabVehicles = [
    {
      name: 'Shared',
      description: 'The most economical way to travel. Join other travelers on popular routes across the Kumaon region.',
      features: ['Cost Effective', 'Meet Fellow Travelers', 'Regular Departures'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      name: '4 Seater',
      description: 'Ideal for small families or groups. Enjoy a private and comfortable journey through the mountains.',
      features: ['Private Taxi', 'Spacious Boot Space', 'AC / Heater'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3.4c0-.6-.3-1.2-.8-1.5l-2.4-1.6A2 2 0 0 0 17.6 9H6.4a2 2 0 0 0-1.2.4L2.8 11.1c-.5.3-.8.9-.8 1.5V16c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
    },
    {
      name: '7 Seater',
      description: 'Perfect for larger groups or families. Robust vehicles built for mountain roads and extra comfort.',
      features: ['Extra Legroom', 'Roof Carrier', 'High Ground Clearance'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M22 17v-1a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v1" />
          <path d="M5 14V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
  ]

  const bikeVehicles = [
    {
      name: 'Scooters',
      description: 'Activa, Jupiter or similar. Perfect for local sightseeing and easy commuting.',
      features: ['Automatic Transmission', 'Fuel Efficient', 'Helmet Included'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M12 17.5c0 1.93-1.57 3.5-3.5 3.5S5 19.43 5 17.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5Z" />
          <path d="M19 17.5c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5 1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5Z" />
          <path d="M15.5 17.5 12 9l-3.5 8.5" />
          <path d="M12 9H8.5" />
          <path d="M12 9h1.5l2.5 5" />
          <path d="M8.5 17.5H15.5" />
        </svg>
      ),
    },
    {
      name: 'Motorcycles',
      description: 'Pulsar, Apache, or Bullet. For those who want more power and a classic mountain ride.',
      features: ['Geared Bikes', 'Powerful Engine', 'Mountain Ready'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="m18.5 17.5-2.5-4.5h-5.5l-2.5 4.5" />
          <circle cx="5.5" cy="17.5" r="2.5" />
          <circle cx="18.5" cy="17.5" r="2.5" />
          <path d="M5.5 15h13" />
          <path d="M16 13l-1.5-3h-4.5L8.5 13" />
          <path d="M10 10V8" />
          <path d="M14 10V8" />
        </svg>
      ),
    }
  ]

  const vehicles = service === 'cab' ? cabVehicles : bikeVehicles

  return (
    <section id="vehicles" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Fleet</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {service === 'cab'
              ? 'Choose the right vehicle for your Himalayan adventure. All vehicles come with experienced mountain drivers.'
              : 'Explore Kumaon at your own pace with our well-maintained self-drive rentals.'}
          </p>
        </div>
        <div className={`grid grid-cols-1 gap-8 ${
          service === 'cab'
            ? 'md:grid-cols-3'
            : 'md:grid-cols-2 max-w-4xl mx-auto'
        }`}>
          {vehicles.map((vehicle, index) => (
            <div key={index} className="flex flex-col p-8 rounded-3xl border-2 border-gray-100 hover:border-pine-green transition-colors bg-white shadow-sm">
              <div className="text-pine-green mb-6">
                {vehicle.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6">{vehicle.name}</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                {vehicle.description}
              </p>
              <ul className="space-y-4 mb-8">
                {vehicle.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 bg-sunset-orange text-white rounded-xl font-bold hover:bg-opacity-90 transition-colors"
              >
                Inquire Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
