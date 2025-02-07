"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// **Validation Schema**
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("User Logged In:", data);
    setLoading(true);
    setTimeout(() => {
      router.push("/Dashboard"); // Redirect to dashboard upon successful login
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8 flex flex-col items-center">
        {/* Logo */}
        <img src="/images/modde-logo.svg" alt="Modde Logo" className="w-24 mb-4" />

        <h2 className="text-3xl font-bold text-center">Welcome back!</h2>
        <p className="text-gray-600 text-center mb-6">Enter your credentials to access your account</p>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
          <Input label="Email Address" {...form.register("email")} />
          <Input label="Password" type="password" {...form.register("password")} />
          
          {/* Remember me & Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Remember me for 30 days</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Sign Up Redirect */}
          <p className="text-sm text-center mt-4">
            Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
