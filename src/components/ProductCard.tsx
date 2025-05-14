
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  addToWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductCard({ product, addToCart, addToWishlist, isWishlisted }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
    
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`
    });
  };

  // Calculate sale price if there's a discount
  const salePrice = product.discountPercentage 
    ? product.price * (1 - product.discountPercentage / 100)
    : null;

  return (
    <Link to={`/product/${product.id}`}>
      <div 
        className={cn(
          "product-card h-full flex flex-col overflow-hidden",
          isHovered && "shadow-lg scale-[1.02]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden rounded-t-xl">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.discountPercentage && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {product.discountPercentage}% OFF
              </span>
            )}
            
            {product.featured && (
              <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Featured
              </span>
            )}
            
            {product.bestSeller && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Best Seller
              </span>
            )}
          </div>
          
          {/* Actions */}
          <div className={cn(
            "absolute top-3 right-3 transition-opacity duration-300",
            !isHovered && "opacity-0"
          )}>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={handleAddToWishlist}
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-red-500 text-red-500")} />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Category */}
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          
          {/* Title */}
          <h3 className="font-medium text-foreground line-clamp-2 mb-1">{product.name}</h3>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({Math.floor(Math.random() * 100) + 5} reviews)</span>
          </div>
          
          {/* Price */}
          <div className="mt-auto pt-2 flex items-baseline">
            {salePrice ? (
              <>
                <span className="text-lg font-bold text-foreground mr-2">
                  ${salePrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Add to cart button */}
          <Button 
            onClick={handleAddToCart}
            className={cn(
              "mt-3 w-full rounded-full transition-all duration-300",
              isHovered ? "bg-primary hover:bg-primary/90" : "bg-primary/90"
            )}
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
