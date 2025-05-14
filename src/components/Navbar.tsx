
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

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
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl md:text-2xl text-primary">NutriHealth</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
            Categories
          </Link>
          <Link to="/bestsellers" className="text-foreground hover:text-primary transition-colors">
            Best Sellers
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Search */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="absolute right-0 top-0 flex items-center bg-background border rounded-md overflow-hidden animate-slide-in">
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
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                )}
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
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
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          
          {/* User */}
          <Link to="/auth">
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
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-t shadow-lg py-4 animate-slide-in">
          <nav className="container flex flex-col space-y-4">
            <Link 
              to="/products" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/bestsellers" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Best Sellers
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
