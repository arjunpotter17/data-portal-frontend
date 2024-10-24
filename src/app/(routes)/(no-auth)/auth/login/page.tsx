"use client"; // Enable client-side behavior for form submission

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react"; // Using NextAuth for login
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Importing Sonner for toast notifications
import { motion } from "framer-motion"; // Importing Framer Motion

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loadingToast = toast.loading("Logging you in");
      const res = await signIn("credentials", {
        redirect: false,
        username: form.email,
        password: form.password,
      });

      toast.dismiss(loadingToast);

      if (res?.error) {
        setErrorMessage("Invalid email or password.");
        toast.error("Invalid email or password.");
        return;
      }
      console.log('tried home route')
      router.push("/home");
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Login failed. Please try again.");
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#0c0c0c] px-4 pt-[80px] md:px-10">
      {/* Back Button */}
      <button onClick={() => router.push('/')} className="mb-4 text-white hover:bg-proto-dark-blue bg-proto-blue px-3 py-1 rounded self-start">
        Home
      </button>
      {/* Using Framer Motion for fade-in effect */}
      <motion.div 
        className="w-full max-w-md bg-[#15191b] p-8 rounded shadow-lg mt-16"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-proto-blue">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-[#15191b] text-white focus:outline-none" // Remove outline
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-[#15191b] text-white focus:outline-none" // Remove outline
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-[#14a8de] text-white p-2 rounded hover:bg-[#1280b3]"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-[#14a8de]">
            Register
          </Link>
        </p>
        <p className="text-center mt-2 text-sm text-gray-400">
          Don&apos;t have a work email?{" "}
          <Link href="/auth/request" className="text-[#14a8de]">
            Request access
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
