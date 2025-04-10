"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, FieldValues } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import { API_POST_USER_REGISTER } from "../../constant/apiConstant";
import { API_POST_RETAILER_REGISTER } from "../../constant/apiConstant";


// Validation Schema
const signUpSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
    lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
    jobTitle: z.string().min(2, "Job title must be at least 2 characters").max(50),
    email: z.string().email("Invalid email address"),
    mobileNumber: z.string().regex(/^\d{10,15}$/, "Mobile number must be between 10-15 digits"),
    companyName: z.string().min(2, "Company name is required").max(50),
    companyWebsite: z.string().optional(),
    companyRegisterNumber: z
      .string()
      .min(1, "Company Register Number is required")
      .regex(/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/\d.*\d/, "Password must include at least 2 numbers")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least 1 symbol"),
    confirmPassword: z.string(),
    privacyPolicy: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Privacy Policy.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const SignUpPage = () => {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      mobileNumber: "",
      companyName: "",
      companyWebsite: "",
      companyRegisterNumber: "",
      password: "",
      confirmPassword: "",
      privacyPolicy: false,
    },
  })



  const onSubmit = async (data: FieldValues) => {
    setServerError(null)
    try {
      console.log("Submitting Data:", data) // Debugging step

      const userData = {
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        // jobTitle: data?.jobTitle || "",
        email: data?.email || "",
        password: data?.password || "",
        role: "Admin", // Default role assigned
      }



      console.log("Sending formatted data:", userData) // Debugging Step
      let response = await fetch(API_POST_USER_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed. Please try again.");
      }



      const formattedDataRetailer = {
        companyName: data?.companyName,
        email: data?.email,
        contactNumber: String(data.mobileNumber),
        registrationNumber: String(data.companyRegisterNumber),
      }

      console.log("Sending formatted data:", formattedDataRetailer) // Debugging Step
      response = await fetch(API_POST_RETAILER_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formattedDataRetailer),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed. Please try again.");
      }










      const retailerResult = await response.json();
      console.log("User Signed Up:", retailerResult)
      data.password = null;
      localStorage.setItem("user", JSON.stringify(data))
      localStorage.setItem("retailer", JSON.stringify(data))
      localStorage.setItem("authenticated", "true")
      router.push("/Dashboard")
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message);
        console.error("Error during registration:", error);
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="w-full px-6 pt-2 pb-0">
        <Image src="/images/modde-logo.svg" alt="Modde Logo" width={140} height={40} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center px-6 pt-2 gap-6">
        {/* Left Section */}
        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl font-bold">Get started with Modde!</h1>
          <p className="text-gray-600 text-lg mt-2">Sign up to sell on Modde</p>
          <p className="text-gray-500 mt-4">
            We are looking for Sri Lankan brands and sellers who share our passion for delivering quality products and
            exceptional customer experiences. If that sounds like you, we’d love for you to apply!
          </p>
          <Button className="mt-6 bg-black text-white px-6 py-3 rounded-md">Learn More</Button>
        </div>


        {/* Right Section - Responsive Images */}
        <div className="hidden md:flex md:w-1/2 justify-center items-start flex-wrap gap-4 mt-[-20px]">
          {/* Image 1 */}
          <div className="w-full sm:w-[65%] max-w-[240px]">
            <Image
              src="/images/login_new_img.jpg"
              alt="Model 1"
              width={250}
              height={200}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>

          {/* Image 2 */}
          <div className="w-full sm:w-[45%] max-w-[280px]">
            <Image
              src="/images/login_new_img2.jpg"
              alt="Model 2"
              width={250}
              height={200}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>



      </div>

      {/* Form Section */}
      <div className="flex justify-center mt-8 px-4">
        <div className="w-full max-w-screen-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="text-gray-700 font-medium">First Name *</label>
              <Input {...register("firstName")} placeholder="Enter your first name here" />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-gray-700 font-medium">Last Name *</label>
              <Input {...register("lastName")} placeholder="Enter your last name here" />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>



            {/* Job Title */}
            <div>
              <label className="text-gray-700 font-medium">Job Title *</label>
              <Input {...register("jobTitle")} placeholder="Enter your position in your company" />
              {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="text-gray-700 font-medium">Email Address *</label>
              <Input {...register("email")} type="email" placeholder="Enter your e-mail address" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="text-gray-700 font-medium">Mobile Number *</label>
              <Input {...register("mobileNumber")} placeholder="Enter your mobile number" />
              {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>}
            </div>



            <div className="col-span-2 relative">
              <label className="text-gray-700 font-medium">Password *</label>
              <Input type={showPassword ? "text" : "password"} {...register("password")} placeholder="Enter a strong password" />
              <button
                type="button"
                className="absolute inset-y-0 right-3 top-5 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <div className="col-span-2 relative">
              <label className="text-gray-700 font-medium">Confirm Password *</label>
              <Input type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} placeholder="Re-enter your password" />
              <button
                type="button"
                className="absolute inset-y-0 right-3 top-5 flex items-center"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>




            {/* Company Name */}
            <div>
              <label className="text-gray-700 font-medium">Company Name *</label>
              <Input {...register("companyName")} placeholder="Enter your company name" />
              {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
            </div>

            {/* Optional Fields */}
            <div className="col-span-2">
              <label className="text-gray-700 font-medium">Company Website</label>
              <Input {...register("companyWebsite")} placeholder="Answer here (optional)" />
            </div>

            {/* Optional Fields */}
            <div className="col-span-2">
              <label className="text-gray-700 font-medium">Company Register Number</label>
              <Input
                {...register("companyRegisterNumber", {
                  required: "Company Register Number is required",
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Only letters and numbers are allowed",
                  },
                })}
                placeholder="Enter Your Company Register Number"
              />
              {errors.companyRegisterNumber && (
                <p className="text-red-500 text-sm">{errors.companyRegisterNumber.message}</p>
              )}
            </div>

            {/* Privacy Policy */}
            <div className="col-span-2 flex items-center">
              <input type="checkbox" {...register("privacyPolicy")} className="mr-2" />
              <span>I have read and agree to Modde’s Seller Privacy Notice</span>
              {errors.privacyPolicy && <p className="text-red-500 text-sm">{errors.privacyPolicy.message}</p>}
            </div>

            {/* Server Error Message */}
            {serverError && <p className="text-red-500 col-span-2 text-center">{serverError}</p>}

            {/* Submit Button */}
            <div className="col-span-2 flex flex-col items-center">
              <Button type="submit" className="bg-black hover:bg-gray-800">
                Submit
              </Button>

              {/* Already have an account? */}
              <p className="mt-4 text-gray-700">
                Do you already have an account?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gray-900 text-white text-sm py-4 mt-10">
        <div className="container mx-auto flex justify-between items-center px-6">
          <span>© 2024 - Modde SellerHub Dashboard</span>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/policy" className="hover:underline">
              Policy
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SignUpPage

