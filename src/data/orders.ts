import { Order } from "@/types/product";

export const orders: Order[] = [
  {
    id: "o1",
    userId: "1",
    items: [
      {
        productId: "p1",
        name: "Classic Fit Oxford Shirt",
        price: 59.99,
        quantity: 1,
        image:
          "/Images/image1.avif",
      },
      {
        productId: "p2",
        name: "Tailored Slim Fit Suit",
        price: 299.99,
        quantity: 1,
        image:
          "/Images/image3.avif",
      },
    ],
    status: "active",
    createdAt: "2025-04-18T10:30:00Z",
    updatedAt: "2025-04-18T10:30:00Z",
    shippingAddress: {
      fullName: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    paymentMethod: "Credit Card",
    subtotal: 359.98,
    shipping: 10,
    total: 369.98,
    trackingNumber: "TRK12345678",
    estimatedDelivery: "2025-04-26",
    currentStatus: "Shipped",
  },
  {
    id: "o2",
    userId: "1",
    items: [
      {
        productId: "p3",
        name: "Women's Cashmere Sweater",
        price: 149.99,
        quantity: 1,
        image:
          "/Images/image5.avif",
      },
    ],
    status: "completed",
    createdAt: "2025-04-10T14:20:00Z",
    updatedAt: "2025-04-15T09:45:00Z",
    shippingAddress: {
      fullName: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    paymentMethod: "PayPal",
    subtotal: 149.99,
    shipping: 10,
    total: 159.99,
    trackingNumber: "TRK87654321",
    estimatedDelivery: "2025-04-15",
    currentStatus: "Delivered",
  },
  {
    id: "o3",
    userId: "1",
    items: [
      {
        productId: "p5",
        name: "Kids Dinosaur Print T-shirt",
        price: 24.99,
        quantity: 2,
        image:
          "/Images/image9.avif",
      },
      {
        productId: "p9",
        name: "Organic Cotton Baby Onesie Set",
        price: 39.99,
        quantity: 1,
        image:
          "/Images/image17.avif",
      },
    ],
    status: "cancelled",
    createdAt: "2025-04-05T16:40:00Z",
    updatedAt: "2025-04-06T11:15:00Z",
    shippingAddress: {
      fullName: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    paymentMethod: "Debit Card",
    subtotal: 89.97,
    shipping: 10,
    total: 99.97,
    trackingNumber: "TRK43218765",
    estimatedDelivery: "2025-04-12",
    currentStatus: "Cancelled",
  },
];

export const getUserOrders = (userId: string): Order[] => {
  return orders.filter((order) => order.userId === userId);
};

export const getUserOrdersByStatus = (
  userId: string,
  status: "active" | "cancelled" | "completed"
): Order[] => {
  return orders.filter(
    (order) => order.userId === userId && order.status === status
  );
};

export const getOrderById = (orderId: string): Order | undefined => {
  return orders.find((order) => order.id === orderId);
};
