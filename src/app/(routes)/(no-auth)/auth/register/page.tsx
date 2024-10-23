"use client";

import { useState } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { signIn } from "next-auth/react";
import { validationSchema } from "@/lib/validations";
import { motion } from "framer-motion"; // Import Framer Motion

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false); // Loading state

  const initialValues = {
    email: "",
    password: "",
    companyName: "",
    companyWebsite: "",
    interestedIn: "AI training",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    // Check for company name in email
    if (!values.email.includes(values.companyName)) {
      toast.error("Please use a work email.");
      return;
    }

    // Check for company name in company website
    if (!values.companyWebsite.includes(values.companyName)) {
      toast.error("Company name must be included in the website URL.");
      return;
    }

    setLoading(true); // Set loading to true while registering

    try {
      const loadingToast = toast.loading("Creating your account"); // Show loading toast
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      
      const res = await signIn("credentials", {
        redirect: false,
        username: values.email,
        password: values.password,
      });
      toast.dismiss(loadingToast); // Dismiss loading toast
      if (res?.error) {
        toast.error("Unable to sign-in at the moment. Please try again.");
        return;
      }

      toast.success("Registration successful!");
      router.push("/home");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#0c0c0c] px-4 pt-[80px] md:px-10">
      {/* Back Button */}
      <button onClick={() => router.push('/')} className="mb-4 text-white bg-proto-blue hover:bg-proto-dark-blue px-3 py-1 rounded text self-start">
        Home
      </button>
      <motion.div
        className="w-full max-w-md bg-[#15191b] px-6 md:px-8 py-3 rounded shadow-lg mx-4 md:mx-0 my-5 md:my-3"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-proto-blue">Register</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              {/* Email Field */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-400">Email</label>
                <Field
                  name="email"
                  type="email"
                  className={`w-full p-2 border rounded bg-[#15191b] text-gray-400 focus:outline-none focus:ring-0 transition-colors duration-300 ${
                    errors.email && touched.email ? "border-red-500" : "border-gray-600"
                  }`}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm transition-opacity duration-300" />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-400">Password</label>
                <Field
                  name="password"
                  type="password"
                  className={`w-full p-2 border rounded bg-[#15191b] text-gray-400 focus:outline-none focus:ring-0 transition-colors duration-300 ${
                    errors.password && touched.password ? "border-red-500" : "border-gray-600"
                  }`}
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm transition-opacity duration-300" />
              </div>

              {/* Company Name Field */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-400">Company Name</label>
                <Field
                  name="companyName"
                  type="text"
                  className={`w-full p-2 border rounded bg-[#15191b] text-gray-400 focus:outline-none focus:ring-0 transition-colors duration-300 ${
                    errors.companyName && touched.companyName ? "border-red-500" : "border-gray-600"
                  }`}
                />
                <ErrorMessage name="companyName" component="div" className="text-red-500 text-sm transition-opacity duration-300" />
              </div>

              {/* Company Website Field */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-400">Company Website</label>
                <Field
                  name="companyWebsite"
                  type="text"
                  className={`w-full p-2 border rounded bg-[#15191b] text-gray-400 focus:outline-none focus:ring-0 transition-colors duration-300 ${
                    errors.companyWebsite && touched.companyWebsite ? "border-red-500" : "border-gray-600"
                  }`}
                />
                <ErrorMessage name="companyWebsite" component="div" className="text-red-500 text-sm transition-opacity duration-300" />
              </div>

              {/* Interested In Field */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-400">Interested In</label>
                <Field
                  as="select"
                  name="interestedIn"
                  className="w-full p-2 border border-gray-400 rounded bg-[#15191b] text-gray-400 focus:outline-none focus:ring-0"
                >
                  <option value="AI training">AI training</option>
                  <option value="Map feature">Map feature</option>
                  <option value="3D data">3D data</option>
                  <option value="AR/VR">AR/VR</option>
                  <option value="Custom">Custom</option>
                  <option value="trial">Trial</option>
                </Field>
                <ErrorMessage name="interestedIn" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading} // Disable button when loading
                className={`w-full bg-[#14a8de] text-white p-2 rounded hover:bg-[#1280b3] transition duration-300 ease-in-out ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? 'Registering...' : 'Register'} {/* Show loading state text */}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#14a8de]">
            Login
          </Link>
        </p>
        <p className="text-center mt-2 text-sm text-gray-400">
          Don’t have a work email?{" "}
          <Link href="/auth/request-access" className="text-[#14a8de]">
            Request Access
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
