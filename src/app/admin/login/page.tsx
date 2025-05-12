"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn } from "lucide-react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAdmin } from "@/context/AdminContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const AdminLogin = () => {
  const { adminLogin } = useAdmin();
  // const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-fashion-primary">
            StyleHub Admin
          </h1>
          <p className="text-gray-600 mt-2">
            Sign in to access admin dashboard
          </p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              await adminLogin(values.email, values.password);
            } catch (err: unknown) {
              if (err instanceof Error) {
                setStatus(err.message);
              } else {
                setStatus("Login failed");
              }
            } finally {
              setSubmitting(false);
            }
          }}          
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              {status && (
                <Alert variant="destructive">
                  <AlertDescription>{status}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Field
                  name="email"
                  type="email"
                  as={Input}
                  placeholder="admin@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/admin/forgot-password"
                    className="text-sm text-fashion-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Field
                  name="password"
                  type="password"
                  as={Input}
                  placeholder="••••••••"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-fashion-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Signing in..."
                ) : (
                  <>
                    <LogIn className="mr-2" size={16} />
                    Sign In
                  </>
                )}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don&apos;t have an admin account?{" "}
            <Link
              href="/admin/signup"
              className="text-fashion-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:underline block mt-4"
          >
            Return to main site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
