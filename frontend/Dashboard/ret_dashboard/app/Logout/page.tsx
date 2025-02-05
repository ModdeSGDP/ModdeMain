import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

function page() {
  return (
   <div className="pt-0 pl-64">
                       {/* Payment Heading */}
                       <h1 className="font-bold text-2xl mb-2">Settings</h1>
                 
                       {/* Breadcrumb Positioned Under Payment Heading & Right-Aligned */}
                      
                         <Breadcrumb>
                           <BreadcrumbList>
                             <BreadcrumbItem>
                               <BreadcrumbLink href="/Dashboard">Dahboard</BreadcrumbLink>
                             </BreadcrumbItem>
                             <BreadcrumbSeparator />
                             <BreadcrumbItem>
                               <BreadcrumbPage>Settings</BreadcrumbPage>
                             </BreadcrumbItem>
                           </BreadcrumbList>
                         </Breadcrumb>
                      
                     </div>
  )
}

export default page