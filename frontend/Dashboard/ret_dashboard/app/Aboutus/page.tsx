import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";

function page() {
  return (
    <div className="pt-0 pl-64">
     
      <div>
            <h1 className="font-bold text-2xl mb-2">Orders List</h1><Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/PrivacyPolicy">Privacy Policy</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                
                    <BreadcrumbItem>
                        <BreadcrumbPage>Aboutus</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Horizontal Line */}
        <hr className="my-4 border-gray-300" />
    </div>
    </div>
  )
}

export default page