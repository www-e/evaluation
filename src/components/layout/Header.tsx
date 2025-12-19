import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';

interface HeaderProps {
  showAuthButtons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showAuthButtons = true }) => {
  return (
    <header className="w-full bg-white py-4 px-6 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="size-6 bg-amber-400 rounded-full"></div>
          <div className="w-16 h-2 bg-black"></div>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-lg font-medium text-gray-700 hover:text-amber-500">
            Home
          </Link>
          <Link href="/products" className="text-lg font-medium text-gray-700 hover:text-amber-500">
            Products
          </Link>
          <Link href="/about" className="text-lg font-medium text-gray-700 hover:text-amber-500">
            About Us
          </Link>
          <Link href="/contact" className="text-lg font-medium text-gray-700 hover:text-amber-500">
            Contact Us
          </Link>
        </nav>
        
        {showAuthButtons && (
          <div className="flex items-center space-x-4">
            <Button variant="secondary" size="md" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="primary" size="md" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;