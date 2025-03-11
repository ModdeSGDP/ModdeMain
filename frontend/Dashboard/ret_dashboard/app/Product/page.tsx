"use client";

import { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../components/Productcard";
import { Plus } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Link from "next/link";

interface Product {
    id: string;
    image: string;
    title: string;
    category: string;
    price: string;
    description: string;
    salesCount: number;
    remainingCount: number;
}

export default function Products() {
    // const initialProducts: Product[] = [
    //     {
    //         id: "1",
    //         image: "/images/Productcard.svg",
    //         title: "Hooded Long Sleeve - New York",
    //         category: "Women",
    //         price: "LKR 4850",
    //         description: "Lorem ipsum is placeholder text commonly used in the graphic.",
    //         salesCount: 1269,
    //         remainingCount: 1269,
    //     },
    //     {
    //         id: "2",
    //         image: "/images/Productcard.svg",
    //         title: "Hooded Long Sleeve - New York",
    //         category: "Men",
    //         price: "LKR 5750",
    //         description: "Lorem ipsum is placeholder text commonly used in the graphic.",
    //         salesCount: 854,
    //         remainingCount: 450,
    //     },
    //     {
    //         id: "3",
    //         image: "/images/Productcard.svg",
    //         title: "Hooded Long Sleeve - New York",
    //         category: "Women",
    //         price: "LKR 7200",
    //         description: "Lorem ipsum is placeholder text commonly used in the graphic.",
    //         salesCount: 940,
    //         remainingCount: 220,
    //     },
    //     {
    //         id: "4",
    //         image: "/images/Productcard.svg",
    //         title: "Hooded Long Sleeve - New York",
    //         category: "Unisex",
    //         price: "LKR 6300",
    //         description: "Lorem ipsum is placeholder text commonly used in the graphic.",
    //         salesCount: 2034,
    //         remainingCount: 530,
    //     },
    //     {
    //         id: "5",
    //         image: "/images/Productcard.svg",
    //         title: "Hooded Long Sleeve - New York",
    //         category: "Unisex",
    //         price: "LKR 9100",
    //         description: "Lorem ipsum is placeholder text commonly used in the graphic.",
    //         salesCount: 1100,
    //         remainingCount: 320,
    //     },
    //     {
    //         id: "6",
    //         image: "/images/Productcard.svg",
    //         title: "Hooded Long Sleeve - New York",
    //         category: "Men",
    //         price: "LKR 10200",
    //         description: "Lorem ipsum is placeholder text commonly used in the graphic.",
    //         salesCount: 765,
    //         remainingCount: 120,
    //     },
    //     {
    //         id: "7",
    //         image: "/images/Productcard.svg",
    //         title: "Hooded Long Sleeve - New York",
    //         category: "Unisex",
    //         price: "LKR 4700",
    //         description: "Lorem ipsum is placeholder text commonly used in the graphic.",
    //         salesCount: 1560,
    //         remainingCount: 360,
    //     },
    //     {
    //         id: "8",
    //         image: "/images/Productcard.svg",
    //         title: "Hooded Long Sleeve - New York",
    //         category: "Unisex",
    //         price: "LKR 3200",
    //         description: "Lorem ipsum is placeholder text commonly used in the graphic.",
    //         salesCount: 1320,
    //         remainingCount: 480,
    //     },
    // ];

    const [products, setProducts] = useState<Product[]>([]);

    // Load product data from localStorage on mount
    useEffect(() => {
        // const storedProducts = localStorage.getItem("products");

        // if (storedProducts) {
        //     setProducts(JSON.parse(storedProducts)); // Load stored products
        // } else {
        //     setProducts(initialProducts); // Set initial data if no stored data
        //     localStorage.setItem("products", JSON.stringify(initialProducts));
        // }

        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products"); // Update this endpoint as needed
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();


    }, []);

    // Function to update a single product
    const updateProduct = (updatedProduct: Product) => {
        const updatedProducts = products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
        );
        // setProducts(updatedProducts);
        // localStorage.setItem("products", JSON.stringify(updatedProducts)); // Store updated product list in localStorage
    };

    // Function to delete a product
    const deleteProduct = (productId: string) => {
        // const updatedProducts = products.filter((product) => product.id !== productId);
        // setProducts(updatedProducts);
        // localStorage.setItem("products", JSON.stringify(updatedProducts)); // Update storage
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    };

    return (
        <div className="pt-0 pl-4">
            <div className="pt-0 pl-64">
                <div className="flex justify-end">
                    <Link href="/AddProducts">
                        <Button className="bg-black text-white hover:bg-gray-800 px-4 py-2 flex items-center space-x-2">
                            <Plus className="h-5 w-5" />
                            <span>Add Products</span>
                        </Button>
                    </Link>
                </div>
            </div>

            <h1 className="text-xl font-bold mb-0">Products</h1>
            <div className="flex">
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/Dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Product</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Horizontal Line */}
                    <hr className="my-4 border-gray-300" />

                    <div className="flex flex-row flex-wrap gap-5">
                        {products.map((product) => (
                            // <ProductCard key={product.id} {...product} onUpdate={updateProduct} onDelete={deleteProduct} />
                            <ProductCard key={product.id} {...product} onUpdate={updateProduct} onDelete={deleteProduct} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 w-full flex">
                <div className="w-fit">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
