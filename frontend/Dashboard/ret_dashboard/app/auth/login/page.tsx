"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API_POST_AUTH_LOGIN } from "../../constant/apiConstant";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// **Validation Schema**
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  // const [serverError, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);


  // const form = useForm({
  //   resolver: zodResolver(loginSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    // console.log("User Logged In:", data);
    // setLoading(true);
    setLoading(true);
    // setError(null);

    try {
      console.log("User Logging In:", data);

      const requestData = {
        email: data.email, // Adjusting field name for backend
        password: data.password,
      };


      const response = await fetch(API_POST_AUTH_LOGIN, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          // 'authorization': 'Bearer ' + localStorage.getItem('token')
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData)
      });

      // if (!response.ok) {
      //   console.error("Login failed:", response);
      //   setLoading(false);
      //   return;
      // }

      if (!response.ok) {
        const errorData = await response.json();
        // throw new Error(errorData.message || "Login failed. Please try again.");
        // **Handle Invalid Email or Password Error**
        if (errorData.message.includes("Invalid email")) {
          setError("email", { type: "manual", message: "Invalid email address." });
        } else if (errorData.message.includes("Invalid password")) {
          setError("password", { type: "manual", message: "Incorrect password." });
        } else {
          setError("email", { type: "manual", message: "Invalid credentials. Please try again." });
          setError("password", { type: "manual", message: "Invalid credentials. Please try again." });
        }

        throw new Error(errorData.message || "Login failed.");

      }

      // const responseData = await response.json();
      // localStorage.setItem("token", responseData.token);

      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("authenticated", "true");

      console.log("Login Successful:", responseData);
      router.push("/Dashboard"); // ✅ Redirect to Dashboard

      // setTimeout(() => {
      //   localStorage.setItem("authenticated", "true");
      //   router.push("/Dashboard"); // Redirect to dashboard upon successful login
      // }, 1500);

    } catch (err: any) {
      // setError(err.message);
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center  p-6 relative">
      {/* Logo Positioned at Top Left */}
      <div className="absolute top-0 left-6">
        <img src="/images/modde-logo.svg" alt="Modde Logo" className="w-40" />
      </div>

      <div className="max-w-3xl w-full  rounded-lg p-8 flex flex-col items-center border border-gray-300 ">
        <h1 className="text-4xl font-bold text-center">Welcome back!</h1>
        <h2 className="text-gray-600 text-center mb-6">Enter your credentials to access your account</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
          {/* Email Input Field with Label */}
          <div>
            <label className="text-gray-700 font-medium">Email address</label>
            <Input {...register("email")} placeholder="Enter your email" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}  {/* ✅ Show error message */}
          </div>

          {/* Password Input Field with Label and Forgot Password */}
          <div className="relative">
            <label className="text-gray-700 font-medium">Password</label>
            <Input {...register("password")} type={showPassword ? "text" : "password"} placeholder="Enter your password" />
            <button
              type="button"
              className="absolute inset-y-0 right-3 top-5 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaRegEye />}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}  {/* ✅ Show error message */}
            <a href="#" className="absolute right-2 top-0 text-blue-600 text-sm hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Remember me for 30 days</span>
            </label>
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

      {/* Right Section - Images Aligned Correctly with Small Gap */}
      <div className="md:w-1/2 flex justify-center items-start relative">
        <div className="absolute -top-48 right-5">
          <img src="/images/model1.svg" alt="Model 1" className="w-64 h-auto rounded-lg" />
        </div>
        <div className="absolute -top-48 left-20">
          <img src="/images/model2.svg" alt="Model 2" className="w-52 h-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Login;
