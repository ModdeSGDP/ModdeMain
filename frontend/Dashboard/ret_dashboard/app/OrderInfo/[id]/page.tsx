"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import CustomerInfo from "../../components/orderinfocomponents/CustomerInfo";
import OrderInfo from "../../components/orderinfocomponents/OrderInfo";
import DeliveryInfo from "../../components/orderinfocomponents/DeliveryInfo";
import PaymentInfo from "../../components/orderinfocomponents/PaymentInfo";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  quantity: number;
  total: string;
}

interface OrderDetails {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  total: string;
  status: string;
  products: Product[];
}

const statusColors: { [key: string]: string } = {
  Pending: "bg-yellow-100 text-yellow-600",
  Confirmed: "bg-green-100 text-green-600",
  Processing: "bg-blue-100 text-blue-600",
  Picked: "bg-purple-100 text-purple-600",
  Shipped: "bg-pink-100 text-pink-600",
  Delivered: "bg-green-400 text-white",
  Canceled: "bg-red-100 text-red-600",
};

const OrderInfoPage = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    if (!orderId) return; // Prevent execution if orderId is undefined

    console.log("Fetching Order ID:", orderId); // Debugging log

    const orderData = localStorage.getItem("orderData");

    if (!orderData) {
      console.warn("No order data found in localStorage."); // Debugging log
      router.push("/Orders");
      return;
    }

    try {
      const parsedOrders: OrderDetails[] = JSON.parse(orderData);
      console.log("Parsed Orders from LocalStorage:", parsedOrders); // Debugging log

      const order = parsedOrders.find((order) => String(order.id) === String(orderId));

      if (!order) {
        console.warn("Order not found for ID:", orderId); // Debugging log
        router.push("/Orders");
      } else {
        setOrderDetails(order);
      }
    } catch (error) {
      console.error("Error parsing order data:", error); // Debugging log
      router.push("/Orders");
    }
  }, [orderId, router]);

  if (!orderDetails) return <p>Loading order details...</p>;

  return (
    <div className="pt-0 pl-4">
      <h1 className="font-bold text-2xl mb-2">Order Details</h1>

      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/Dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Order #{orderDetails.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <hr className="my-4 border-gray-300" />

      {/* Order Title Section - Order ID & Status */}
      <div className="flex items-center space-x-3 p-0">
        <h2 className="font-semibold text-lg">Orders ID: #{orderDetails.id}</h2>
        <Badge className={`px-3 py-1 rounded-lg ${statusColors[orderDetails.status]}`}>
          {orderDetails.status}
        </Badge>
      </div>

      {/* Order Information Components - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Customer Info */}
        <div className=" p-6 rounded-lg ">
          <div className="flex items-center mb-2">
            <Image src="/images/Customer.svg" alt="Customer Icon" width={24} height={24} className="mr-2" />
            <h3 className="text-lg font-semibold">Customer</h3>
          </div>
          <CustomerInfo customer={{ name: orderDetails.customer, email: orderDetails.email, phone: orderDetails.phone }} />
        </div>

        {/* Order Info */}
        <div className="p-6 rounded-lg ">
          <div className="flex items-center mb-2">
            <Image src="/images/order.svg" alt="Order Icon" width={24} height={24} className="mr-2" />
            <h3 className="text-lg font-semibold">Order Info</h3>
          </div>
          <OrderInfo order={{ shipping: "Next express", paymentMethod: "Credit Card", status: orderDetails.status }} />
        </div>

        {/* Delivery Info */}
        <div className=" p-6 rounded-lg ">
          <div className="flex items-center mb-2">
            <Image src="/images/order.svg" alt="Delivery Icon" width={24} height={24} className="mr-2" />
            <h3 className="text-lg font-semibold">Deliver To</h3>
          </div>
          <DeliveryInfo delivery={{ address: orderDetails.address }} />
        </div>
      </div>

      {/* Second Row - Payment & Note Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Payment Info */}
        <div className=" p-6 rounded-lg">
          <div className="flex items-center mb-2">
            <Image src="/images/order.svg" alt="Payment Icon" width={24} height={24} className="mr-2" />
            <h3 className="text-lg font-semibold">Payment Info</h3>
          </div>
          <PaymentInfo payment={{ method: "MasterCard", businessName: orderDetails.customer, phone: orderDetails.phone }} />
        </div>

        {/* Notes Section */}
        <div className=" p-6 rounded-lg ">
          <h3 className="text-lg font-semibold mb-2">Note</h3>
          <textarea className="w-full h-20 p-2 border border-gray-300 rounded-md" placeholder="Type some notes"></textarea>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="font-semibold text-lg">Products</h2>
        <table className="w-full border-collapse mt-2">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="text-left p-3">PRODUCT ID</th>
              <th className="text-left p-3">NAME</th>
              <th className="text-left p-3">QUANTITY</th>
              <th className="text-left p-3">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.products.map((product: Product) => (
              <tr key={product.id} className="border-b">
                <td className="p-3 font-medium">#{product.id}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">{product.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderInfoPage;

