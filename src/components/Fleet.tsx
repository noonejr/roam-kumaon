export function Fleet() {
  const vehicles = [
    {
      name: 'Compact',
      price: '₹1,500',
      description: 'Ideal for solo travelers or couples. Easy to navigate narrow mountain roads.',
      features: ['Up to 4 Passengers', 'AC / Heater', 'Fuel Efficient'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
    },
    {
      name: 'SUV / 4x4',
      price: '₹2,500',
      description: 'The standard for Kumaon. Perfect for families and rugged terrains.',
      features: ['Up to 7 Passengers', 'Roof Carrier', 'High Ground Clearance'],
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
    {
      name: 'Premium Sedan',
      price: '₹3,000',
      description: 'Travel in comfort and style. Best for inter-city travel and smooth rides.',
      features: ['Up to 4 Passengers', 'Luxury Interiors', 'Extra Legroom'],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3.4c0-.6-.3-1.2-.8-1.5l-2.4-1.6A2 2 0 0 0 17.6 9H6.4a2 2 0 0 0-1.2.4L2.8 11.1c-.5.3-.8.9-.8 1.5V16c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <section id="vehicles" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Fleet</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the right vehicle for your Himalayan adventure. All vehicles come with experienced mountain drivers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="flex flex-col p-8 rounded-3xl border-2 border-gray-100 hover:border-pine-green transition-colors bg-white shadow-sm">
              <div className="text-pine-green mb-6">
                {vehicle.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{vehicle.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-pine-green">{vehicle.price}</span>
                <span className="text-gray-500 ml-1">/ day</span>
              </div>
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
