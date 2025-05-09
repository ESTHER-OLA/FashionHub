"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Check } from "lucide-react";

// ✅ MOCK DATA
const mockNotifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #1234 has been placed.",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Successful",
    message: "Payment for order #1234 has been received.",
    read: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    type: "stock",
    title: "Low Stock Alert",
    message: "Product XYZ is running low on stock.",
    read: false,
    createdAt: new Date().toISOString(),
  },
];

const AdminNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filterType, setFilterType] = useState<string | null>(null);

  const filteredNotifications = filterType
    ? notifications.filter((notification) => notification.type === filterType)
    : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-blue-500";
      case "payment":
        return "bg-green-500";
      case "stock":
        return "bg-orange-500";
      case "system":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "order":
        return "Order";
      case "payment":
        return "Payment";
      case "stock":
        return "Stock";
      case "system":
        return "System";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Bell size={20} />
          <h2 className="text-xl font-semibold">Admin Notifications</h2>
          <Badge className="ml-2">{unreadCount} unread</Badge>
        </div>

        <div className="flex gap-2">
          {["All", "order", "payment", "stock", "system"].map((type) => (
            <Button
              key={type}
              variant={filterType === (type === "All" ? null : type) ? "default" : "outline"}
              onClick={() => setFilterType(type === "All" ? null : type)}
              className={
                type === "order"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : type === "payment"
                  ? "bg-green-500 hover:bg-green-600"
                  : type === "stock"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : type === "system"
                  ? "bg-purple-500 hover:bg-purple-600"
                  : ""
              }
            >
              {type === "All" ? "All" : getTypeLabel(type)}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={markAllNotificationsAsRead}
          disabled={unreadCount === 0}
        >
          <Check className="mr-2 h-4 w-4" />
          Mark All as Read
        </Button>
      </div>

      {/* Notifications list */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            No notifications found
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 ${
                !notification.read ? "border-l-4 border-blue-500" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`${getTypeColor(notification.type)}`}>
                      {getTypeLabel(notification.type)}
                    </Badge>
                    <h3 className="font-medium">{notification.title}</h3>
                  </div>
                  <p className="text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>

                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markNotificationAsRead(notification.id)}
                    className="ml-4"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNotificationsPage;
