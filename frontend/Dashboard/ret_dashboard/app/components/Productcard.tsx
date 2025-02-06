"use client";
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  price: string;
  description: string;
  salesCount: number;
  remainingCount: number;
}

const ProductMenu = ({ onDelete, onEdit }: { onDelete: () => void; onEdit: () => void }) => {
  return (
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
          onSelect={onEdit}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/images/editicon.svg" // Path to your edit icon image
            alt="Edit"
            className="w-10 h-10"
          />
          <span>Edit Product</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={onDelete}
          className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
        >
          <img
            src="/images/delete icon.svg" // Path to your delete icon image
            alt="Delete"
            className="w-10 h-10"
          />
          <span>Delete Product</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
  const totalStock = salesCount + remainingCount;
  const stockPercentage = (remainingCount / totalStock) * 100;

  const handleDelete = () => {
    console.log("Delete product:", title);
    // Add your delete logic here, such as making an API call to delete the product
  };

  const handleEdit = () => {
    console.log("Edit product:", title);
    // Add your edit logic here, such as navigating to an edit page or opening a modal
  };

  return (
    <Card className="w-full md:w-[300px] rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white p-4">
      {/* Image and Menu */}
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={200}
          height={100}
          className="w-full h-48 object-cover rounded-lg"
        />
        <ProductMenu onDelete={handleDelete} onEdit={handleEdit} />
      </div>

      <CardContent className="mt-2">
        {/* Title, Category, and Price */}
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-md font-bold text-gray-800 mt-1">{price}</p>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </CardContent>

      {/* Sales and Stock Info */}
      {/* <CardFooter className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-5 text-gray-700">
            Sales <span className="text-gray-900 font-medium">↑ {salesCount}</span>
          </span>
          <span className="flex items-center gap-5 text-gray-700">
            Remaining <span className="text-gray-900 font-medium">{remainingCount}</span>
          </span>
        </div> 
        */}
      <CardFooter className="flex flex-col gap-4 p-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
        {/* Sales Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Sales</span>
            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clipRule="evenodd"
                />
              </svg>
              {salesCount}
            </span>
          </div>
        </div>

        {/* Remaining Products Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Remaining Products</span>
            <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clipRule="evenodd"
                />
              </svg>
              {remainingCount}
            </span>
          </div>
        </div>
      </CardFooter>




    </Card >
  );
};

export default ProductCard;

// Usage Example
/*
<ProductCard
  image="/images/product1.jpg"
  title="Hooded Long Sleeve - New York"
  category="Women"
  price="LKR 4850"
  description="Lorem ipsum is placeholder text commonly used in the graphic."
  salesCount={1269}
  remainingCount={1269}
/>
*/






