"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import ProductGallery from "./ProductGallery";
import { API_POST_ADD_PRODUCTS } from "../constant/apiConstant";


const dataURLtoFile = (dataUrl: string, filename: string) => {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);


  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

const convertObjectURLToDataURL = async (objectURL: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(objectURL)
      .then((response) => response.blob()) // Convert to Blob
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string); // Convert Blob to Data URL
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
};


const ProductUploadForm = () => {
  const router = useRouter();
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("All");
  // const [size, setSize] = useState("All");
  const [color, setColor] = useState("#000000");
  const [images, setImages] = useState<string[]>([]);





  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log("Submitting Product Data:", {
      productId,
      productName,
      description,
      category,
      color,
      images
    });

    // if (!productId || !productName || !description || !category || !color || images.length === 0)

    if (!productId || !productName || !description || !category || !color || images.length === 0) {
      alert("Please fill all required fields and upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("color", color);
    //formData.append("retailerId", "65a8f2e24b5e4a001c3d9b21"); // Replace with actual retailerId

    // Upload only the first image
    const firstImage = images[0];
    const blob = dataURLtoFile(await convertObjectURLToDataURL(firstImage), "product-image.png");
    formData.append("file", blob); // Ensure field name matches NestJS controller

    try {
      const response = await fetch(API_POST_ADD_PRODUCTS, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'), // Add Authorization header
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        console.log("Product Added Successfully:", responseData);
        const existingNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");

        const newNotification = {
          id: Date.now(),
          message: `New Product Added!\nProduct ID: ${productId}\nProduct Name: ${productName}`,
        };

        localStorage.setItem("notifications", JSON.stringify([newNotification, ...existingNotifications]));
        window.dispatchEvent(new Event("storage"));

        alert("Product uploaded successfully!");




        // Redirect to product page after adding
        router.push("/Product");
      } else {
        throw new Error("Failed to upload product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading product.");
    }
  };





  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      {/* Left Side: Product Details */}
      <Card className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-6">Product Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              maxLength={40}
              required
            />
          </div>

          <div>
            <Label htmlFor="productId">Product ID</Label>
            <Input
              id="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Category and Size Dropdowns in One Line */}
          <div className="flex gap-4">
            {/* Category Dropdown */}
            <div className="flex-1">
              <Label>Category</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center justify-between w-full">
                    {category}
                    <Image src="/images/chevron_down.svg" alt="Dropdown Icon" width={16} height={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setCategory("Unisex")}>Unisex</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setCategory("Female")}>Female</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setCategory("Male")}>Male</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>


          </div>

          {/* Color Picker */}
          <div className="flex items-center gap-4">
            {/* Color Picker Input */}
            <div className="flex-1">
              <Label>Select Color</Label>
              <div className="relative">
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
                  onClick={() => document.getElementById("colorPicker")?.click()}
                >
                  <Image src="/images/pencil.svg" alt="Color Picker Icon" width={20} height={20} />
                </button>
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full pl-10 border rounded-md"
                  placeholder="#FFFFFF"
                />
                <Input
                  id="colorPicker"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute inset-0 w-0 h-0 opacity-0"
                />
              </div>
            </div>


          </div>




          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button
              type="submit"
              className="w-full sm:w-1/2 bg-black text-white hover:bg-gray-800 transition duration-200">
              Upload Product
            </Button>

            <Button
              type="reset"
              className="w-full sm:w-1/2 border border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white transition duration-200">
              Cancel
            </Button>
          </div>


        </form>
      </Card>

      {/* Right Side: Image Upload Section */}
      <Card className="flex-1 p-6">
        <ProductGallery images={images} setImages={setImages} />
      </Card>
    </div>
  );
};

export default ProductUploadForm;