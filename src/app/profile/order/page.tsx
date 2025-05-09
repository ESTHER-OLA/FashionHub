"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Heart, User, Truck, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders, getUserOrdersByStatus } from "@/data/orders";

const OrdersPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("all");

  const allOrders = user ? getUserOrders(user.id) : [];
  const activeOrders = user ? getUserOrdersByStatus(user.id, "active") : [];
  const completedOrders = user
    ? getUserOrdersByStatus(user.id, "completed")
    : [];
  const cancelledOrders = user
    ? getUserOrdersByStatus(user.id, "cancelled")
    : [];

  const displayOrders = {
    all: allOrders,
    active: activeOrders,
    completed: completedOrders,
    cancelled: cancelledOrders,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

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
                    className="flex items-center text-fashion-primary font-medium"
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
                    className="flex items-center text-fashion-secondary hover:text-fashion-primary transition-colors"
                  >
                    <User size={18} className="mr-3" />
                    <span>Account Info</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-order"
                    className="flex items-center text-fashion-secondary hover:text-fashion-primary transition-colors"
                  >
                    <Truck size={18} className="mr-3" />
                    <span>Track Order</span>
                  </Link>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={logout}
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
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              {Object.entries(displayOrders).map(([tabKey, orders]) => (
                <TabsContent value={tabKey} key={tabKey}>
                  <h2 className="text-xl font-bold mb-6">
                    {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)} Orders
                  </h2>

                  <div className="space-y-6">
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <div
                          key={order.id}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                              <div className="font-medium">
                                Order #{order.id}
                              </div>
                              <div className="text-sm text-fashion-secondary">
                                Placed on{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                              </div>
                            </div>

                            <div
                              className={`
                            text-white text-xs px-3 py-1 rounded-full
                            ${
                              order.status === "active"
                                ? "bg-blue-500"
                                : order.status === "completed"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }
                          `}
                            >
                              {order.status === "active"
                                ? "Active"
                                : order.status === "completed"
                                ? "Completed"
                                : "Cancelled"}
                            </div>
                          </div>

                          <div className="p-4">
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div
                                  key={item.productId}
                                  className="flex items-center gap-4"
                                >
                                  <div className="h-16 w-16 flex-shrink-0 bg-gray-100 rounded">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      width={96} // Adjust width and height as needed
                                      height={96} // Adjust width and height as neededclassName="h-full w-full object-cover"
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium truncate">
                                      {item.name}
                                    </div>
                                    <div className="text-sm text-fashion-secondary">
                                      Qty: {item.quantity}
                                    </div>
                                  </div>
                                  <div className="font-medium">
                                    ${item.price.toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row sm:justify-between gap-4">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                                <div className="text-sm">
                                  <span className="text-fashion-secondary">
                                    Total:
                                  </span>
                                  <span className="font-bold ml-2">
                                    ${order.total.toFixed(2)}
                                  </span>
                                </div>

                                {order.status === "active" && (
                                  <div className="text-sm">
                                    <span className="text-fashion-secondary">
                                      Estimated Delivery:
                                    </span>
                                    <span className="ml-2">
                                      {order.estimatedDelivery}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="flex gap-2 sm:gap-4">
                                {order.status === "active" && (
                                  <Link href={`/track-order/${order.id}`}>
                                    <Button variant="outline" size="sm">
                                      Track Order
                                    </Button>
                                  </Link>
                                )}

                                <Link href={`/profile/orders/${order.id}`}>
                                  <Button
                                    size="sm"
                                    className="bg-fashion-primary hover:bg-fashion-primary/90"
                                  >
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-fashion-secondary">
                        You don&apos;t have any{" "}
                        {activeTab === "all" ? "" : activeTab} orders.
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
