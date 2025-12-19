import React from 'react';
import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-amber-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <div>
            <h3 className="text-xl font-bold text-amber-400 mb-4">Buzzer</h3>
            <p className="text-gray-300 mb-4">
              Delivering delicious food from top restaurants to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Account Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-amber-400 transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Legals Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-amber-400 mr-3" />
                <span className="text-gray-300">+91 1234567891</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-amber-400 mr-3" />
                <span className="text-gray-300">munasbas007@gmail.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-400 mr-3 mt-0.5" />
                <span className="text-gray-300">123 Food Street, Culinary City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Buzzer. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 text-sm hover:text-amber-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 text-sm hover:text-amber-400">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 text-sm hover:text-amber-400">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;