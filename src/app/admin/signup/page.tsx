"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserPlus } from "lucide-react";
// import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAdmin } from "@/context/AdminContext";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

const AdminSignup = () => {
  const { adminSignup } = useAdmin();
  // const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-fashion-primary">
            StyleHub Admin
          </h1>
          <p className="text-gray-600 mt-2">Create an admin account</p>
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              await adminSignup(values.name, values.email, values.password);
            } catch (err: unknown) {
              if (err instanceof Error) {
                setStatus(err.message);
              } else {
                setStatus("Signup failed");
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
                <Label htmlFor="name">Full Name</Label>
                <Field name="name" as={Input} placeholder="John Doe" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

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
                <Label htmlFor="password">Password</Label>
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

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Field
                  name="confirmPassword"
                  type="password"
                  as={Input}
                  placeholder="••••••••"
                />
                <ErrorMessage
                  name="confirmPassword"
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
                  "Creating account..."
                ) : (
                  <>
                    <UserPlus className="mr-2" size={16} />
                    Create Admin Account
                  </>
                )}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an admin account?{" "}
            <Link
              href="/admin/login"
              className="text-fashion-primary hover:underline"
            >
              Sign in
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

export default AdminSignup;
