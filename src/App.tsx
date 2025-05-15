
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminSettings from "./pages/admin/AdminSettings";
import WishlistPage from "./pages/WishlistPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./pages/admin/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Main Routes with Standard Layout */}
                <Route
                  path="/"
                  element={
                    <div className="flex flex-col min-h-screen w-full">
                      <Navbar />
                      <main className="flex-1 w-full">
                        <Index />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                
                {/* Product routes */}
                <Route
                  path="/products"
                  element={
                    <div className="flex flex-col min-h-screen w-full">
                      <Navbar />
                      <main className="flex-1 w-full">
                        <ProductsPage />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <div className="flex flex-col min-h-screen w-full">
                      <Navbar />
                      <main className="flex-1 w-full">
                        <ProductDetailPage />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                
                {/* User account routes */}
                <Route
                  path="/checkout"
                  element={
                    <div className="flex flex-col min-h-screen w-full">
                      <Navbar />
                      <main className="flex-1 w-full">
                        <CheckoutPage />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <div className="flex flex-col min-h-screen w-full">
                      <Navbar />
                      <main className="flex-1 w-full">
                        <ProfilePage />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <div className="flex flex-col min-h-screen w-full">
                      <Navbar />
                      <main className="flex-1 w-full">
                        <WishlistPage />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                
                {/* Auth routes */}
                <Route
                  path="/login"
                  element={
                    <div className="flex flex-col min-h-screen w-full">
                      <Navbar />
                      <main className="flex-1 w-full">
                        <LoginPage />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <div className="flex flex-col min-h-screen w-full">
                      <Navbar />
                      <main className="flex-1 w-full">
                        <SignupPage />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <div className="flex flex-col min-h-screen w-full">
                      <Navbar />
                      <main className="flex-1 w-full">
                        <ForgotPasswordPage />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                <Route
                  path="/reset-password"
                  element={
                    <div className="flex flex-col min-h-screen w-full">
                      <Navbar />
                      <main className="flex-1 w-full">
                        <ResetPasswordPage />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                
                {/* Admin routes */}
                <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
                <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
                <Route path="/admin/customers" element={<AdminLayout><AdminCustomers /></AdminLayout>} />
                <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
                
                {/* About page */}
                <Route
                  path="/about"
                  element={
                    <div className="flex flex-col min-h-screen w-full">
                      <Navbar />
                      <main className="flex-1 w-full">
                        <NotFound />
                      </main>
                      <Footer />
                    </div>
                  }
                />
                
                {/* Catch-all/404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
