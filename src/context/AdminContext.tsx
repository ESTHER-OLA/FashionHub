"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Admin {
  id: string;
  email: string;
  name: string;
  role: "admin";
}

interface AdminContextType {
  admin: Admin | null;
  isAdmin: boolean;
  isLoading: boolean;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminSignup: (name: string, email: string, password: string) => Promise<void>;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin is stored in localStorage
    const storedAdmin = localStorage.getItem("fashionAdmin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setIsLoading(false);
  }, []);

  const adminLogin = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call with proper authentication
      // For demo purposes, we'll use a simple validation
      if (email === "admin@fashionhub.com" && password === "admin123") {
        // Mock admin data
        const adminData: Admin = {
          id: "admin1",
          email,
          name: "Admin User",
          role: "admin",
        };

        setAdmin(adminData);
        localStorage.setItem("fashionAdmin", JSON.stringify(adminData));
        toast({
          title: "Admin login successful",
          description: "Welcome to admin dashboard!",
        });
      } else {
        throw new Error("Invalid admin credentials");
      }
    } catch (error: any) {
      toast({
        title: "Admin login failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      throw error;
    }
  };

  const adminSignup = async (name: string, email: string, password: string) => {
    try {
      // In a real app, this would be an API call with proper validation
      if (name && email && password) {
        // Mock admin data
        const adminData: Admin = {
          id: "admin1",
          email,
          name,
          role: "admin",
        };

        setAdmin(adminData);
        localStorage.setItem("fashionAdmin", JSON.stringify(adminData));
        toast({
          title: "Admin account created successfully",
          description: "Welcome to admin dashboard!",
        });
      } else {
        throw new Error("Please provide all required information");
      }
    } catch (error: any) {
      toast({
        title: "Admin signup failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      throw error;
    }
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem("fashionAdmin");
    toast({
      title: "Admin logged out successfully",
      description: "You've been logged out of your admin account",
    });
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        isAdmin: !!admin,
        isLoading,
        adminLogin,
        adminSignup,
        adminLogout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
