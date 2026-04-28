import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-emerald-600 font-black text-2xl tracking-tighter mb-4">
              <Sprout size={32} />
              <span>Kisan-Direct</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering local farmers by connecting them directly with buyers. Fresh produce, fair prices, zero middlemen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm">Marketplace</Link></li>
              <li><Link to="/dashboard" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm">Farmer Dashboard</Link></li>
              <li><Link to="/profile" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm">Your Profile</Link></li>
            </ul>
          </div>

          {/* Help & Support (UPDATED) */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Help & Support</h3>
            <ul className="space-y-3">
              <li><Link to="/how-to-list" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm">How to List Crops</Link></li>
              <li><Link to="/safety" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm">Safety Tips for Buyers</Link></li>
              <li><Link to="/faq" className="text-gray-500 hover:text-emerald-600 transition-colors text-sm">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-500 text-sm">
                <Mail size={16} className="text-emerald-500"/>
                <span>support@kisandirect.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-500 text-sm">
                <Phone size={16} className="text-emerald-500"/>
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-500 text-sm">
                <MapPin size={16} className="text-emerald-500"/>
                <span>Solan, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar (UPDATED) */}
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Kisan-Direct. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;