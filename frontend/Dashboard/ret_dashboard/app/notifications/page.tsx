'use client';

import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Bell } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

function Page() {
    const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Load from localStorage
    useEffect(() => {
        const updateNotifications = () => {
            const stored = localStorage.getItem("notifications");
            if (stored) {
                setNotifications(JSON.parse(stored));
            }
        };

        updateNotifications(); // Initial load
        window.addEventListener("storage", updateNotifications); // Listen for storage changes

        return () => window.removeEventListener("storage", updateNotifications);
    }, []);

    const extractProductId = (msg: string) => {
        const match = msg.match(/Product ID:\s*(.+)|Prod ID:\s*(.+)/);
        return match ? (match[1] || match[2]).split("\n")[0].trim() : "N/A";
    };

    const extractProductName = (msg: string) => {
        const match = msg.match(/Product Name:\s*(.+)/);
        return match ? match[1].trim() : null;
    };

    const isStockNotification = (msg: string) => msg.includes("New Stock Added!");

    const totalPages = Math.ceil(notifications.length / itemsPerPage);
    const paginatedNotifications = notifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="pt-0 pl-4 pr-4">
            <h1 className="font-bold text-2xl mb-2">Notifications</h1>

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/Settings">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Notifications</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <hr className="my-4 border-gray-300" />

            {notifications.length > 0 ? (
                <div className="space-y-4">
                    {paginatedNotifications.map((n) => {
                        const isStock = isStockNotification(n.message);
                        const productId = extractProductId(n.message);
                        const productName = extractProductName(n.message);

                        return (
                            <div
                                key={n.id}
                                className="bg-white border border-gray-200 shadow-md rounded-lg p-4 flex items-start gap-4"
                            >
                                <div className="text-blue-600 mt-1">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div className="text-sm text-gray-800 leading-relaxed space-y-1">
                                    <p className="font-semibold text-blue-600">
                                        {isStock ? "New Stock Added!" : "New Product Added!"}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-700">Product ID:</span>{" "}
                                        <span className="text-gray-900">{productId}</span>
                                    </p>
                                    {!isStock && productName && (
                                        <p>
                                            <span className="font-medium text-gray-700">Product Name:</span>{" "}
                                            <span className="text-gray-900">{productName}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Pagination */}
                    <div className="mt-6 w-full flex">
                        <div className="w-fit">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, index) => (
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
                                            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-gray-600 text-sm italic mt-6">
                    No new alerts at the moment.
                </div>
            )}
        </div>
    );
}

export default Page;
