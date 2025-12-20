'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/button';
import Image from 'next/image';
import { getCategories } from '@/actions/admin';
import AlertModal from '@/components/ui/AlertModal';

interface Category {
  id: string;
  name: string;
  image: string | null;
  products: { id: string }[]; // Array of product IDs for count
}

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories with product count
        const fetchedCategories = await getCategories(true); // Include products to count them
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    // Check if checkout success parameter is present in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('checkout') === 'success') {
      setShowCheckoutSuccess(true);
    }

    fetchCategories();
  }, []);

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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Categories</h2>
            <p className="text-lg text-gray-600">Browse our delicious food categories</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading categories...</p>
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group block bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square overflow-hidden">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={400}
                        height={400}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.products.length} items</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No categories available yet.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="primary" size="md" asChild>
              <Link href="/products">View All Categories</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Checkout Success Modal */}
      <AlertModal
        isOpen={showCheckoutSuccess}
        onClose={() => {
          setShowCheckoutSuccess(false);
          // Remove the checkout parameter from URL
          const url = new URL(window.location.href);
          url.searchParams.delete('checkout');
          window.history.replaceState({}, '', url.toString());
        }}
        title="Order Placed Successfully!"
        message="Thank you for your order. We're getting ready for your delicious meal!"
        type="success"
        autoClose={false}
      />
    </div>
  );
};

export default HomePage;