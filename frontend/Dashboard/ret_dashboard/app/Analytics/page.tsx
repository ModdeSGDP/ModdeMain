import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


function page() {
  return (
   <div className="pt-0 pl-64">
             {/* Payment Heading */}
             <h1 className="font-bold text-2xl mb-2">Enquiry</h1>
       
             {/* Breadcrumb Positioned Under Payment Heading & Right-Aligned */}
            
               <Breadcrumb>
                 <BreadcrumbList>
                   <BreadcrumbItem>
                     <BreadcrumbLink href="/Product">Product</BreadcrumbLink>
                   </BreadcrumbItem>
                   <BreadcrumbSeparator />
                   <BreadcrumbItem>
                     <BreadcrumbPage>Analytics</BreadcrumbPage>
                   </BreadcrumbItem>
                 </BreadcrumbList>
               </Breadcrumb>
            
           </div>
  )
}

export default page