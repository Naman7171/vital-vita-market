
import { mockDB } from './database';
import { User, Product, ApiResponse, PaginatedResponse } from './types';

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Auth APIs
export const authAPI = {
  async signup(name: string, email: string, password: string): Promise<ApiResponse<User>> {
    await delay();
    
    const existingUser = mockDB.findUserByEmail(email);
    if (existingUser) {
      return {
        success: false,
        message: 'Email already exists',
        data: null as any
      };
    }

    const user = mockDB.createUser({
      name,
      email,
      password,
      role: 'customer'
    });

    mockDB.setCurrentUser(user.id);

    return {
      success: true,
      message: 'User created successfully',
      data: { ...user, password: '' } // Don't return password
    };
  },

  async login(email: string, password: string): Promise<ApiResponse<User>> {
    await delay();
    
    const user = mockDB.findUserByEmail(email);
    if (!user || user.password !== password) {
      return {
        success: false,
        message: 'Invalid email or password',
        data: null as any
      };
    }

    mockDB.setCurrentUser(user.id);

    return {
      success: true,
      message: 'Login successful',
      data: { ...user, password: '' }
    };
  },

  async logout(): Promise<ApiResponse<null>> {
    await delay(200);
    mockDB.setCurrentUser(null);
    
    return {
      success: true,
      message: 'Logged out successfully',
      data: null
    };
  },

  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    await delay(200);
    const user = mockDB.getCurrentUser();
    
    return {
      success: true,
      data: user ? { ...user, password: '' } : null
    };
  }
};

// Product APIs
export const productAPI = {
  async getProducts(filters?: { 
    category?: string; 
    search?: string; 
    page?: number; 
    limit?: number;
    bestseller?: boolean;
  }): Promise<PaginatedResponse<Product>> {
    await delay();
    
    const result = mockDB.getProducts(filters);
    
    return {
      data: result.data,
      pagination: result.pagination
    };
  },

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    await delay();
    
    const product = mockDB.getProductById(id);
    if (!product) {
      return {
        success: false,
        message: 'Product not found',
        data: null as any
      };
    }

    return {
      success: true,
      data: product
    };
  },

  async createProduct(productData: Omit<Product, 'id' | 'createdAt'>): Promise<ApiResponse<Product>> {
    await delay();
    
    const currentUser = mockDB.getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      return {
        success: false,
        message: 'Unauthorized',
        data: null as any
      };
    }

    const product = mockDB.createProduct(productData);
    
    return {
      success: true,
      message: 'Product created successfully',
      data: product
    };
  }
};

// Cart APIs
export const cartAPI = {
  async getCartItems(): Promise<ApiResponse<any[]>> {
    await delay();
    
    const currentUser = mockDB.getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: 'Not authenticated',
        data: []
      };
    }

    const cartItems = mockDB.getCartItems(currentUser.id);
    const itemsWithProducts = cartItems.map(item => {
      const product = mockDB.getProductById(item.productId);
      return {
        ...item,
        product
      };
    });

    return {
      success: true,
      data: itemsWithProducts
    };
  },

  async addToCart(productId: string, quantity: number = 1): Promise<ApiResponse<any>> {
    await delay();
    
    const currentUser = mockDB.getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: 'Not authenticated',
        data: null as any
      };
    }

    const cartItem = mockDB.addToCart(currentUser.id, productId, quantity);
    
    return {
      success: true,
      message: 'Item added to cart',
      data: cartItem
    };
  },

  async removeFromCart(productId: string): Promise<ApiResponse<boolean>> {
    await delay();
    
    const currentUser = mockDB.getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: 'Not authenticated',
        data: false
      };
    }

    const removed = mockDB.removeFromCart(currentUser.id, productId);
    
    return {
      success: true,
      message: removed ? 'Item removed from cart' : 'Item not found',
      data: removed
    };
  }
};

// Wishlist APIs
export const wishlistAPI = {
  async getWishlistItems(): Promise<ApiResponse<any[]>> {
    await delay();
    
    const currentUser = mockDB.getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: 'Not authenticated',
        data: []
      };
    }

    const wishlistItems = mockDB.getWishlistItems(currentUser.id);
    const itemsWithProducts = wishlistItems.map(item => {
      const product = mockDB.getProductById(item.productId);
      return {
        ...item,
        product
      };
    });

    return {
      success: true,
      data: itemsWithProducts
    };
  },

  async toggleWishlistItem(productId: string): Promise<ApiResponse<boolean>> {
    await delay();
    
    const currentUser = mockDB.getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: 'Not authenticated',
        data: false
      };
    }

    const existing = mockDB.getWishlistItems(currentUser.id)
      .find(item => item.productId === productId);

    if (existing) {
      mockDB.removeFromWishlist(currentUser.id, productId);
      return {
        success: true,
        message: 'Item removed from wishlist',
        data: false
      };
    } else {
      mockDB.addToWishlist(currentUser.id, productId);
      return {
        success: true,
        message: 'Item added to wishlist',
        data: true
      };
    }
  }
};

// Order APIs
export const orderAPI = {
  async createOrder(items: any[], totalAmount: number): Promise<ApiResponse<any>> {
    await delay();
    
    const currentUser = mockDB.getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: 'Not authenticated',
        data: null as any
      };
    }

    const order = mockDB.createOrder({
      userId: currentUser.id,
      items,
      totalAmount,
      status: 'pending'
    });

    return {
      success: true,
      message: 'Order created successfully',
      data: order
    };
  },

  async getUserOrders(): Promise<ApiResponse<any[]>> {
    await delay();
    
    const currentUser = mockDB.getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: 'Not authenticated',
        data: []
      };
    }

    const orders = mockDB.getOrdersByUser(currentUser.id);
    
    return {
      success: true,
      data: orders
    };
  }
};

// Review APIs
export const reviewAPI = {
  async getProductReviews(productId: string): Promise<ApiResponse<any[]>> {
    await delay();
    
    const reviews = mockDB.getReviewsByProduct(productId);
    const reviewsWithUsers = reviews.map(review => {
      const user = mockDB.findUserById(review.userId);
      return {
        ...review,
        userName: user?.name || 'Anonymous'
      };
    });

    return {
      success: true,
      data: reviewsWithUsers
    };
  },

  async createReview(productId: string, rating: number, comment: string): Promise<ApiResponse<any>> {
    await delay();
    
    const currentUser = mockDB.getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: 'Not authenticated',
        data: null as any
      };
    }

    const review = mockDB.createReview({
      userId: currentUser.id,
      productId,
      rating,
      comment
    });

    return {
      success: true,
      message: 'Review added successfully',
      data: review
    };
  }
};

// Payment simulation
export const paymentAPI = {
  async processPayment(amount: number, paymentMethod: string): Promise<ApiResponse<any>> {
    await delay(2000); // Simulate payment processing
    
    // Simulate random success/failure for demo
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      return {
        success: true,
        message: 'Payment processed successfully',
        data: {
          transactionId: `txn_${Date.now()}`,
          amount,
          paymentMethod,
          status: 'completed'
        }
      };
    } else {
      return {
        success: false,
        message: 'Payment failed. Please try again.',
        data: null as any
      };
    }
  }
};
