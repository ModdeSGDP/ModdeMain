"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { useState } from "react";




function page() {
    return (
        <div className="pt-0 pl-64">

            <div>
                <h1 className="font-bold text-2xl mb-2"></h1><Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/Orders">Orders</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbPage>Order info</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            

                {/* const orderData: Order = {
                //     // orderId: "#6548",
                // customerName: "Anne Fernando",
                // email: "anne@gmail.com",
                // phone: "+94 774 231 1212",
                // shippingAddress: "No 123, Duplication Rd, Colombo, Sri Lanka",
                // paymentMethod: "Debit Card",
//                 // orderStatus: "Pending",
//                 items: [
//                 {name: "Lorem Ipsum", quantity: 2, price: 1800.4 },
//                 {name: "Lorem Ipsum", quantity: 2, price: 1800.4 },
//                 {name: "Lorem Ipsum", quantity: 2, price: 1800.4 },
//                 {name: "Lorem Ipsum", quantity: 2, price: 1800.4 },
//                 ],
// };

//                 export default function Home() {
//   const [status, setStatus] = useState(orderData.orderStatus);

//                 return (
//                 <div className="p-6 bg-gray-100 min-h-screen">
//                     <div className="flex justify-between items-center mb-4">
//                         <h1 className="text-2xl font-semibold">Order ID: {orderData.orderId}</h1>
//                         <OrderStatusDropdown status={status} setStatus={setStatus} />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <OrderDetailCard title="Customer" details={orderData} />
//                         <OrderDetailCard title="Order Info" details={orderData} />
//                         <OrderDetailCard title="Deliver to" details={orderData} />
//                     </div>
//                     <OrderTable items={orderData.items} />
//                 </div>
//                 );
// }


                {/* Horizontal Line */}
                // <hr className="my-4 border-gray-300" />
            </div>
        </div>
    )
} 

export default page