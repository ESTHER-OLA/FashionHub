"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Mail, Shield, UserX } from "lucide-react";

// Mock User Data
const mockUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "customer",
    status: "active",
    lastLogin: "2025-05-08T10:30:00",
    orders: 5,
    joinDate: "2025-01-10T08:30:00",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2025-05-09T09:15:00",
    orders: 0,
    joinDate: "2024-11-20T14:45:00",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    role: "customer",
    status: "inactive",
    lastLogin: "2025-04-15T16:20:00",
    orders: 2,
    joinDate: "2025-02-05T11:10:00",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "customer",
    status: "active",
    lastLogin: "2025-05-07T13:45:00",
    orders: 8,
    joinDate: "2024-10-12T09:30:00",
  },
  {
    id: "5",
    name: "Robert Brown",
    email: "robert.brown@example.com",
    role: "customer",
    status: "active",
    lastLogin: "2025-05-01T11:20:00",
    orders: 3,
    joinDate: "2025-03-15T10:00:00",
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "customer",
    status: "active",
    lastLogin: "2025-05-06T15:10:00",
    orders: 1,
    joinDate: "2025-04-01T16:30:00",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    role: "customer",
    status: "blocked",
    lastLogin: "2025-03-20T14:30:00",
    orders: 0,
    joinDate: "2024-12-05T08:45:00",
  },
];

const AdminUsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  // Search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(results);
  };

  const resetSearch = () => {
    setSearchQuery("");
    setFilteredUsers(mockUsers);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-amber-500";
      case "blocked":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">+3 this month</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsers.filter((u) => u.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              85% of total users
            </p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              In the last 7 days
            </p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsers.filter((u) => u.role === "admin").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              With full access rights
            </p>
          </CardContent>
        </Card>
      </div>

      {/* User list */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage your site users, their roles and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name or email..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
              {searchQuery && (
                <Button type="button" variant="outline" onClick={resetSearch}>
                  Reset
                </Button>
              )}
            </form>
            <Button>Add User</Button>
          </div>

          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border border-border">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow className="border border-border" key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.role === "admin" ? "default" : "outline"}
                      >
                        {user.role === "admin" ? "Admin" : "Customer"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${getStatusColor(
                            user.status
                          )}`}
                        ></span>
                        <span className="capitalize">{user.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.orders}</TableCell>
                    <TableCell>
                      {new Date(user.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit user</DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Mail className="h-4 w-4" /> Email user
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.role !== "admin" && (
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Shield className="h-4 w-4" /> Make admin
                            </DropdownMenuItem>
                          )}
                          {user.status !== "blocked" ? (
                            <DropdownMenuItem className="text-red-600 flex items-center gap-2">
                              <UserX className="h-4 w-4" /> Block user
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>Unblock user</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow className="border border-border">
                    <TableCell colSpan={7} className="text-center py-6">
                      No users found. Try a different search term.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
