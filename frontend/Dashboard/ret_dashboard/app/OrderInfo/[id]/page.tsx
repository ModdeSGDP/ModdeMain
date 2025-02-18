"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import CustomerInfo from "../../components/orderinfocomponents/CustomerInfo";
import OrderInfo from "../../components/orderinfocomponents/OrderInfo";
import DeliveryInfo from "../../components/orderinfocomponents/DeliveryInfo";
import PaymentInfo from "../../components/orderinfocomponents/PaymentInfo";
import { Badge } from "@/components/ui/badge";
import { orders as ordersConst } from "../../data/orders";

interface Product {
  id: number;
  name: string;
  quantity: number;
  total: string;
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

  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (!orderId) return;

    // const orders = [
    //   {
    //     id: "25426", customer: "Komal", total: "LKR 4500.00", status: "Pending", phone: "+94 774 231 121", address: "No 123, Duplication Rd, Colombo, Sri Lanka",
    //     products: [{ id: 101, name: "T-Shirt", quantity: 2, total: "LKR 2000" }, { id: 102, name: "Jeans", quantity: 1, total: "LKR 2500" }]
    //   },
    //   {
    //     id: "25426", customer: "Komal", total: "LKR 4500.00", status: "Delivered", phone: "+94 774 231 121", address: "No 123, Duplication Rd, Colombo, Sri Lanka",
    //     products: [{ id: 101, name: "T-Shirt", quantity: 2, total: "LKR 2000" }, { id: 102, name: "Jeans", quantity: 1, total: "LKR 2500" }]
    //   },
    //   {
    //     id: "25425", customer: "Nikhil", total: "LKR 4500.00", status: "Canceled", phone: "+94 774 232 222", address: "No 45, Main St, Kandy, Sri Lanka",
    //     products: [{ id: 103, name: "Hoodie", quantity: 1, total: "LKR 4500" }]
    //   },
    //   {
    //     id: "25424", customer: "Nimal", total: "LKR 4500.00", status: "Delivered", phone: "+94 775 123 123", address: "No 78, Galle Rd, Galle, Sri Lanka",
    //     products: [{ id: 104, name: "Sweater", quantity: 2, total: "LKR 3000" }]
    //   },
    //   {
    //     id: "25423", customer: "Kushan", total: "LKR 4500.00", status: "Pending", phone: "+94 776 999 888", address: "No 22, Main St, Negombo, Sri Lanka",
    //     products: [{ id: 105, name: "Shoes", quantity: 1, total: "LKR 4500" }]
    //   },
    //   {
    //     id: "25422", customer: "Kidura", total: "LKR 4500.00", status: "Delivered", phone: "+94 778 456 789", address: "No 5, Lotus Rd, Jaffna, Sri Lanka",
    //     products: [{ id: 106, name: "Watch", quantity: 1, total: "LKR 4500" }]
    //   },
    //   {
    //     id: "25421", customer: "Yougesh", total: "LKR 4500.00", status: "Processing", phone: "+94 779 333 222", address: "No 90, Liberty Plaza, Colombo, Sri Lanka",
    //     products: [{ id: 107, name: "Backpack", quantity: 2, total: "LKR 4500" }]
    //   },
    //   {
    //     id: "25420", customer: "Priyantha", total: "LKR 4500.00", status: "Canceled", phone: "+94 770 987 654", address: "No 34, Market Rd, Kandy, Sri Lanka",
    //     products: [{ id: 108, name: "Sunglasses", quantity: 1, total: "LKR 4500" }]
    //   },
    //   {
    //     id: "25419", customer: "Kishan", total: "LKR 4500.00", status: "Shipped", phone: "+94 771 654 321", address: "No 76, Fort, Colombo, Sri Lanka",
    //     products: [{ id: 109, name: "Hat", quantity: 3, total: "LKR 4500" }]
    //   },
    //   {
    //     id: "25417", customer: "Kumal", total: "LKR 4500.00", status: "Shipped", phone: "+94 771 654 321", address: "No 76, Fort, Colombo, Sri Lanka",
    //     products: [{ id: 109, name: "Hat", quantity: 3, total: "LKR 4500" }]
    //   },
    //   {
    //     id: "25412", customer: "Priyanka", total: "LKR 4500.00", status: "Shipped", phone: "+94 771 654 321", address: "No 76, Fort, Colombo, Sri Lanka",
    //     products: [{ id: 109, name: "Hat", quantity: 3, total: "LKR 4500" }]
    //   },
    //   {
    //     id: "25413", customer: "Nuwan", total: "LKR 4500.00", status: "Shipped", phone: "+94 771 654 321", address: "No 76, Fort, Colombo, Sri Lanka",
    //     products: [{ id: 109, name: "Hat", quantity: 3, total: "LKR 4500" }]
    //   },
    //   {
    //     id: "254", customer: "Dumal", total: "LKR 4500.00", status: "Shipped", phone: "+94 771 654 321", address: "No 76, Fort, Colombo, Sri Lanka",
    //     products: [{ id: 109, name: "Hat", quantity: 3, total: "LKR 4500" }]
    //   }
    // ];
    const orderData = localStorage.getItem("orderData");
    if (!orderData) router.push("/Orders");

    const order = (JSON.parse(orderData as string) as typeof ordersConst).find((order) => order.id === +orderId);
    if (!order) router.push("/Orders");
    else {
      setOrderDetails(order);
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
            <img src="/images/Customer.svg" alt="Customer Icon" className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">Customer</h3>
          </div>
          <CustomerInfo customer={{ name: orderDetails.customer, phone: orderDetails.phone }} />
        </div>

        {/* Order Info */}
        <div className="p-6 rounded-lg ">
          <div className="flex items-center mb-2">
            <img src="/images/order.svg" alt="Order Icon" className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">Order Info</h3>
          </div>
          <OrderInfo order={{ shipping: "Next express", paymentMethod: "Credit Card", status: orderDetails.status }} />
        </div>

        {/* Delivery Info */}
        <div className=" p-6 rounded-lg ">
          <div className="flex items-center mb-2">
            <img src="/images/order.svg" alt="Delivery Icon" className="h-6 w-6 mr-2" />
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
            <img src="/images/order.svg" alt="Payment Icon" className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">Payment Info</h3>
          </div>
          <PaymentInfo payment={{ method: "MasterCard", businessName: orderDetails.customer, phone: orderDetails.phone }} />
        </div>

        {/* Notes Section */}
        <div className=" p-6 rounded-lg ">
          <h3 className="text-lg font-semibold mb-2">Note</h3>
          <textarea
            className="w-full h-20 p-2 border border-gray-300 rounded-md"
            placeholder="Type some notes"
          ></textarea>
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
