
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface WishlistContextType {
  items: Product[];
  itemIds: string[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const { toast } = useToast();
  
  // Load wishlist from local storage on initial render
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        setItems(JSON.parse(storedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
      }
    }
  }, []);
  
  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  // Get just the IDs for simpler comparison
  const itemIds = items.map(item => item.id);
  
  const addItem = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setItems((prevItems) => [...prevItems, product]);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`
      });
    }
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist."
    });
  };

  const toggleItem = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return itemIds.includes(productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist."
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemIds,
        addItem,
        removeItem,
        toggleItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
