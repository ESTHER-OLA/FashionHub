"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { orders } from "@/data/orders";
import { Search, Eye, Truck } from "lucide-react";
import { Order } from "@/types/product";
import { Label } from "@/components/ui/label";

const TRACKING_STAGES = [
  { value: "Processing", label: "Processing" },
  { value: "Packed", label: "Packed" },
  { value: "Shipped", label: "Shipped" },
  { value: "Out for Delivery", label: "Out for Delivery" },
  { value: "Delivered", label: "Delivered" },
  { value: "Failed Attempt", label: "Failed Attempt" },
  { value: "Cancelled", label: "Cancelled" },
];

const AdminOrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "completed" | "cancelled"
  >("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>("");
  const [shipperName, setShipperName] = useState<string>("");
  const [trackingUrl, setTrackingUrl] = useState<string>("");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  const { toast } = useToast();

  const filteredOrders: Order[] = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenUpdateModal = (order: Order): void => {
    setSelectedOrder(order);
    setTrackingNumber(order.trackingNumber || "");
    setCurrentStatus(order.currentStatus || "");
    setEstimatedDelivery(order.estimatedDelivery || "");
    setShipperName(order.shipperName || "");
    setTrackingUrl(order.trackingUrl || "");
    setAdditionalNotes(order.additionalNotes || "");
    setIsUpdateModalOpen(true);
  };

  const handleUpdateOrder = (): void => {
    if (!selectedOrder) return;

    let orderStatus: "active" | "completed" | "cancelled" =
      selectedOrder.status;

    if (currentStatus === "Delivered") {
      orderStatus = "completed";
    } else if (currentStatus === "Cancelled") {
      orderStatus = "cancelled";
    } else {
      orderStatus = "active";
    }

    // Update the order's status
    setSelectedOrder((prev) =>
      prev ? { ...prev, status: orderStatus } : null
    );

    toast({
      title: "Order updated",
      description: `Order #${selectedOrder.id} status updated to ${currentStatus}.`,
    });

    setIsUpdateModalOpen(false);
  };

  const generateTrackingLink = (): void => {
    const carriers: Record<string, string> = {
      UPS: "https://www.ups.com/track?tracknum=",
      FedEx: "https://www.fedex.com/apps/fedextrack/?tracknumbers=",
      USPS: "https://tools.usps.com/go/TrackConfirmAction?tLabels=",
      DHL: "https://www.dhl.com/us-en/home/tracking/tracking-express.html?submit=1&tracking-id=",
    };

    if (shipperName && trackingNumber) {
      const baseUrl = carriers[shipperName];
      if (baseUrl) {
        setTrackingUrl(`${baseUrl}${trackingNumber}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Truck size={20} />
          <h2 className="text-xl font-semibold">Manage Orders</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-white"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(
            value: "all" | "active" | "completed" | "cancelled"
          ) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border border-border">
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tracking</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow className="border border-border">
                <TableCell colSpan={7} className="h-24 text-center">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow className="border border-border" key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {order.shippingAddress.fullName}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        order.status === "active"
                          ? "bg-blue-500"
                          : order.status === "completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.currentStatus ? (
                      <Badge
                        variant="outline"
                        className="border-gray-400 text-gray-700"
                      >
                        {order.currentStatus}
                      </Badge>
                    ) : (
                      <span className="text-xs text-gray-500">Not tracked</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenUpdateModal(order)}
                        disabled={order.status === "cancelled"}
                      >
                        <Truck size={14} className="mr-1" />
                        Update
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/profile/orders/${order.id}`}>
                          <Eye size={14} />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Order Update Modal */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Update the shipping and tracking information for this order.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Order Status</Label>
              <Select
                value={selectedOrder?.status || ""}
                onValueChange={(value) => {
                  setSelectedOrder((prev) =>
                    prev
                      ? {
                          ...prev,
                          status: value as "active" | "cancelled" | "completed",
                        }
                      : null
                  );
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipperName">Shipping Company</Label>
              <Select value={shipperName} onValueChange={setShipperName}>
                <SelectTrigger id="shipperName">
                  <SelectValue placeholder="Select shipping company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPS">UPS</SelectItem>
                  <SelectItem value="FedEx">FedEx</SelectItem>
                  <SelectItem value="USPS">USPS</SelectItem>
                  <SelectItem value="DHL">DHL</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="trackingNumber">Tracking Number</Label>
                {shipperName && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={generateTrackingLink}
                    type="button"
                  >
                    Generate Link
                  </Button>
                )}
              </div>
              <Input
                id="trackingNumber"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g., TRK12345678"
              />
            </div>

            {shipperName === "Other" && (
              <div className="space-y-2">
                <Label htmlFor="trackingUrl">Tracking URL</Label>
                <Input
                  id="trackingUrl"
                  value={trackingUrl}
                  onChange={(e) => setTrackingUrl(e.target.value)}
                  placeholder="https://"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="currentStatus">Current Status</Label>
              <Select value={currentStatus} onValueChange={setCurrentStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shipping status" />
                </SelectTrigger>
                <SelectContent>
                  {TRACKING_STAGES.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedDelivery">Estimated Delivery Date</Label>
              <Input
                id="estimatedDelivery"
                type="date"
                value={estimatedDelivery ? estimatedDelivery.split("T")[0] : ""}
                onChange={(e) => setEstimatedDelivery(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Input
                id="additionalNotes"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any special instructions or notes"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              className="border border-border"
              variant="outline"
              onClick={() => setIsUpdateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateOrder}
              className="bg-fashion-primary hover:bg-fashion-primary/90 border border-border"
            >
              Update Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrdersPage;
