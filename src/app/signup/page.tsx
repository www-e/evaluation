'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Image from 'next/image';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically redirect or handle the signup
      console.log('Signup submitted with:', { name, email, phoneNumber, password });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white py-4 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Buzzer Logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold text-gray-900">Buzzer</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
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
            <Button variant="primary" size="md" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex">
        {/* Left side - Auth Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-amber-50 items-center justify-center p-12">
          <div className="max-w-md w-full">
            <div className="flex flex-col items-center mb-8">
              <Image
                src="/images/logo.png"
                alt="Buzzer Logo"
                width={60}
                height={60}
                className="mb-4"
              />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Buzzer</h2>
              <p className="text-gray-600 text-center">Experience the best food delivery service</p>
            </div>

            <div className="relative">
              <Image
                src="/images/signup.png"
                alt="Sign Up"
                width={500}
                height={400}
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            <div className="lg:hidden text-center mb-8">
              <Image
                src="/images/logo.png"
                alt="Buzzer Logo"
                width={60}
                height={60}
                className="mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900">Buzzer</h2>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">
                Join us today to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="h-14 bg-white rounded-lg border border-gray-300"
              />

              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-14 bg-white rounded-lg border border-gray-300"
              />

              <Input
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="h-14 bg-white rounded-lg border border-gray-300"
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-14 bg-white rounded-lg border border-gray-300"
              />

              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="h-14 bg-white rounded-lg border border-gray-300"
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="w-full h-12 text-base font-medium whitespace-nowrap"
              >
                Sign Up
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-amber-600 hover:underline font-medium">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;