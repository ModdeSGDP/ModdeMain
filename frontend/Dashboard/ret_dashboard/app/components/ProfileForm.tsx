"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Pencil } from "lucide-react";


// **Validation Schema**
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name too long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name too long"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters").max(50, "Job title too long"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().regex(/^\d{10,15}$/, "Mobile number must be between 10-15 digits"),
  companyName: z.string().min(2, "Company name is required").max(50, "Company name too long"),
  companyWebsite: z.string().optional().or(z.literal("")).or(z.string().url("Invalid URL format")),
  companyRegisterNumber: z
    .string()
    .min(1, "Company Register Number is required")
    .regex(/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed"),
});

const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  // Initialize the form with default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      mobileNumber: "",
      companyName: "",
      companyWebsite: "",
      companyRegisterNumber: "",
    },
  });

  // Load saved user data from localStorage (Sign-Up Form Data)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedRetailer = localStorage.getItem("retailer")
    if (savedUser && savedRetailer) {
      // form.reset(JSON.parse(savedUser)); // Pre-fill form fields
      const userData = JSON.parse(savedUser)
      const retailerData = JSON.parse(savedRetailer)
      form.reset({
        ...userData,
        ...retailerData,
      })

    }

    const savedProfilePic = localStorage.getItem("profilePicture");
    if (savedProfilePic) {
      setProfilePicture(savedProfilePic);
    }
  }, [form]);

  // Handle Profile Picture Upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgData = e.target?.result as string;
        setProfilePicture(imgData);
        localStorage.setItem("profilePicture", imgData); // Save image in localStorage
      };
      reader.readAsDataURL(event.target.files[0]);

      // Trigger event to update Retailor dynamically
      setTimeout(() => {
        window.dispatchEvent(new Event("storage"));
      }, 500);
    }
  };

  // Handle Form Submission (Update User Data)
  const onSubmit = (values: Record<string, unknown>) => {
    console.log("Updated values:", values);
    localStorage.setItem("user", JSON.stringify(values)); // Save updated data in localStorage
    setIsEditing(false);

    //  Trigger event to update Retailor dynamically
    setTimeout(() => {
      window.dispatchEvent(new Event("storage"));
    }, 500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      {/* Profile Picture Upload */}
      <div className="flex items-center space-x-4">
        <label className="flex flex-col items-center cursor-pointer">
          {profilePicture ? (
            <Image src={profilePicture}
              alt="Profile"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center border-2 border-gray-300 rounded-full">
              <Camera className="text-gray-400 w-8 h-8" />
            </div>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
          <span className="text-sm text-gray-500">Upload New Photo</span>
        </label>
        <span className="text-xl font-semibold">{form.watch("companyName") || "InCaranage"}</span>
        <button onClick={() => setIsEditing(!isEditing)} className="ml-auto p-2 border rounded-lg hover:bg-gray-100">
          <Pencil className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Form Fields */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 mt-6">
          <FormField control={form.control} name="firstName" render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="lastName" render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="jobTitle" render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="mobileNumber" render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="companyName" render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="companyWebsite" render={({ field }) => (
            <FormItem>
              <FormLabel>Company Website (Optional)</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* ✅ Added Company Register Number */}
          <FormField control={form.control} name="companyRegisterNumber" render={({ field }) => (
            <FormItem>
              <FormLabel>Company Register Number *</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {isEditing && (
            <div className="col-span-2 flex justify-between mt-4">
              <Button type="submit" className="bg-red-500 hover:bg-red-600">Update</Button>
              <Button type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;

