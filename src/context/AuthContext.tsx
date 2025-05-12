"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("fashionUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a successful login
      if (email && password) {
        // Mock user data
        const userData: User = {
          id: "1",
          email,
          name: email.split("@")[0],
        };

        setUser(userData);
        localStorage.setItem("fashionUser", JSON.stringify(userData));
        toast.success("Login successful. Welcome back!");
      } else {
        throw new Error("Please provide both email and password");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Login failed. Please try again.");
      } else {
        toast.error("unknown error occured. Please try again.");
      }
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a successful signup
      if (name && email && password) {
        // Mock user data
        const userData: User = {
          id: "1",
          email,
          name,
        };

        setUser(userData);
        localStorage.setItem("fashionUser", JSON.stringify(userData));
        toast.success("Account created successfully. Welcome to StyleHub!");
      } else {
        throw new Error("Please provide all required information");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Signup failed. Please try again.");
      } else {
        toast.error("unknown error occured. Please try again.");
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fashionUser");
    toast.success(
      "Logged out successfully. You've been logged out of your account."
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
