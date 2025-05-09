"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();
  const from = "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.replace(from);
    } catch (error: any) {
      setError(error.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-fashion-primary">
            Welcome Back
          </h1>
          <p className="text-fashion-secondary mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded mb-6">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-fashion-accent hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-fashion-secondary cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-fashion-primary hover:bg-fashion-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-fashion-secondary">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-fashion-accent hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
