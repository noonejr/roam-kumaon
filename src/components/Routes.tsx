export function Routes() {
  const routes = [
    {
      title: 'Haldwani / Kathgodam',
      role: 'Primary Hub',
      description: 'The gateway to Kumaon. We connect you from the foothills to the high peaks.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Bageshwar',
      role: 'Pilot Destination',
      description: 'The spiritual heart of Kumaon. Experience the confluence of Sarju and Gomti.',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section id="routes" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Discover Our Pilot Routes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Starting with the most essential connections in the region.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {routes.map((route, index) => (
            <div key={index} className="group relative overflow-hidden rounded-3xl shadow-lg bg-white">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={route.image}
                  alt={route.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-pine-green/10 text-pine-green text-sm font-semibold rounded-full mb-2">
                      {route.role}
                    </span>
                    <h3 className="text-3xl font-bold">{route.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 text-lg">
                  {route.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
