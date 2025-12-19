'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

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
    <div className="min-h-screen bg-white flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-12">
        <div className="max-w-md w-full">
          <div className="flex flex-col items-center mb-20">
            <div className="size-6 bg-amber-400 rounded-full mb-4"></div>
            <div className="w-16 h-2 bg-black"></div>
          </div>
          
          <div className="relative">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
              <span className="text-gray-500">Auth Image Placeholder</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-4xl font-semibold font-['Cyntho_Next'] capitalize leading-10 text-black mb-2">
              Create Account
            </h1>
            <p className="text-xl font-normal font-['Cyntho_Next'] leading-8 text-black opacity-50">
              Join us today to get started
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="h-16 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-black/20"
            />
            
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-16 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-black/20"
            />
            
            <Input
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="h-16 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-black/20"
            />
            
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-16 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-black/20"
            />
            
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="h-16 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-black/20"
            />
            
            <Button 
              type="submit" 
              variant="primary" 
              size="md"
              isLoading={isLoading}
              className="w-full py-6 text-xl font-medium font-['Cyntho_Next']"
            >
              Sign Up
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-amber-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;