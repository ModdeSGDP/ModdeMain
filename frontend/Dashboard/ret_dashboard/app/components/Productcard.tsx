"use client";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EditProduct from "../components/EditProduct"; // Import the EditProduct component

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  price: string;
  description: string;
  salesCount: number;
  remainingCount: number;
}

const ProductMenu: React.FC<{ onDelete: () => void }> = ({ onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src="/images/editicon.svg" alt="Edit" className="w-10 h-10" />
            <span>Edit Product</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={onDelete}
            className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
          >
            <img src="/images/delete icon.svg" alt="Delete" className="w-10 h-10" />
            <span>Delete Product</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal for Edit Product */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg p-6">
          <EditProduct onClose={() => setIsOpen(false)} product={undefined} isOpen={false} onSave={function (formData: any): void {
            throw new Error("Function not implemented.");
          } } />
        </DialogContent>
      </Dialog>
    </>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  category,
  price,
  description,
  salesCount,
  remainingCount,
}) => {
  const handleDelete = () => {
    console.log("Delete product:", title);
    // Add your delete logic here
  };

  return (
    <Card className="w-full md:w-[300px] rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white p-4">
      {/* Image and Menu */}
      <div className="relative">
        <Image src={image} alt={title} width={200} height={100} className="w-full h-48 object-cover rounded-lg" />
        <ProductMenu onDelete={handleDelete} />
      </div>

      <CardContent className="mt-2">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-md font-bold text-gray-800 mt-1">{price}</p>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 p-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
        {/* Sales Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Sales</span>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              {salesCount}
            </span>
          </div>
        </div>

        {/* Remaining Products Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Remaining Products</span>
            <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
              {remainingCount}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;







