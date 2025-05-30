import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { mockProducts } from "@/lib/mockData";
import { Heart, ShoppingCart, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import OptimizedImage from "@/components/OptimizedImage";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find((p) => p.id === id);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="container mx-auto py-20 px-4">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <p className="mt-4">
          Sorry, the product you're looking for doesn't exist.{" "}
          <Link to="/products" className="text-primary underline">
            Browse our products
          </Link>
        </p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  // Get 4 related products from the same category
  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const isWishlisted = isInWishlist(product.id);
  
  const productIngredients = [
    "Organic Whey Protein Isolate",
    "Natural Flavors",
    "Stevia Leaf Extract",
    "Sunflower Lecithin",
    "Sea Salt"
  ];

  const productBenefits = [
    "Supports muscle recovery and growth",
    "Enhances immune function",
    "Promotes healthy metabolism",
    "Helps reduce cravings between meals",
    "Convenient source of complete protein"
  ];

  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in">
      <div className="mb-8">
        <Link 
          to="/products" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg product-card">
            <AspectRatio ratio={1/1} className="bg-muted/30">
              <OptimizedImage
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="object-cover w-full h-full transition-all duration-300 hover:scale-105"
              />
              
              {/* Gallery Navigation */}
              {product.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="rounded-full opacity-80 hover:opacity-100"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="rounded-full opacity-80 hover:opacity-100"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
              
              {/* Zoom Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="absolute bottom-4 right-4 rounded-full opacity-80 hover:opacity-100"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <div className="w-full aspect-square">
                    <OptimizedImage
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </AspectRatio>
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    currentImageIndex === index 
                      ? "border-primary" 
                      : "border-transparent hover:border-primary/50"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <OptimizedImage 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="px-2 py-1">
                {product.category}
              </Badge>
              {product.bestSeller && (
                <Badge className="bg-amber-500 hover:bg-amber-600 px-2 py-1">
                  Best Seller
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 mb-4">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({Math.round(product.rating * 15)} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-baseline space-x-3">
            {product.discountPercentage ? (
              <>
                <span className="text-3xl font-bold text-primary">
                  ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
                <Badge variant="destructive">
                  {product.discountPercentage}% OFF
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground">
            {product.description}
          </p>

          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => addItem(product)}
              size="lg"
              className="flex-1"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant={isWishlisted ? "default" : "outline"}
              size="icon"
              onClick={() => toggleItem(product)}
              className={`${isWishlisted ? "bg-primary" : ""}`}
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="bg-muted/30 p-4 rounded-md">
            <div className="flex items-center text-sm">
              <div className="flex-1">
                <div className="font-semibold">Availability:</div>
                <div className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </div>
              </div>
              <div className="flex-1">
                <div className="font-semibold">SKU:</div>
                <div>SKU-{product.id}</div>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Category:</div>
                <div>{product.category}</div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="details" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4 mt-2 rounded-md bg-muted/30">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {product.tags.map((tag) => (
                  <Badge variant="outline" key={tag} className="w-fit">
                    {tag}
                  </Badge>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="ingredients" className="p-4 mt-2 rounded-md bg-muted/30">
              <h3 className="font-semibold mb-3">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-1">
                {productIngredients.map((ingredient, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{ingredient}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="benefits" className="p-4 mt-2 rounded-md bg-muted/30">
              <h3 className="font-semibold mb-3">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1">
                {productBenefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{benefit}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link 
                to={`/product/${relatedProduct.id}`} 
                key={relatedProduct.id}
                className="block transition-transform hover:scale-105"
              >
                <div className="product-card overflow-hidden rounded-lg h-full flex flex-col">
                  <div className="aspect-square overflow-hidden">
                    <OptimizedImage
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-medium">{relatedProduct.name}</h3>
                    <p className="text-primary font-bold mt-2">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
