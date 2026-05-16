export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Roam-Kumaon</h2>
            <p className="text-lg leading-relaxed max-w-md">
              Your local partner for mountain travel in the Kumaon region. We provide reliable vehicle rentals and expert mountain drivers for an authentic Himalayan experience.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#routes" className="hover:text-white transition-colors">Popular Routes</a></li>
              <li><a href="#vehicles" className="hover:text-white transition-colors">Our Fleet</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider">Regional Hubs</h3>
            <ul className="space-y-4">
              <li>Haldwani</li>
              <li>Kathgodam</li>
              <li>Bageshwar</li>
              <li>Almora</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Roam-Kumaon. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
