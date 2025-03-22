"use client";

import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API_POST_AUTH_LOGIN } from "../../constant/apiConstant";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";



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



  const onSubmit = async (data: FieldValues) => {
    setLoading(true);


    try {
      console.log("User Logging In:", data);

      const requestData = {
        email: data.email,
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
      console.log(responseData.accessToken);
      const token = responseData.accessToken;
      if (!token) {
        throw new Error("Token is missing in response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("authenticated", "true");

      console.log("Login Successful:", responseData);
      console.log("Navigating to Dashboard...");


      router.push("/Dashboard"); //  Redirect to Dashboard



    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Login Error:", err.message);
      } else {
        console.error("An unknown error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex  flex-col md:flex-row min-h-screen items-center justify-center p-6 relative">
      {/* Logo Positioned at Top Left */}
      <div className="absolute top-0 left-6">
        <Image src="/images/modde-logo.svg" alt="Modde Logo" width={160} height={40} className="w-32 md:w-40" />
      </div>

      <div className="bg-gray-100 max-w-3xl w-full  rounded-lg p-8 flex flex-col items-center border border-gray-300 ">
        <h1 className="text-4xl font-bold text-center">Welcome back!</h1>
        <h2 className="text-gray-600 text-center mb-6">Enter your credentials to access your account</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
          {/* Email Input Field with Label */}
          <div>
            <label className="text-gray-700 font-medium">Email address</label>
            <Input {...register("email")} placeholder="Enter your email" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
            Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline" >Sign Up</a>
          </p>
        </form>
      </div>


      <div className="hidden md:flex md:w-1/2 justify-center items-start flex-wrap gap-4 mt-[-20px]">
        {/* Image 1 */}
        <div className="w-full sm:w-[65%] max-w-[240px]">
          <Image
            src="/images/login_new_img2.jpg"
            alt="Model 1"
            width={350}
            height={420}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        {/* Image 2 */}
        <div className="w-full sm:w-[45%] max-w-[280px]">
          <Image
            src="/images/login_new_img.jpg"
            alt="Model 2"
            width={350}
            height={420}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
      </div>



    </div>
  );
};

export default Login;
