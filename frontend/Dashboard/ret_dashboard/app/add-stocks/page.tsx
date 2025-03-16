"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Get product ID from URL
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"; // Import Breadcrumb
import { API_POST_STOCKS_ADD, API_GET_STOCKS_PRODUCT_ID, API_PATCH_UPDATE_STOCKS } from "../constant/apiConstant";


// Define stock data structure
interface Stock {
    stockId?: string;
    quantity?: string;
    regularPrice?: string;
    salePrice?: string;
    size?: string;
}

// Define the API response type
type StockApiResponse = Stock[];



const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const AddStocksPage = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get("id"); // Get product ID from URL
    const [stockData, setStockData] = useState<{ [key: string]: { stockId?: string, quantity?: string; regularPrice?: string; salePrice?: string } }>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Validate if the productId is a valid MongoDB ObjectId
    const isValidMongoId = (id: string) => /^[a-f\d]{24}$/i.test(id);

    // Fetch existing stock details from backend
    useEffect(() => {
        const fetchStockData = async () => {
            if (!productId || !isValidMongoId(productId)) {
                setError("Invalid Product ID format.");
                return;
            }

            try {
                const response = await fetch(API_GET_STOCKS_PRODUCT_ID(productId), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch existing stock data.");
                }

                // const stocks = await response.json();
                const stocks: StockApiResponse = await response.json();
                const formattedStockData: Record<string, Stock> = {};

                // stocks.forEach((stock: any) => {
                //     formattedStockData[stock.size] = {
                //         quantity: stock.quantity.toString(),
                //         regularPrice: stock.regularPrice.toString(),
                //         salePrice: stock.salePrice.toString(),
                //         stockId: stock._id, // Store existing stock ID for updates
                //     };
                // });


                stocks.forEach((stock) => {
                    if (stock.size) {
                        formattedStockData[stock.size] = {
                            quantity: stock.quantity?.toString(),
                            regularPrice: stock.regularPrice?.toString(),
                            salePrice: stock.salePrice?.toString(),
                            stockId: stock.stockId, // Store existing stock ID for updates
                        };
                    }
                });

                setStockData(formattedStockData);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            }
        };

        fetchStockData();
    }, [productId]);




    // Handle stock input changes
    const handleStockChange = (size: string, field: string, value: string) => {
        setStockData((prev) => ({
            ...prev,
            [size]: {
                ...prev[size],
                [field]: value,
            },
        }));
    };

    // Submit stock updates to the backend
    const handleSubmit = async () => {
        if (!productId) {
            setError("Product ID is missing.");
            return;
        }

        if (!isValidMongoId(productId)) {
            setError("Invalid Product ID format.");
            return;
        }


        // const stockEntries = Object.entries(stockData).map(([size, data]) => ({
        //     productId,
        //     size,
        //     quantity: parseInt(data.quantity || "0", 10) || 0, // Ensure numeric values
        //     regularPrice: parseFloat(data.regularPrice || "0") || 0, // Convert to float
        //     salePrice: parseFloat(data.salePrice || "0") || 0, // Convert to float
        // }));

        // if (stockEntries.length === 0) {
        //     setError("Please enter stock quantities.");
        //     return;
        // }

        // setLoading(true);
        // setError(null);

        const stockEntries = sizes.map((size) => {
            const data = stockData[size] || {};
            const quantity = parseInt(data.quantity || "0", 10);
            const regularPrice = parseFloat(data.regularPrice || "0");
            const salePrice = parseFloat(data.salePrice || "0");

            if (!size || typeof size !== "string") {
                setError("Size should not be empty and must be a string.");
                return null;
            }

            if (isNaN(quantity) || quantity <= 0) {
                setError("Quantity should be a valid number greater than zero.");
                return null;
            }

            if (isNaN(regularPrice) || regularPrice <= 0) {
                setError("Regular Price should be a valid number greater than zero.");
                return null;
            }

            if (isNaN(salePrice) || salePrice < 0) {
                setError("Sale Price should be a valid number and not negative.");
                return null;
            }

            return {
                stockId: data.stockId,
                productId,
                size,
                quantity,
                regularPrice,
                salePrice,
            };
        }).filter((entry) => entry !== null);

        if (stockEntries.length === 0) {
            setError("Please enter valid stock quantities and prices.");
            return;
        }

        setLoading(true);
        setError(null);


        try {
            for (const stock of stockEntries) {
                let response;

                if (stock.stockId) {
                    response = await fetch(API_PATCH_UPDATE_STOCKS(stock.stockId), {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(stock),
                    });
                } else {
                    // **Add new stock**
                    response = await fetch(API_POST_STOCKS_ADD, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(stock),
                    });
                }

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to update stock.");
                }

                alert("Stock added successfully!");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="pt-0 pl-4">
            {/* Page Heading */}
            <h1 className="font-bold text-2xl mb-2">Settings</h1>

            {/* Breadcrumb Navigation */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/Dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add Stocks</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Horizontal Line */}
            <hr className="my-4 border-gray-300" />

            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Add Stocks for Product {productId}</h1>

                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 border">Size</th>
                            <th className="p-3 border">Stock Quantity</th>
                            <th className="p-3 border">Regular Price</th>
                            <th className="p-3 border">Sale Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sizes.map((size) => (
                            <tr key={size} className="border">
                                <td className="p-3 border text-center bg-red-100 font-bold">{size}</td>
                                <td className="p-3 border">
                                    <Input
                                        type="text"
                                        placeholder={`Enter ${size} Stock Quantity`}
                                        value={stockData[size]?.quantity || ""}
                                        onChange={(e) => handleStockChange(size, "quantity", e.target.value)}
                                    />
                                </td>
                                <td className="p-3 border">
                                    <Input
                                        type="text"
                                        placeholder="Enter Regular Price"
                                        value={stockData[size]?.regularPrice || ""}
                                        onChange={(e) => handleStockChange(size, "regularPrice", e.target.value)}
                                    />
                                </td>
                                <td className="p-3 border">
                                    <Input
                                        type="text"
                                        placeholder="Enter Sale Price"
                                        value={stockData[size]?.salePrice || ""}
                                        onChange={(e) => handleStockChange(size, "salePrice", e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <Button className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600"
                    onClick={handleSubmit}
                    disabled={loading}>
                    {loading ? "Saving..." : "Save Stock Updates"}
                </Button>
            </div>
        </div>
    );
};

export default AddStocksPage;



