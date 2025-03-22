"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import EditProductModal from "../components/EditProduct";
import { Button } from "@/components/ui/button";
import { API_DELETE_PRODUCT, API_PATCH_UPDATE_PRODUCT } from "../constant/apiConstant";

// Product Interface
interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
}

// Props for ProductCard
interface ProductCardProps extends Product {
  onDelete: (id: string) => void;
  onUpdate: (updatedProduct: ProductCardProps) => void;
}

// Product Menu Component (Handles Edit & Delete)
const ProductMenu: React.FC<{ product: ProductCardProps; onDelete: () => void; onUpdate: (updatedProduct: ProductCardProps) => void }> = ({ product, onDelete, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  //  Function to update product in the backend
  const handleSave = async (updatedProduct: Product) => {
    try {
      const token = localStorage.getItem("token");

      //  Ensure `id` and `title` are NOT included in the request body
      const { id, title, ...updatableFields } = updatedProduct;

      const response = await fetch(API_PATCH_UPDATE_PRODUCT(id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatableFields), //  Send only editable fields
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const responseData = await response.json();

      console.log(`Product ${id} successfully updated`);

      //  Ensure the updated image is included (fallback to previous image)
      const updatedProductWithImage = {
        ...product,
        ...updatedProduct,
        image: updatedProduct.image || responseData.image || product.image || "/images/default-product.png",
      };

      //  Update localStorage and UI
      localStorage.setItem(`product-${id}`, JSON.stringify(updatedProductWithImage));
      onUpdate(updatedProductWithImage); //  Ensure UI reflects updated image

      setIsOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
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
            <Image src="/images/editicon.svg" alt="Edit" width={40} height={40} />
            <span>Edit Product</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
            <Image src="/images/deleteicon.svg" alt="Delete" width={40} height={40} />
            <span>Delete Product</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


      <EditProductModal product={{ id: product.id, title: product.title, description: product.description, category: product.category }} isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleSave} />
    </>
  );
};

// Product Card Component (Displays Individual Product)
export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  category,
  description,
  onDelete,
  onUpdate,
}) => {
  const [product, setProduct] = useState<ProductCardProps>({
    id,
    image: image || "/images/default-product.png", //  Ensure default image is used
    title,
    category,
    description,
    onDelete,
    onUpdate,
  });

  const router = useRouter();

  useEffect(() => {
    const storedProduct = localStorage.getItem(`product-${id}`);
    if (storedProduct) {
      setProduct((prev) => ({
        ...prev,
        ...JSON.parse(storedProduct),
        image: prev.image || "/images/default-product.png", //  Ensure image is not missing
      }));
    }
  }, [id]);

  const handleUpdate = (updatedProduct: Product) => {
    setProduct((prev) => ({
      ...prev,
      ...updatedProduct,
      image: updatedProduct.image || prev.image || "/images/default-product.png", //  Preserve image
    }));
  };

  // Function to delete the product from the backend
  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(API_DELETE_PRODUCT(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      console.log(`Product ${id} successfully deleted`);

      localStorage.removeItem(`product-${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Card className="w-full md:w-[260px] rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white p-2 flex flex-col justify-between">
      <div className="relative">
        <Image
          src={product.image ?? "/images/default-product.png"}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-48 object-cover rounded-t-xl"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/default-product.png"; //  Fallback for broken images
          }}
        />
        <ProductMenu product={product} onDelete={handleDeleteProduct} onUpdate={handleUpdate} />
      </div>

      <CardContent className="mt-2 p-4">
        <h2 className="text-lg font-semibold text-gray-900">{product.title}</h2>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>

        <Button
          className="mt-3 w-full bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={() => router.push(`/add-stocks?id=${id}`)}
        >
          Add Stocks
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
