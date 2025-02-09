import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: any) => void;
}

export default function EditProductModal({ product, isOpen, onClose, onSave }: EditProductModalProps) {
  const [formData, setFormData] = useState(product);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Edit Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" />
          <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          <Select name="category" value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
            </SelectContent>
          </Select>
          <Select name="size" value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
            <SelectTrigger><SelectValue placeholder="Select Size" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="S">Small</SelectItem>
              <SelectItem value="M">Medium</SelectItem>
            </SelectContent>
          </Select>
          <Select name="color" value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
            <SelectTrigger><SelectValue placeholder="Select Color" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
            </SelectContent>
          </Select>
          <Input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock Quantity" />
          <Input name="regularPrice" type="number" value={formData.regularPrice} onChange={handleChange} placeholder="Regular Price" />
          <Input name="salePrice" type="number" value={formData.salePrice} onChange={handleChange} placeholder="Sale Price" />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={onClose} className="bg-gray-300">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-red-500 text-white">Edit Product</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
