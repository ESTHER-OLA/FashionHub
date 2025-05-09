"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShippingForm {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
}

const CheckoutPage = () => {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState<ShippingForm>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const requiredFields = [
      "fullName",
      "street",
      "city",
      "state",
      "zipCode",
      "country",
      "email",
    ];
    const missingFields = requiredFields.filter(
      (field) => !shippingInfo[field as keyof ShippingForm]
    );

    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Process order
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      // Generate a random order ID
      const newOrderId = Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();
      setOrderId(newOrderId);
      setShowConfirmation(true);
    }, 1500);
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(false);
    clearCart();
    router.push(`/profile/order`);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-fashion-secondary mb-8">
            Add some products to your cart before checkout.
          </p>
          <Link href="/">
            <Button className="bg-fashion-primary hover:bg-fashion-primary/90">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    name="street"
                    placeholder="123 Main St"
                    value={shippingInfo.street}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="New York"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="NY"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode">Zip/Postal Code *</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    placeholder="10001"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="United States"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>

              <RadioGroup
                defaultValue="creditCard"
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="creditCard" id="creditCard" />
                  <Label htmlFor="creditCard" className="cursor-pointer">
                    Credit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="cursor-pointer">
                    PayPal
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bankTransfer" id="bankTransfer" />
                  <Label htmlFor="bankTransfer" className="cursor-pointer">
                    Bank Transfer
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "creditCard" && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" className="mt-1" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" type="button" asChild>
                <Link href="/cart">Return to Cart</Link>
              </Button>

              <Button
                className="bg-fashion-primary hover:bg-fashion-primary/90"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            {/* Items Summary */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={96} // Adjust width and height as needed
                      height={96} // Adjust width and height as needed
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.product.name}</h3>
                    <div className="text-fashion-secondary text-sm">
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 border-t pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-fashion-secondary">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-fashion-secondary">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>

              <div className="border-t pt-3 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="text-sm text-fashion-secondary">
              <p>
                By placing your order, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-fashion-accent hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-fashion-accent hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Confirmed!</DialogTitle>
            <DialogDescription>
              Thank you for your purchase. Your order has been received and is
              being processed.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="mb-4 bg-gray-50 p-3 rounded text-center">
              <div className="text-sm text-fashion-secondary">
                Your Order ID
              </div>
              <div className="font-bold text-xl">{orderId}</div>
            </div>

            <p className="text-sm text-fashion-secondary">
              We&apos;ve sent an order confirmation to your email. You can track
              your order in the &quot;My Orders&quot; section.
            </p>
          </div>

          <DialogFooter>
            <Button
              onClick={handleConfirmOrder}
              className="w-full bg-fashion-primary hover:bg-fashion-primary/90"
            >
              View My Orders
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
