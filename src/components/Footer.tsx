import { Zap, Mail, Shield } from 'lucide-react';
import type { Category } from '../types';

interface Props {
  categories: Category[];
  onAdminClick: () => void;
}

export default function Footer({ categories, onAdminClick }: Props) {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                News<span className="text-red-500">Blitz</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted source for breaking news, in-depth analysis, and stories that matter.
              Delivering truth with speed and accuracy.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <span className="text-sm hover:text-white transition-colors cursor-pointer">
                    {cat.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition-colors cursor-pointer">About Us</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Careers</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Press Kit</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Advertise</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Contact</span></li>
              <li><button onClick={onAdminClick} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Admin</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Newsletter</h3>
            <p className="text-sm mb-3">Get the latest headlines delivered to your inbox every morning.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-sm bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-red-500 text-white placeholder-gray-500"
              />
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-r-lg hover:bg-red-700 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">&copy; 2026 NewsBlitz. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
