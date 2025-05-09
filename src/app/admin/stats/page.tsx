"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getUserOrders } from "@/data/orders";
import { products } from "@/data/products";

const AdminStatsPage: React.FC = () => {
  // Mock data for charts
  const monthlySalesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 8000 },
    { month: "May", sales: 5000 },
    { month: "Jun", sales: 7000 },
    { month: "Jul", sales: 9000 },
  ];

  const visitorData = [
    { name: "Mon", visitors: 420 },
    { name: "Tue", visitors: 380 },
    { name: "Wed", visitors: 500 },
    { name: "Thu", visitors: 620 },
    { name: "Fri", visitors: 750 },
    { name: "Sat", visitors: 890 },
    { name: "Sun", visitors: 680 },
  ];

  const categorySalesData = [
    { name: "Men", value: 35 },
    { name: "Women", value: 45 },
    { name: "Children", value: 10 },
    { name: "Sports", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const allOrders = getUserOrders("1"); // Mock user ID
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalRevenue / (allOrders.length || 1);

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allOrders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5 orders from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +3 added this month
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${averageOrderValue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +$12.50 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <Card className="col-span-1 border border-border">
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
            <CardDescription>
              Revenue trend over the past 7 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" name="Sales ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Daily Visitors Chart */}
        <Card className="col-span-1 border border-border">
          <CardHeader>
            <CardTitle>Daily Visitors</CardTitle>
            <CardDescription>
              Website traffic for the current week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                    name="Visitors"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Sales Distribution */}
        <Card className="col-span-1 border border-border">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>
              Distribution of sales across product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySalesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categorySalesData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales per Product */}
        <Card className="col-span-1 border border-border">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>
              Products with the highest sales volume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={[
                    { name: "Classic White T-Shirt", sales: 120 },
                    { name: "Slim Fit Jeans", sales: 98 },
                    { name: "Leather Jacket", sales: 86 },
                    { name: "Running Shoes", sales: 72 },
                    { name: "Summer Dress", sales: 65 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value} units`, "Sales"]} />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" name="Units Sold" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatsPage;
