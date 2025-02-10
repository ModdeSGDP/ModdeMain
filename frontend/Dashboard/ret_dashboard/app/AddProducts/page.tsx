import type { Metadata } from "next";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import ProductUploadForm from "../components/ProductUploadForm";





export const metadata: Metadata = {
  title: "Add New Product",
  description: "Upload a new product to the store",
};

export default function Home() {
  return (
    <div className="pt-0 pl-64">

      <div>
            <h1 className="font-bold text-2xl mb-2">Orders List</h1><Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/Analytics">Analytics</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                
                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Horizontal Line */}
        <hr className="my-4 border-gray-300" />



         <div className="min-h-screen flex flex-col p-2">
 
      <main className="container mx-auto p-4">
         
       
        <ProductUploadForm />
      </main>
    </div>


      

      
        

           


        </div>

        
      


















     
     </div>
     
  );
}





