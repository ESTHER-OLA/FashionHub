"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Heart, User, Truck, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getUserOrdersByStatus } from "@/data/orders";
import { Order } from "@/types/product";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  // const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  // const [cancelledOrders, setCancelledOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user?.id) {
      const active = getUserOrdersByStatus(user.id, "active");
      // const completed = getUserOrdersByStatus(user.id, "completed");
      // const cancelled = getUserOrdersByStatus(user.id, "cancelled");

      setActiveOrders(active);
      // setCompletedOrders(completed);
      // setCancelledOrders(cancelled);
    }
  }, [user]);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password updated successfully!");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-6 pb-6 border-b">
              <h2 className="font-bold text-lg mb-2">Welcome, {user?.name}</h2>
              <p className="text-fashion-secondary text-sm">{user?.email}</p>
            </div>

            <nav>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/profile/order"
                    className="flex items-center text-fashion-secondary hover:text-fashion-primary transition-colors"
                  >
                    <ShoppingBag size={18} className="mr-3" />
                    <span>My Orders</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile/wishlist"
                    className="flex items-center text-fashion-secondary hover:text-fashion-primary transition-colors"
                  >
                    <Heart size={18} className="mr-3" />
                    <span>My Wishlist</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center text-fashion-primary font-medium"
                  >
                    <User size={18} className="mr-3" />
                    <span>Account Info</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-orders"
                    className="flex items-center text-fashion-secondary hover:text-fashion-primary transition-colors"
                  >
                    <Truck size={18} className="mr-3" />
                    <span>Track Order</span>
                  </Link>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-500 hover:text-red-600 transition-colors"
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="orders">Recent Orders</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <h2 className="text-xl font-bold mb-6">Profile Information</h2>

                <form onSubmit={handleSaveProfile}>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-fashion-primary hover:bg-fashion-primary/90"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <h2 className="text-xl font-bold mb-6">Change Password</h2>

                <form onSubmit={handlePasswordUpdate}>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-fashion-primary hover:bg-fashion-primary/90"
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Recent Orders</h2>
                  <Link
                    href="/profile/orders"
                    className="text-fashion-accent hover:underline text-sm"
                  >
                    View All Orders
                  </Link>
                </div>

                <div className="space-y-6">
                  {activeOrders.length > 0 ? (
                    activeOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-50 p-4 flex justify-between items-center">
                          <div>
                            <div className="font-medium">Order #{order.id}</div>
                            <div className="text-sm text-fashion-secondary">
                              Placed on{" "}
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                            {order.status}
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="space-y-3">
                            {order.items.slice(0, 2).map((item) => (
                              <div
                                key={item.productId}
                                className="flex items-center gap-4"
                              >
                                <div className="h-16 w-16 bg-gray-100 rounded">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={96} // Adjust width and height as needed
                                    height={96} // Adjust width and height as needed
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-sm text-fashion-secondary">
                                    Qty: {item.quantity}
                                  </div>
                                </div>
                                <div className="font-medium">
                                  ${item.price.toFixed(2)}
                                </div>
                              </div>
                            ))}

                            {order.items.length > 2 && (
                              <div className="text-sm text-fashion-secondary">
                                +{order.items.length - 2} more items
                              </div>
                            )}
                          </div>

                          <div className="mt-4 pt-4 border-t flex justify-between">
                            <div className="text-sm">
                              <span className="text-fashion-secondary">
                                Total:
                              </span>
                              <span className="font-bold ml-2">
                                ${order.total.toFixed(2)}
                              </span>
                            </div>

                            <Link
                              href={`/profile/orders/${order.id}`}
                              className="text-fashion-accent hover:underline text-sm"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-fashion-secondary">
                      You don&apos;t have any active orders.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
