"use client";

import { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../components/Productcard";
import { Plus } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Link from "next/link";
import { API_GET_PRODUCT } from "../constant/apiConstant";

interface Product {
    id: string;
    image: string;
    title: string;
    category: string;
    //price: string;
    description: string;
    //salesCount?: number;
    //remainingCount?: number;
}

export default function Products() {


    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1); // CHANGED: Added pagination state
    const [totalPages, setTotalPages] = useState(1); // CHANGED: Store total pages
    const itemsPerPage = 8; // CHANGED: Define items per page

    // Load product data from localStorage on mount
    useEffect(() => {


        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                // const response = await fetch("/api/product"); // Update this endpoint as needed
                const response = await fetch(`${API_GET_PRODUCT}?page=${currentPage}&limit=${itemsPerPage}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                if (!data.products) {
                    throw new Error("Invalid product data format from API");
                }
                // setProducts(data);




                const formattedProducts: Product[] = data.products.map(
                    (product: { _id: string; image?: string; name: string; category: string; price?: number; description: string }) => ({
                        id: product._id,
                        image: product.image || "/images/default-product.png",
                        title: product.name,
                        category: product.category,
                        description: product.description,
                    })
                );





                setProducts(formattedProducts);
                setTotalPages(data.totalPages); // CHANGED: Set total pages from API
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();


    }, [currentPage]);

    // Function to update a single product
    const updateProduct = (updatedProduct: Partial<Product> & { id: string }) => {
        // const updatedProducts = products.map((product) =>
        //     product.id === updatedProduct.id ? updatedProduct : product
        // );   //before the below code

        // setProducts((prevProducts) =>
        //     prevProducts.map((product) =>
        //         (product.id === updatedProduct.id ? updatedProduct : product))
        // ); //  FIXED: Removed unused `updatedProducts` variable

        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
            )
        );

    };

    // Function to delete a product
    const deleteProduct = (productId: string) => {

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
                            <ProductCard key={product.id} {...product} onUpdate={(updatedProduct) => updateProduct(updatedProduct)} onDelete={deleteProduct} />
                        ))}
                    </div>
                </div>
            </div>

            {/* CHANGED: Dynamic Pagination */}
            <div className="mt-6 w-full flex">
                <div className="w-fit">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => {
                                        if (currentPage > 1) {
                                            setCurrentPage((prev) => prev - 1);
                                        }
                                    }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                            {/* Fix: Ensure at least 1 page before mapping */}
                            {totalPages > 0 &&
                                [...Array(Math.max(1, totalPages))].map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            isActive={currentPage === index + 1}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}




                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => {
                                        if (currentPage < totalPages) {
                                            setCurrentPage((prev) => prev + 1);
                                        }
                                    }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>


        </div>
    );
}
