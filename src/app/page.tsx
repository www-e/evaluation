'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/ui/button';
import Image from 'next/image';

const HomePage = () => {
  // Sample product data for featured products
  const featuredProducts = [
    {
      id: '1',
      name: 'Butter Sandwich',
      restaurant: 'Park Lank Hotel',
      price: 89,
      originalPrice: 99,
      image: '/images/food.png',
      rating: 4,
      isFeatured: true,
    },
    {
      id: '2',
      name: 'Veggie Burger',
      restaurant: 'Green Garden',
      price: 65,
      originalPrice: undefined,
      image: '/images/food.png',
      rating: 5,
      isFeatured: true,
    },
    {
      id: '3',
      name: 'Chicken Wrap',
      restaurant: 'Fast Bites',
      price: 75,
      originalPrice: 85,
      image: '/images/food.png',
      rating: 4,
      isFeatured: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative w-full h-[630px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600">
          <div className="absolute inset-0 bg-black/30 mix-blend-overlay"></div>
          <Image
            src="/images/hero_products.png"
            alt="Delicious Food"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4 max-w-3xl">
            Delicious Food Delivered to Your Door
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Order your favorite meals from top restaurants with fast delivery
          </p>
          <div className="flex gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link href="/products">View Menu</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Check out our most popular items</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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