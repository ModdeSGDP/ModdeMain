"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import EditProductModal from "../components/EditProduct";
import ImageCarousel from "./ImageCarousel";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  image: string[];
  title: string;
  category: string;
  price: string;
  description: string;
  salesCount: number;
  remainingCount: number;
  onDelete: (id: string) => void;  // Accepts a delete function from the parent
  onUpdate: (updatedProduct: ProductCardProps) => void;
}

const ProductMenu: React.FC<{ product: ProductCardProps; onDelete: () => void; onUpdate: (updatedProduct: ProductCardProps) => void }> = ({ product, onDelete, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (updatedProduct: ProductCardProps) => {
    localStorage.setItem(`product-${product.id}`, JSON.stringify(updatedProduct)); // Save only this product
    onUpdate(updatedProduct); // Update UI state
    setIsOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="absolute top-2 right-2 p-2 rounded-[10px] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100"
            aria-label="Open product menu"
          >
            <MoreVertical className="text-gray-500 hover:text-gray-700" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem onClick={() => setIsOpen(true)} className="flex items-center gap-2 cursor-pointer">
            <img src="/images/editicon.svg" alt="Edit" className="w-10 h-10" />
            <span>Edit Product</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
            <img src="/images/deleteicon.svg" alt="Delete" className="w-10 h-10" />
            <span>Delete Product</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditProductModal product={product} isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleSave} />
    </>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  category,
  price,
  description,
  salesCount,
  remainingCount,
  onDelete,
  onUpdate,
}) => {
  const [product, setProduct] = useState<ProductCardProps>({
    id,
    image,
    title,
    category,
    price,
    description,
    salesCount,
    remainingCount,
    onDelete,
    onUpdate,
  });

  // Load only the specific product from localStorage on mount
  useEffect(() => {
    const storedProduct = localStorage.getItem(`product-${id}`);
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct)); // Load the stored product
    }
  }, [id]);

  const handleUpdate = (updatedProduct: ProductCardProps) => {
    setProduct(updatedProduct);
  };

  return (
    <Card className="w-full md:w-[260px] rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white p-2 flex flex-col justify-between">
      <div className="relative">
        <ImageCarousel images={product.image} />
        <ProductMenu product={product} onDelete={() => onDelete(id)} onUpdate={handleUpdate} />
      </div>

      <CardContent className="mt-2 p-4">
        <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-md font-bold text-gray-800 mt-1">{product.price}</p>
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        {/* Add Stocks Button */}
        <Button
          className="mt-3 w-full bg-blue-500 text-white hover:bg-blue-600 transition"

        >
          Add Stocks
        </Button>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 p-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Sales</span>
          <span className="text-sm font-medium text-green-600">{product.salesCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Remaining Products</span>
          <span className="text-sm font-medium text-gray-900">{product.remainingCount}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;