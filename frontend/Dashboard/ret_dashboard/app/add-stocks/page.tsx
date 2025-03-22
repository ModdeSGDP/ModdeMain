"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { API_POST_STOCKS_ADD, API_GET_STOCKS_PRODUCT_ID, API_PATCH_UPDATE_STOCKS } from "../constant/apiConstant";

// Define stock data structure
interface StockItem {
    stockId?: string; //  Stock ID is required for updates
    size: string;
    quantity: string;
}

// Define API response structure
interface StockApiResponse {
    _id: string;
    productId: {
        _id: string;
    };
    regularPrice?: number;
    salePrice?: number;
    stock?: StockItem[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const AddStocksPage = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get("id");
    const [regularPrice, setRegularPrice] = useState<string>("0");
    const [salePrice, setSalePrice] = useState<string>("0");
    const [stockData, setStockData] = useState<{ [key: string]: StockItem }>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    // Validate MongoDB ObjectId
    const isValidMongoId = (id: string) => /^[a-f\d]{24}$/i.test(id);

    // 🔥 **Fix 1: Fetch Existing Stock Correctly**
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
                    throw new Error("Failed to fetch stock data.");
                }

                const stockArray: StockApiResponse[] = await response.json();

                // 🔥 **Fix 2: Find correct stock entry for the product**
                const stockEntry = stockArray.find((item) => item.productId._id === productId);

                if (stockEntry) {
                    setRegularPrice(stockEntry.regularPrice ? stockEntry.regularPrice.toString() : "0");
                    setSalePrice(stockEntry.salePrice ? stockEntry.salePrice.toString() : "0");

                    //  Extract stock quantities per size
                    const formattedStockData: Record<string, StockItem> = {};
                    (stockEntry.stock || []).forEach((item) => {
                        formattedStockData[item.size] = {
                            stockId: stockEntry._id,
                            size: item.size,
                            quantity: item.quantity.toString(),
                        };
                    });

                    setStockData(formattedStockData);
                }
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
    const handleStockChange = (size: string, value: string) => {
        setStockData((prev) => ({
            ...prev,
            [size]: {
                ...prev[size],
                size,
                quantity: value,
            },
        }));
    };

    //  **Fix 3: Correcting Stock Update & Addition Logic**
    const handleSubmit = async () => {
        if (!productId) {
            setError("Product ID is missing.");
            return;
        }

        if (!isValidMongoId(productId)) {
            setError("Invalid Product ID format.");
            return;
        }

        // Convert stock data to the correct structure
        const stockEntries = sizes
            .map((size) => ({
                size,
                quantity: parseInt(stockData[size]?.quantity || "0", 10),
            }))
            .filter((entry) => entry.quantity > 0); //  Remove empty stocks

        if (stockEntries.length === 0) {
            setError("Please enter valid stock quantities.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log("Updating stock:", { productId, regularPrice, salePrice, stock: stockEntries }); //  Debugging log

            // ** Single request for bulk update/add stocks**
            // let response = await fetch(API_PATCH_UPDATE_STOCKS(productId), {
            //     method: "PATCH", //  Always try PATCH first
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${localStorage.getItem("token")}`,
            //     },
            //     body: JSON.stringify({
            //         productId,
            //         regularPrice: parseFloat(regularPrice),
            //         salePrice: parseFloat(salePrice),
            //         stock: stockEntries, //  Send all stock updates at once
            //     }),
            // });

            // //  If PATCH fails (stock doesn't exist), try POST
            // if (!response.ok) {
            //     console.log("PATCH failed, trying POST...");
            //     response = await fetch(API_POST_STOCKS_ADD, {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //             Authorization: `Bearer ${localStorage.getItem("token")}`,
            //         },
            //         body: JSON.stringify({
            //             productId,
            //             regularPrice: parseFloat(regularPrice),
            //             salePrice: parseFloat(salePrice),
            //             stock: stockEntries, //  Send all stock additions at once
            //         }),
            //     });
            // }  //before the below

            const response = await fetch(API_POST_STOCKS_ADD, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    productId,
                    regularPrice: parseFloat(regularPrice),
                    salePrice: parseFloat(salePrice),
                    stock: stockEntries,
                }),
            });




            // if (!response.ok) {
            //     const errorData = await response.json();
            //     console.error("Error Response:", errorData); //  Debugging
            //     throw new Error(errorData.message || "Failed to update/add stock.");
            // }

            // alert("Stock updated/added successfully!");
            //  Add stock notification to localStorage
            const existingNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");

            const newNotification = {
                id: Date.now(),
                message: `New Stock Added!\nProd ID: ${productId}`,
            };

            localStorage.setItem("notifications", JSON.stringify([newNotification, ...existingNotifications]));

            //  Trigger update for Header & Notifications page
            window.dispatchEvent(new Event("storage"));

            alert("Stock updated/added successfully!");



        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };





    return (
        <div className="pt-0 pl-4">
            <h1 className="font-bold text-2xl mb-2">Settings</h1>

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

            {/*  Regular Price and Sale Price Inputs */}
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Manage Stocks Of The Product</h1>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                        type="text"
                        placeholder="Enter Regular Price"
                        value={regularPrice}
                        onChange={(e) => setRegularPrice(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Enter Sale Price"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                    />
                </div>

                {/* Stock Quantity Table */}
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 border">Size</th>
                            <th className="p-3 border">Stock Quantity</th>
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
                                        onChange={(e) => handleStockChange(size, e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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
