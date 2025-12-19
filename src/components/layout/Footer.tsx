import React from 'react';
import Link from 'next/link';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-neutral-100 overflow-hidden">
      <div className="w-full h-[702px] bg-black/90 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Account Section */}
            <div>
              <h3 className="text-2xl font-semibold font-['Cyntho_Next'] uppercase leading-8 text-neutral-100 mb-6">
                Account
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-xl font-normal font-['Cyntho_Next'] leading-7 text-white hover:text-amber-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-xl font-normal font-['Cyntho_Next'] leading-7 text-white hover:text-amber-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-xl font-normal font-['Cyntho_Next'] leading-7 text-white hover:text-amber-400">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legals Section */}
            <div>
              <h3 className="text-2xl font-semibold font-['Cyntho_Next'] uppercase leading-8 text-neutral-100 mb-6">
                Legals
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy" className="text-xl font-normal font-['Cyntho_Next'] leading-7 text-white hover:text-amber-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-xl font-normal font-['Cyntho_Next'] leading-7 text-white hover:text-amber-400">
                    Terms & Condition
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info Section */}
            <div>
              <h3 className="text-2xl font-semibold font-['Cyntho_Next'] uppercase leading-8 text-neutral-100 mb-6">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="size-6 mr-4">
                    <div className="size-5 bg-neutral-100 absolute"></div>
                  </div>
                  <span className="text-xl font-normal font-['Cyntho_Next'] leading-7 text-white">
                    +91 1234567891
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-3 mr-4">
                    <div className="w-5 h-3 bg-neutral-100"></div>
                    <div className="w-5 h-2.5 bg-neutral-100"></div>
                  </div>
                  <span className="text-xl font-normal font-['Cyntho_Next'] leading-7 text-white">
                    munasbas007@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* Subscribe Section */}
            <div>
              <h3 className="text-2xl font-semibold font-['Cyntho_Next'] uppercase leading-8 text-neutral-100 mb-6">
                Subscribe
              </h3>
              <div className="mb-6">
                <p className="text-lg font-normal font-['Cyntho_Next'] leading-7 text-neutral-100 opacity-80">
                  These guys have been absolutely outstanding. When I needed them they came through in a big way! I know that if you buy this theme.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <div className="w-5 h-3 absolute left-5 top-6">
                    <div className="w-5 h-3 bg-neutral-100"></div>
                    <div className="w-5 h-2.5 bg-neutral-100"></div>
                  </div>
                  <Input 
                    placeholder="Enter Your Email" 
                    className="bg-radial-[at_1%_3%] from-white/40 to-white/20 rounded-[10px] border-white/90 backdrop-blur-xl text-white pl-12"
                  />
                </div>
                <Button variant="primary" className="w-full">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-neutral-100 my-12"></div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-6 md:mb-0">
              <div className="size-14 bg-radial-[at_1%_3%] from-white/40 to-white/20 rounded-full border-white/90 backdrop-blur-xl flex items-center justify-center">
                <div className="size-7 overflow-hidden">
                  <div className="w-7 h-6 bg-white"></div>
                </div>
              </div>
              <div className="size-14 bg-radial-[at_1%_3%] from-white/40 to-white/20 rounded-full border-white/90 backdrop-blur-xl flex items-center justify-center">
                <div className="size-7 overflow-hidden">
                  <div className="size-7 bg-white"></div>
                  <div className="w-3.5 h-6 bg-zinc-700"></div>
                </div>
              </div>
              <div className="size-14 bg-radial-[at_1%_3%] from-white/40 to-white/20 rounded-full border-white/90 backdrop-blur-xl flex items-center justify-center">
                <div className="size-7 overflow-hidden">
                  <div className="w-7 h-5 bg-white"></div>
                </div>
              </div>
              <div className="size-14 bg-radial-[at_1%_3%] from-white/40 to-white/20 rounded-full border-white/90 backdrop-blur-xl flex items-center justify-center">
                <div className="size-7 overflow-hidden">
                  <div className="size-8 bg-white"></div>
                  <div className="size-6 bg-zinc-700"></div>
                </div>
              </div>
              <div className="size-14 bg-radial-[at_1%_3%] from-white/40 to-white/20 rounded-full border-white/90 backdrop-blur-xl flex items-center justify-center">
                <div className="size-7 overflow-hidden">
                  <div className="size-7 bg-white"></div>
                  <div className="size-5 bg-zinc-700"></div>
                </div>
              </div>
            </div>
            
            <p className="text-lg font-medium font-['Cyntho_Next'] leading-7 text-white">
              @2023 For Salone All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;