"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import Image from 'next/image';

const ProductUploadForm = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [color, setColor] = useState("#000000");
  const [stockQuantity, setStockQuantity] = useState(0);
  const [regularPrice, setRegularPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    files.forEach((file) => {
      if (validTypes.includes((file as File).type)) {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file as Blob);
      } else {
        alert("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log({
      productName,
      description,
      category,
      size,
      color,
      stockQuantity,
      regularPrice,
      salePrice,
      images,
    });
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
              maxLength={20}
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

          {/* Category Dropdown */}
          <div className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-2">
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
          </div>

          {/* Color Picker */}
          <div>
            <Label>Select Color</Label>
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-20 h-10"
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <Label htmlFor="stockQuantity">Stock Quantity</Label>
            <Input
              id="stockQuantity"
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(parseInt(e.target.value))}
              required
            />
          </div>

          {/* Prices */}
          <div className="flex gap-4">
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
          </div>

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
        <h2 className="text-xl font-bold mb-6">Product Gallery</h2>
        <div className="space-y-4">
          {/* Image Upload Input */}
          <Input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            multiple
            onChange={handleImageUpload}
          />

          {/* Image Preview */}
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                {typeof image === 'string' && (
                  <img src={image} alt={`Uploaded ${index}`} className="w-full h-24 object-cover rounded" />
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
    
  );
};

export default ProductUploadForm;
