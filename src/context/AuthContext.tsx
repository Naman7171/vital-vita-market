
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Check if user is logged in from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For this mock, we'll check against our mockUsers
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(user => user.email === email);
      
      if (!foundUser) {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
        return false;
      }
      
      // In real app, we would verify password hash here
      // For demo, we'll just allow any password for the mock users
      
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (mockUsers.some(user => user.email === email)) {
        toast({
          title: "Registration failed",
          description: "Email already in use",
          variant: "destructive"
        });
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: `user${Date.now()}`,
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString()
      };
      
      // In a real app we would save this to the database
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${newUser.name}!`
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
  };
  
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
