import type { Metadata } from "next";
import "./globals.css";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Sidebar } from "lucide-react";
import ProductCard from "../Product/page";




export const metadata: Metadata = {
  title: "Add New Product",
  description: "Upload a new product to the store",
};

export default function Home() {
  return (
    <div className="pt-0 pl-64">
        <h1 className="text-xl font-bold mb-0"> Add Products</h1>
        <div className="flex">  
    {/* <div className="min-h-screen flex flex-col p-6"> */}
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">All Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add New Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      </div>
      <div className="min-h-screen flex flex-col p-6">
      {/* Page Content */}
      <main className="container mx-auto p-4">
         
        <hr className="my-4 border-gray-300" />
        <ProductUploadForm />
      </main>
    </div>
     </div>
     
  );
}


