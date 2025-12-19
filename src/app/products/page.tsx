'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilterSidebar from '@/components/FilterSidebar';
import ProductCard from '@/components/ProductCard';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Image from 'next/image';
import { getProducts, getCategories } from '@/actions/admin';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: string;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 200] as [number, number],
    ratings: [] as number[]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both products and categories
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        setProducts(fetchedProducts as Product[]);
        setFilteredProducts(fetchedProducts as Product[]);
        setCategories(fetchedCategories as Category[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply all filters
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product =>
        filters.categories.includes(product.categoryId)
      );
    }

    // Apply price range filter
    result = result.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply rating filter (using default rating of 4 for all products)
    if (filters.ratings.length > 0) {
      result = result.filter(product =>
        filters.ratings.some(rating => 4 >= rating)
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, filters, products]);

  const handleFiltersChange = (newFilters: {
    categories: string[];
    priceRange: [number, number];
    ratings: number[];
  }) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-2xl font-bold text-gray-900">Loading products...</div>
      </div>
    );
  }

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
              <FilterSidebar
                availableCategories={categories.map(cat => ({ id: cat.id, name: cat.name }))}
                onFiltersChange={handleFiltersChange}
              />
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
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      restaurant={product.category.name}
                      price={product.price}
                      originalPrice={undefined}
                      image={product.image || '/images/food.png'}
                      rating={4} // Default rating since we don't have rating in the schema
                      isFeatured={false} // Default to not featured since we don't have this in schema
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                  </div>
                )}
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