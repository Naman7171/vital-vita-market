
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
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
    <div className="w-full">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products Section */}
      <div className="container mx-auto">
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
      </div>
    </div>
  );
}
