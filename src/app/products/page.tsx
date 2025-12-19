'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilterSidebar from '@/components/FilterSidebar';
import ProductCard from '@/components/ProductCard';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Image from 'next/image';

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample product data
  const products = [
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
      isFeatured: false,
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
    {
      id: '4',
      name: 'Pasta Primavera',
      restaurant: 'Italian Delight',
      price: 120,
      originalPrice: undefined,
      image: '/images/food.png',
      rating: 5,
      isFeatured: false,
    },
    {
      id: '5',
      name: 'Sushi Platter',
      restaurant: 'Tokyo Express',
      price: 180,
      originalPrice: 200,
      image: '/images/food.png',
      rating: 4,
      isFeatured: true,
    },
    {
      id: '6',
      name: 'Beef Tacos',
      restaurant: 'Mexicana',
      price: 55,
      originalPrice: undefined,
      image: '/images/food.png',
      rating: 4,
      isFeatured: false,
    },
    {
      id: '7',
      name: 'Fruit Salad',
      restaurant: 'Healthy Bites',
      price: 45,
      originalPrice: undefined,
      image: '/images/food.png',
      rating: 5,
      isFeatured: false,
    },
    {
      id: '8',
      name: 'Chocolate Cake',
      restaurant: 'Sweet Dreams',
      price: 95,
      originalPrice: 110,
      image: '/images/food.png',
      rating: 5,
      isFeatured: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative w-full h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600">
          <div className="absolute inset-0 bg-black/30 mix-blend-overlay"></div>
          <Image
            src="/images/hero_products.png"
            alt="Products"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-4xl font-bold mb-2">Our Products</h1>
            <p className="text-xl">Home / Products</p>
          </div>
        </div>
      </div>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar - Hidden on mobile by default, shown with filter button */}
            <div className="lg:w-80 flex-shrink-0">
              <FilterSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-grow">
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-grow">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button
                  variant="primary"
                  size="md"
                  className="h-12 px-6"
                >
                  Search
                </Button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
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
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;