
import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Heart, Package, User, Truck, CreditCard, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample order data
const mockOrders = [
  {
    id: "ORD-1234",
    date: "2023-04-15",
    total: 129.99,
    status: "delivered",
    items: [
      { id: "1", name: "Organic Whey Protein", quantity: 1, price: 49.99 },
      { id: "2", name: "Vitamin D3 + K2 Drops", quantity: 1, price: 29.99 },
      { id: "5", name: "Probiotic 50 Billion CFU", quantity: 1, price: 39.99 },
    ],
  },
  {
    id: "ORD-1235",
    date: "2023-05-02",
    total: 94.98,
    status: "shipped",
    items: [
      { id: "4", name: "Organic Green Superfood Powder", quantity: 1, price: 59.99 },
      { id: "6", name: "Magnesium Glycinate", quantity: 1, price: 24.99 },
    ],
  },
];

// User form validation schema
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  postalCode: z.string().min(5, { message: "Postal code is required" }),
});

// Password form validation schema
const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6, { message: "Password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type UserFormValues = z.infer<typeof userFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { items: wishlistItems, removeItem } = useWishlist();
  const { toast } = useToast();

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    avatar: "",
  };

  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      postalCode: userData.postalCode,
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onUserSubmit = (values: UserFormValues) => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const onPasswordSubmit = (values: PasswordFormValues) => {
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    });
    passwordForm.reset();
  };

  // Get order status badge variant
  const getOrderStatusVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 border-green-200 text-green-800";
      case "shipped":
        return "bg-blue-100 border-blue-200 text-blue-800";
      case "processing":
        return "bg-yellow-100 border-yellow-200 text-yellow-800";
      case "cancelled":
        return "bg-red-100 border-red-200 text-red-800";
      default:
        return "bg-gray-100 border-gray-200 text-gray-800";
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Card className="sticky top-24">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="text-xl">
                    {userData.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{userData.name}</CardTitle>
                  <CardDescription>{userData.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Separator />
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors ${
                    activeTab === "profile" ? "bg-muted" : ""
                  }`}
                >
                  <User className="h-5 w-5 opacity-70" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors ${
                    activeTab === "orders" ? "bg-muted" : ""
                  }`}
                >
                  <Package className="h-5 w-5 opacity-70" />
                  <span>Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors ${
                    activeTab === "wishlist" ? "bg-muted" : ""
                  }`}
                >
                  <Heart className="h-5 w-5 opacity-70" />
                  <span>Wishlist</span>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors ${
                    activeTab === "settings" ? "bg-muted" : ""
                  }`}
                >
                  <CreditCard className="h-5 w-5 opacity-70" />
                  <span>Payment Methods</span>
                </button>
              </nav>
              <Separator />
              <div className="p-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and address
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...userForm}>
                  <form
                    onSubmit={userForm.handleSubmit(onUserSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={userForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={userForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={userForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Separator className="my-6" />
                      <h3 className="text-lg font-medium">Address</h3>

                      <FormField
                        control={userForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={userForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={userForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={userForm.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="mt-6">
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <Card>
              <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>
                  View and track your recent orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mockOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No orders yet</h3>
                    <p className="text-muted-foreground mt-2">
                      You haven't placed any orders yet.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link to="/products">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <Card key={order.id}>
                        <CardHeader className="pb-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <CardTitle className="text-base">
                                Order #{order.id}
                              </CardTitle>
                              <CardDescription>
                                Placed on {new Date(order.date).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getOrderStatusVariant(
                                  order.status
                                )}`}
                              >
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex justify-between items-center py-2"
                              >
                                <div className="flex items-center">
                                  <div className="ml-4">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <p className="font-medium">
                                  ${item.price.toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-4" />
                          <div className="flex justify-between">
                            <span className="font-medium">Total</span>
                            <span className="font-medium">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" size="sm">
                            <Truck className="mr-2 h-4 w-4" />
                            Track Order
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <Card>
              <CardHeader>
                <CardTitle>Your Wishlist</CardTitle>
                <CardDescription>
                  Items you've saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Your wishlist is empty</h3>
                    <p className="text-muted-foreground mt-2">
                      Save items you like by clicking the heart icon on product pages.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link to="/products">Browse Products</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                    {wishlistItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
                            onClick={() => removeItem(item.id)}
                          >
                            <Heart className="h-5 w-5 text-red-500" fill="#ef4444" />
                          </button>
                        </div>
                        <CardContent className="p-4">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-medium hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-primary font-bold mt-2">
                            ${item.price.toFixed(2)}
                          </p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Link
                            to={`/product/${item.id}`}
                            className="w-full"
                          >
                            <Button variant="outline" className="w-full" size="sm">
                              View Product
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account and security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="password">
                  <TabsList>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                  </TabsList>

                  <TabsContent value="password" className="pt-6">
                    <Form {...passwordForm}>
                      <form
                        onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="mt-4">
                          Change Password
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>

                  <TabsContent value="payment" className="pt-6">
                    <div className="text-center py-8">
                      <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No payment methods saved</h3>
                      <p className="text-muted-foreground mt-2">
                        You haven't saved any payment methods yet.
                      </p>
                      <Button className="mt-4">
                        Add Payment Method
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
