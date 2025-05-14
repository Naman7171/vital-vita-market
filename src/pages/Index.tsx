
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { mockProducts } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Index() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { toggleItem, itemIds } = useWishlist();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const featured = mockProducts.filter(product => product.featured);
      const bestsellers = mockProducts.filter(product => product.bestSeller);
      
      setFeaturedProducts(featured);
      setBestSellers(bestsellers);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Products Section */}
        <FeaturedProducts
          title="Featured Products"
          products={featuredProducts}
          loading={loading}
          addToCart={addItem}
          addToWishlist={toggleItem}
          wishlist={itemIds}
        />
        
        {/* Best Sellers Section */}
        <FeaturedProducts
          title="Best Sellers"
          products={bestSellers}
          loading={loading}
          addToCart={addItem}
          addToWishlist={toggleItem}
          wishlist={itemIds}
        />
      </main>
      
      <Footer />
    </div>
  );
}
