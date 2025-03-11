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
  let arr = dataUrl.split(",");
  let mime = arr[0].match(/:(.*?);/)![1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

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
  // const [stockQuantity, setStockQuantity] = useState(0);
  // const [regularPrice, setRegularPrice] = useState(0);
  // const [salePrice, setSalePrice] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const files = Array.from(e.target.files);
  //   const validTypes = ["image/jpeg", "image/jpg", "image/png"];

  //   files.forEach((file) => {
  //     if (validTypes.includes(file.type)) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setImages((prev) => [...prev, reader.result as string]);
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       alert("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
  //     }
  //   });
  // };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log(productName,
      productId,
      description,
      category,
      color,
      images.length);

    // if (!productId || !productName || !description || !category || !color || images.length === 0)

    if (!productId || !productName || !description || !category || !color || images.length === 0) {
      alert("Please fill all required fields and upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("id", productId);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("color", color);
    formData.append("retailerId", "65a8f2e24b5e4a001c3d9b21"); // Replace with actual retailerId

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

        const newProduct = {
          id: responseData.id || Date.now().toString(), // Use backend ID if available
          image: responseData.image || firstImage, // Store image URL if provided by backend
          title: productName,
          category,
          description,
          color,
          retailerId: responseData.retailerId || "65a8f2e24b5e4a001c3d9b21",
        };

        // Retrieve existing products from localStorage
        const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
        const updatedProducts = [...storedProducts, newProduct];

        // Save updated products in localStorage
        localStorage.setItem("products", JSON.stringify(updatedProducts));

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



  // const handleSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();

  //   const newProduct = {
  //     id: Date.now().toString(), // Unique ID for the product
  //     image: images,
  //     title: productName,
  //     category,
  //     // price: `LKR ${salePrice}`,
  //     description,
  //     // salesCount: 0,
  //     // remainingCount: stockQuantity,
  //   };

  //   // Retrieve existing products from localStorage
  //   const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
  //   const updatedProducts = [...storedProducts, newProduct];

  //   // Save updated products in localStorage
  //   localStorage.setItem("products", JSON.stringify(updatedProducts));

  //   // Redirect to product page after adding
  //   router.push("/Product");
  // };

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
              maxLength={20}
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
                  <DropdownMenuItem onSelect={() => setCategory("All")}>All</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setCategory("Female")}>Female</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setCategory("Male")}>Male</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Size Dropdown */}
            {/* <div className="flex-1">
              <Label>Select Size</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center justify-between w-full">
                    {size}
                    <Image src="/images/chevron_down.svg" alt="Dropdown Icon" width={16} height={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setSize("All")}>All</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSize("Small")}>Small</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSize("Medium")}>Medium</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSize("Extra Large")}>Extra Large</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}
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

            {/* Stock Quantity */}
            {/* <div className="flex-1">
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input
                id="stockQuantity"
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(parseInt(e.target.value))}
                required
              />
            </div> */}
          </div>

          {/* Prices */}
          {/* <div className="flex gap-4">
            <div>
              <Label htmlFor="regularPrice">Regular Price</Label>
              <Input
                id="regularPrice"
                type="number"
                value={regularPrice}
                onChange={(e) => setRegularPrice(parseInt(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="salePrice">Sale Price</Label>
              <Input
                id="salePrice"
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(parseInt(e.target.value))}
                required
              />
            </div>
          </div> */}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" className="w-1/4">
              Upload Product
            </Button>
            <Button type="reset" className="w-1/4 border border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white transition">
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