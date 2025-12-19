"use client"

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { User as UserIcon, LogOut } from 'lucide-react';
import CartBadge from './CartBadge';

interface HeaderProps {
  showAuthButtons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showAuthButtons = true }) => {
  const { user, loading, logout } = useAuth();

  // Format phone number for display
  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/[^\d+]/g, '');
    if (cleaned.startsWith('+') && cleaned.length >= 10) {
      // Handle +1 format: +1 234-567-8900
      if (cleaned.length === 12 && cleaned.startsWith('+1')) {
        return `+1 ${cleaned.substring(2, 5)}-${cleaned.substring(5, 8)}-${cleaned.substring(8, 12)}`;
      }
      // General E.164 format: +X XXX XXX XXXX
      if (cleaned.length >= 2) {
        let result = cleaned.substring(0, 2); // +X
        if (cleaned.length > 2) result += ` ${cleaned.substring(2, 5)}`; // XXX
        if (cleaned.length > 5) result += `-${cleaned.substring(5, 8)}`; // XXX
        if (cleaned.length > 8) result += `-${cleaned.substring(8, 12)}`; // XXXX
        return result;
      }
    }
    return phone;
  };

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
          <CartBadge />

          {loading ? (
            <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          ) : user ? (
            // Show user info when logged in
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900">Welcome back!</span>
                <span className="text-xs text-gray-600">{formatPhoneNumber(user.phoneNumber || '')}</span>
              </div>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="hidden md:flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="md:hidden p-2" // Mobile: icon only
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : showAuthButtons && (
            // Show auth buttons when not logged in
            <>
              <Button variant="secondary" size="md" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="primary" size="md" asChild className="whitespace-nowrap">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;