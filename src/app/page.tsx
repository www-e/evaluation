'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/ui/button';

const HomePage = () => {
  // Sample product data for featured products
  const featuredProducts = [
    {
      id: '1',
      name: 'Butter Sandwich',
      restaurant: 'Park Lank Hotel',
      price: 89,
      originalPrice: 99,
      image: '/placeholder-product.jpg',
      rating: 4,
      isFeatured: true,
    },
    {
      id: '2',
      name: 'Veggie Burger',
      restaurant: 'Green Garden',
      price: 65,
      originalPrice: undefined,
      image: '/placeholder-product.jpg',
      rating: 5,
      isFeatured: true,
    },
    {
      id: '3',
      name: 'Chicken Wrap',
      restaurant: 'Fast Bites',
      price: 75,
      originalPrice: 85,
      image: '/placeholder-product.jpg',
      rating: 4,
      isFeatured: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative w-full h-[630px] overflow-hidden">
        <div className="absolute inset-0 bg-red-300">
          <div className="absolute inset-0 bg-black/75 mix-blend-hard-light"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl font-semibold font-['Cyntho_Next'] leading-[70px] mb-4">
            Delicious Food
          </h1>
          <p className="text-xl font-normal font-['Cyntho_Next'] leading-5 mb-8">
            Order your favorite meals from top restaurants
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/products">View Menu</Link>
          </Button>
        </div>
      </div>
      
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Check out our most popular items</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                restaurant={product.restaurant}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                rating={product.rating}
                isFeatured={product.isFeatured}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="primary" size="md" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;