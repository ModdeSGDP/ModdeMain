"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
}


interface EditProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

export default function EditProductModal({ product, isOpen, onClose, onSave }: EditProductModalProps) {
  const [formData, setFormData] = useState<Product>(product);

  useEffect(() => {
    if (isOpen) {
      setFormData(product);
    }
  }, [isOpen, product]);

  // const handleChange = (e: { target: { name: any; value: any } }) => {
  //   const { name, value } = e.target;
  //   setFormData((prev: any) => ({ ...prev, [name]: value }));
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = () => {
    onSave(formData); // Save the specific product
    localStorage.setItem(`product-${formData.id}`, JSON.stringify(formData)); // Store specific product in local storage
    onClose(); // Close modal
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Edit Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="Product Name" />
          <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          <Select name="category" value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Men">Men</SelectItem>
              <SelectItem value="Women">Women</SelectItem>
              <SelectItem value="Women">Unisex</SelectItem>
            </SelectContent>
          </Select>
          {/* <Input name="price" type="text" value={formData.price} onChange={handleChange} placeholder="Price" />
          <Input name="salesCount" type="number" value={formData.salesCount} onChange={handleChange} placeholder="Sales Count" />
          <Input name="remainingCount" type="number" value={formData.remainingCount} onChange={handleChange} placeholder="Stock Quantity" /> */}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={onClose} className="bg-gray-300">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-red-500 text-white">Edit Product</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
