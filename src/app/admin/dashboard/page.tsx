"use client";
import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertCircle,
  Bell,
} from "lucide-react";
import { getUserOrders } from "@/data/orders";
import { products } from "@/data/products";
import { Order } from "@/types/product";

// Mock data for charts
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 8000 },
  { name: "May", sales: 5000 },
  { name: "Jun", sales: 7000 },
  { name: "Jul", sales: 9000 },
];

// Mock notifications data
const initialNotifications = [
  {
    id: 1,
    message: "New order #o4 received",
    read: false,
    time: "2 hours ago",
  },
  {
    id: 2,
    message: "Payment confirmed for order #o3",
    read: false,
    time: "5 hours ago",
  },
  {
    id: 3,
    message: "Low stock alert for Classic Fit Oxford Shirt",
    read: true,
    time: "1 day ago",
  },
  { id: 4, message: "New user registered", read: true, time: "2 days ago" },
];

const AdminDashboardPage: React.FC = () => {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  // const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<(Product & { stockLevel: number })[]>([]);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    // In a real app, this would be an API call for admin-specific data
    // For demo, we'll use the existing orders and products data
    const allOrders = getUserOrders("1"); // Mock user ID
    setRecentOrders(allOrders.slice(0, 5));

    // Simulate low stock products (those that are in stock but we pretend they're low)
    const lowStock = products
      .filter((p) => p.inStock)
      .slice(0, 5)
      .map((p) => ({
        ...p,
        stockLevel: Math.floor(Math.random() * 10) + 1, // Random stock level between 1 and 10
      }));
    setLowStockProducts(lowStock);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  // Calculate statistics
  const totalProducts = products.length;
  const totalOrders = getUserOrders("1").length;
  const totalRevenue = getUserOrders("1").reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <div className="space-y-6">
      {/* Notification Bell */}
      <div className="flex justify-end mb-4 relative">
        <Button
          variant="ghost"
          className="relative border border-border"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-xs px-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
              {unreadCount}
            </Badge>
          )}
        </Button>

        {showNotifications && (
          <div className="absolute top-10 right-0 w-80 bg-white shadow-lg rounded-md z-50 border border-border">
            <div className="p-3 border-b flex justify-between items-center">
              <h3 className="font-medium">Notifications</h3>
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b border-border last:border-0 ${
                    notification.read ? "" : "bg-blue-50"
                  }`}
                >
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-border text-center">
              <Button variant="ghost" size="sm" className="w-full border border-border" asChild>
                <Link href="/admin/notifications">View all notifications</Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button
              asChild
              className="w-full bg-fashion-primary hover:bg-fashion-primary/90"
            >
              <Link href="/admin/products/new">
                <Package className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
            <Button asChild className="w-full border border-border">
              <Link href="/admin/orders">
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Orders
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="md:col-span-2 border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {"Today's Summary"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">New Orders</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sales</p>
              <p className="text-2xl font-bold">
                ${(totalRevenue * 0.15).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Visits</p>
              <p className="text-2xl font-bold">128</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">+2 added today</p>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +$1,250.00 this month
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales chart */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Monthly sales for the current year</CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No recent orders found
              </div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <div className="font-medium">Order #{order.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">${order.total.toFixed(2)}</div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full text-white ${
                        order.status === "active"
                          ? "bg-blue-500"
                          : order.status === "completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.status}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full border border-border">
            <Link href="/admin/orders">View all orders</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Low Stock Alert */}
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>Low Stock Alert</CardTitle>
            <CardDescription>
              Products that need to be restocked
            </CardDescription>
          </div>
          <AlertCircle className="ml-auto text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width="500"
                      height="500"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.category}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-red-500">
                    {product.stockLevel} in stock
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full border border-border">
            <Link href="/admin/products">Manage inventory</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
