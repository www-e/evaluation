import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import Image from 'next/image';

interface HeaderProps {
  showAuthButtons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showAuthButtons = true }) => {
  return (
    <header className="w-full bg-white py-4 px-6 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image
            src="/images/logo.png"
            alt="Buzzer Logo"
            width={40}
            height={40}
          />
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Buzzer
          </Link>
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-lg font-medium text-gray-700 hover:text-amber-500 transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-lg font-medium text-gray-700 hover:text-amber-500 transition-colors">
            Products
          </Link>
          <Link href="/about" className="text-lg font-medium text-gray-700 hover:text-amber-500 transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-lg font-medium text-gray-700 hover:text-amber-500 transition-colors">
            Contact Us
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/cart" className="text-gray-700 hover:text-amber-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </Link>

          {showAuthButtons && (
            <>
              <Button variant="secondary" size="md" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="primary" size="md" asChild className="whitespace-nowrap">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;