'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilterSidebar from '@/components/FilterSidebar';
import ProductCard from '@/components/ProductCard';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

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
      isFeatured: false,
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
    {
      id: '4',
      name: 'Pasta Primavera',
      restaurant: 'Italian Delight',
      price: 120,
      originalPrice: undefined,
      image: '/placeholder-product.jpg',
      rating: 5,
      isFeatured: false,
    },
    {
      id: '5',
      name: 'Sushi Platter',
      restaurant: 'Tokyo Express',
      price: 180,
      originalPrice: 200,
      image: '/placeholder-product.jpg',
      rating: 4,
      isFeatured: true,
    },
    {
      id: '6',
      name: 'Beef Tacos',
      restaurant: 'Mexicana',
      price: 55,
      originalPrice: undefined,
      image: '/placeholder-product.jpg',
      rating: 4,
      isFeatured: false,
    },
    {
      id: '7',
      name: 'Fruit Salad',
      restaurant: 'Healthy Bites',
      price: 45,
      originalPrice: undefined,
      image: '/placeholder-product.jpg',
      rating: 5,
      isFeatured: false,
    },
    {
      id: '8',
      name: 'Chocolate Cake',
      restaurant: 'Sweet Dreams',
      price: 95,
      originalPrice: 110,
      image: '/placeholder-product.jpg',
      rating: 5,
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
            Products
          </h1>
          <p className="text-xl font-normal font-['Cyntho_Next'] leading-5">
            Home / Products
          </p>
        </div>
      </div>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-16 bg-white rounded-tl-sm rounded-bl-sm outline outline-1 outline-offset-[-1px] outline-black/20"
                  />
                </div>
                <Button 
                  variant="primary" 
                  size="md"
                  className="h-16 px-6 rounded-tr-sm rounded-br-sm"
                >
                  Search
                </Button>
              </div>
              
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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