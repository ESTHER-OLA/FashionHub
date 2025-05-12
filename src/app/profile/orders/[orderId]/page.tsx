"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Truck, AlertCircle } from "lucide-react";
import { getOrderById } from "@/data/orders";

const OrderDetailPage = () => {
  const router = useRouter();
  const params = useParams<{ orderId: string }>();
  const orderId = params?.orderId;

  const order = orderId ? getOrderById(orderId) : undefined;

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <AlertCircle size={64} className="mx-auto mb-4 text-red-500" />
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="text-fashion-secondary mb-8">
          We couldn&apos;t find the order you&apos;re looking for.
        </p>
        <Button
          onClick={() => router.push("/profile/order")}
          className="bg-fashion-primary hover:bg-fashion-primary/90"
        >
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push("/profile/order")}
          className="text-fashion-secondary hover:text-fashion-primary transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold">Order Details</h1>
      </div>

      {/* Order Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h2 className="font-bold text-xl mb-2">Order #{order.id}</h2>
            <div className="text-fashion-secondary">
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
              ? "Active"
              : order.status === "completed"
              ? "Completed"
              : "Cancelled"}
          </div>
        </div>

        {order.status === "active" && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Truck size={18} />
              <span className="font-medium">Tracking Information</span>
            </div>

            <div className="text-sm">
              <div className="mb-2">
                Tracking Number:{" "}
                <span className="font-medium">{order.trackingNumber}</span>
              </div>
              <div className="mb-2">
                Current Status:{" "}
                <span className="font-medium">{order.currentStatus}</span>
              </div>
              <div>
                Estimated Delivery:{" "}
                <span className="font-medium">{order.estimatedDelivery}</span>
              </div>
            </div>

            <div className="mt-4">
              <Link href={`/track-order/${orderId}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-500 border-blue-500"
                >
                  Track Order
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="font-bold text-xl mb-6">Order Items</h2>

            <div className="space-y-6">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-start gap-4 pb-6 border-b last:border-b-0 last:pb-0"
                >
                  <div className="h-24 w-24 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96} // Adjust width and height as needed
                      height={96} // Adjust width and height as neededclassName="h-full w-full object-cover"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <div className="text-fashion-secondary mb-2">
                      Quantity: {item.quantity}
                    </div>
                    <div className="font-semibold">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-fashion-secondary">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-fashion-secondary">Shipping</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-3 border-t font-bold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="font-bold text-xl mb-4">Shipping Address</h2>

            <address className="not-italic">
              <div className="mb-1">{order.shippingAddress.fullName}</div>
              <div className="mb-1">{order.shippingAddress.street}</div>
              <div className="mb-1">
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zipCode}
              </div>
              <div>{order.shippingAddress.country}</div>
            </address>

            <h3 className="font-bold text-lg mt-6 mb-2">Payment Method</h3>
            <div>{order.paymentMethod}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
