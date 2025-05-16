
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarDesktopMenu = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
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
  );
};

export default NavbarDesktopMenu;
