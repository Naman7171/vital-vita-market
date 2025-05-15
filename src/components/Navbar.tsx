
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // Check if Web Speech API is available
  const speechRecognitionAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search submission
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
    }
  };

  // Start voice recognition
  const startListening = () => {
    if (!speechRecognitionAvailable) {
      toast({
        title: "Voice Search Unavailable",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
      return;
    }

    setIsListening(true);
    
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setIsListening(false);
      toast({
        title: "Voice search detected",
        description: `Searching for: "${transcript}"`,
      });
      
      // Navigate to products page with search term
      navigate(`/products?search=${encodeURIComponent(transcript)}`);
      setIsSearchOpen(false);
    };
    
    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice Recognition Error",
        description: "Could not understand audio, please try again.",
        variant: "destructive"
      });
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 py-3",
      "bg-white dark:bg-background/80 dark:backdrop-blur-md", // Always white in light mode, transparent in dark mode
      isScrolled && "shadow-sm"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl md:text-2xl text-primary">NutriHealth</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link to="/products?category=Vitamins" className="text-foreground hover:text-primary transition-colors">
            Vitamins
          </Link>
          <Link to="/products?category=Protein" className="text-foreground hover:text-primary transition-colors">
            Protein
          </Link>
          <Link to="/products?bestseller=true" className="text-foreground hover:text-primary transition-colors">
            Best Sellers
          </Link>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Search */}
          <div className="relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="absolute right-0 top-0 flex items-center bg-background border rounded-md overflow-hidden animate-slide-in">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[200px] md:w-[300px] border-0 focus-visible:ring-0"
                />
                
                {speechRecognitionAvailable && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={startListening}
                    className={cn(
                      "rounded-full transition-colors",
                      isListening ? "text-primary animate-pulse" : ""
                    )}
                    type="button"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsSearchOpen(false)}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </div>
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Wishlist */}
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>
          
          {/* Cart */}
          <Link to="/checkout">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          
          {/* User */}
          <Link to="/login">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          
          {/* Mobile menu toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-background border-t shadow-lg py-4 animate-slide-in">
          <nav className="container mx-auto flex flex-col space-y-4">
            <Link 
              to="/products" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/products?category=Vitamins" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Vitamins
            </Link>
            <Link 
              to="/products?category=Protein" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Protein
            </Link>
            <Link 
              to="/products?bestseller=true" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Best Sellers
            </Link>
            <Link 
              to="/profile" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Account
            </Link>
            <Link 
              to="/wishlist" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Wishlist
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
