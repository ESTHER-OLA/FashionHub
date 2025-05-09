"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, ArrowLeft } from "lucide-react";
import { getOrderById } from "@/data/orders";
import Image from "next/image";

const TrackOrderPage = () => {
  const params = useParams<{ orderId: string }>();
  const orderId = params?.orderId;
  const [order, setOrder] = useState(
    orderId ? getOrderById(orderId) : undefined
  );
  const router = useRouter();
  const [trackingId, setTrackingId] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!trackingId || !email) {
      setError("Please enter both tracking number and email");
      return;
    }

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, let's pretend we always find order with ID "o1"
      if (trackingId.toLowerCase() === "trk12345678") {
        const foundOrder = getOrderById("o1");
        setOrder(foundOrder);
      } else {
        setError("No order found with the provided tracking number and email");
      }
      setIsSearching(false);
    }, 1000);
  };

  // Define tracking steps based on order status
  const trackingSteps = useMemo(() => {
    if (!order) return [];
    return [
    {
      label: "Order Placed",
      rawDate: order?.createdAt,
      completed: true,
    },
    {
      label: "Processing",
      rawDate: order
        ? new Date(new Date(order.createdAt).getTime() + 86400000).toISOString()
        : "",
      completed: order?.status !== "cancelled",
    },
    {
      label: "Shipped",
      date:
        order?.status === "cancelled"
          ? ""
          : order?.status === "active"
          ? new Date(new Date(order.createdAt).getTime() +  172800000).toISOString()
          : "",
      completed: order?.status === "active" || order?.status === "completed",
    },
    {
      label: "Out for Delivery",
      date:
        order?.status === "cancelled" || order?.status === "active"
          ? ""
          : order?.status === "completed"
          ? new Date(new Date(order.createdAt).getTime() +  345600000).toISOString()
          : "",
      completed: order?.status === "completed",
    },
    {
      label: "Delivered",
      date:
        order?.status === "completed"
          ? new Date(new Date(order.createdAt).getTime()).toISOString()
          : "",
      completed: order?.status === "completed",
    },
  ];
}, [order]);

  const [displayDates, setDisplayDates] = useState<string[]>([]);
  useEffect(() => {
    if (!trackingSteps.length) return;
    setDisplayDates(
      trackingSteps.map((step) =>
        step.rawDate
          ? new Date(step.rawDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : ""
      )
    );
  }, [trackingSteps]);


  return (
    <div className="container mx-auto px-4 py-8">
      {orderId && (
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/profile/order")}
            className="text-fashion-secondary hover:text-fashion-primary transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>

      {!order && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border mb-12">
          <p className="text-fashion-secondary mb-6">
            Enter your tracking number and email address to track your order.
          </p>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="trackingId">Tracking Number</Label>
                <Input
                  id="trackingId"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="e.g., TRK12345678"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email used for order"
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-fashion-primary hover:bg-fashion-primary/90"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Track Order"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Order Info */}
      {order && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h2 className="font-bold text-xl mb-1">Order #{order.id}</h2>
                <div className="text-fashion-secondary text-sm">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div
                className={`
              text-white text-sm px-4 py-2 rounded-full self-start
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
                  ? "In Transit"
                  : order.status === "completed"
                  ? "Delivered"
                  : "Cancelled"}
              </div>
            </div>

            {order.status === "active" && (
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm">
                  <div className="mb-1">
                    Tracking Number:{" "}
                    <span className="font-medium">{order.trackingNumber}</span>
                  </div>
                  <div className="mb-1">
                    Current Status:{" "}
                    <span className="font-medium">{order.currentStatus}</span>
                  </div>
                  <div>
                    Estimated Delivery:{" "}
                    <span className="font-medium">
                      {order.estimatedDelivery}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {order.status === "cancelled" && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-red-500">
                  <X size={18} />
                  <span>
                    This order was cancelled on{" "}
                    {new Date(order.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Tracking Timeline */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <h2 className="font-bold text-xl mb-6">Tracking Timeline</h2>

            <div className="space-y-6">
              {trackingSteps.map((step, index) => {
                // Skip remaining steps for cancelled orders after "Processing"
                if (order?.status === "cancelled" && index > 1) return null;

                return (
                  <div key={step.label} className="relative pl-8">
                    {/* Timeline connector */}
                    {index < trackingSteps.length - 1 &&
                      order?.status !== "cancelled" && (
                        <div
                          className={`absolute left-[11px] top-[24px] h-12 w-0.5 ${
                            trackingSteps[index + 1].completed
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      )}

                    {/* Status dot */}
                    <div
                      className={`absolute left-0 top-0 h-6 w-6 rounded-full flex items-center justify-center ${
                        step.completed
                          ? order?.status === "cancelled" && index === 1
                            ? "bg-red-500"
                            : "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {step.completed &&
                        (order?.status === "cancelled" && index === 1 ? (
                          <X size={14} className="text-white" />
                        ) : (
                          <Check size={14} className="text-white" />
                        ))}
                    </div>

                    {/* Step content */}
                    <div>
                      <h3
                        className={`font-medium ${
                          step.completed
                            ? order?.status === "cancelled" && index === 1
                              ? "text-red-500"
                              : "text-green-600"
                            : "text-fashion-secondary"
                        }`}
                      >
                        {step.label}
                      </h3>

                      {displayDates[index] && (
                        <p className="text-sm text-fashion-secondary mt-1">
                          {displayDates[index]}
                        </p>
                      )}

                      {order?.status === "cancelled" && index === 1 && (
                        <p className="text-sm text-red-500 mt-1">
                          Order processing stopped due to cancellation
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="font-bold text-xl mb-6">Order Items</h2>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96} // Adjust width and height as needed
                      height={96} // Adjust width and height as needed
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="text-sm text-fashion-secondary">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                  <div className="font-medium">${item.price.toFixed(2)}</div>
                </div>
              ))}

              {/* Order totals */}
              <div className="pt-4 mt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-fashion-secondary">Total</span>
                  <span className="font-bold">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
