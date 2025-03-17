// "use client";

// import Link from "next/link";
// import React, { useState, useEffect } from "react";

// interface Order {
//   id: number;
//   customer: string;
//   total: string;
//   profit: string;
//   status: string;
// }

// interface OrderListProps {
//   orders: Order[];
// }

// // Define status options and colors
// const statuses = ["All", "Pending", "Confirmed", "Processing", "Picked", "Shipped", "Delivered", "Canceled"];
// const statusColors: { [key: string]: string } = {
//   Pending: "bg-yellow-100 text-yellow-400",
//   Confirmed: "bg-green-100 text-green-400",
//   Processing: "bg-blue-100 text-blue-400",
//   Picked: "bg-purple-100 text-purple-400",
//   Shipped: "bg-pink-100 text-pink-400",
//   Delivered: "bg-green-400 text-white",
//   Canceled: "bg-red-100 text-red-400",
// };

// const OrderList: React.FC<OrderListProps> = ({ orders }) => {
//   const [selectedStatus, setSelectedStatus] = useState<string>("All");
//   const [orderData, setOrderData] = useState<Order[]>([]);

//   // Load order data from localStorage or use default orders
//   useEffect(() => {
//     const savedOrders = localStorage.getItem("orderData");
//     if (savedOrders) {
//       // setOrderData(JSON.parse(savedOrders));
//       const parsedOrders: Order[] = JSON.parse(savedOrders);


//       const uniqueOrders = Array.from(new Map(parsedOrders.map(order => [order.id, order])).values());

//       setOrderData(uniqueOrders);
//     } else {
//       setOrderData(orders);
//     }
//   }, [orders]);

//   // Save updated orders to localStorage
//   const saveOrdersToLocalStorage = (updatedOrders: Order[]) => {
//     localStorage.setItem("orderData", JSON.stringify(updatedOrders));
//   };

//   // Handle order status update and persist it in localStorage
//   const handleStatusChange = (id: number, newStatus: string) => {
//     const updatedOrders = orderData.map(order =>
//       order.id === id ? { ...order, status: newStatus } : order
//     );
//     setOrderData(updatedOrders);
//     saveOrdersToLocalStorage(updatedOrders);
//   };

//   // Filter orders based on selected status
//   const filteredOrders = selectedStatus === "All" ? orderData : orderData.filter(order => order.status === selectedStatus);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mt-4">
//       {/* Status Filter Tabs */}
//       <div className="flex space-x-4 border-b pb-2 text-gray-500">
//         {statuses.map(status => (
//           <button
//             key={status}
//             onClick={() => setSelectedStatus(status)}
//             className={`px-4 py-2 font-medium ${selectedStatus === status ? "text-red-500 border-b-2 border-red-500" : "hover:text-red-400"
//               }`}
//           >
//             {status}
//           </button>
//         ))}
//       </div>

//       {/* Orders Table */}
//       <div className="overflow-x-auto mt-4">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700">
//               <th className="text-left p-3">ORDER ID</th>
//               <th className="text-left p-3">CUSTOMER</th>
//               <th className="text-left p-3">TOTAL</th>
//               {selectedStatus === "All" && <th className="text-left p-3">STATUS</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map(order => (
//               // <tr key={order.id} className="border-b">
//               <tr key={`${order.id}-${index}`} className="border-b">
//                 {/* Link ORDER ID to specific OrderInfo Page */}
//                 < td className="p-3 font-medium" >
//                   <Link href={`/OrderInfo/${order.id}`} className="text-blue-600 hover:underline">
//                     #{order.id}
//                   </Link>
//                 </>
//                 <td className="p-3">{order.customer}</td>
//                 <td className="p-3">{order.total}</td>

//                 {/* Show Status Dropdown only in "All" section */}
//                 {selectedStatus === "All" && (
//                   <td className="p-3">
//                     <select
//                       value={order.status}
//                       onChange={e => handleStatusChange(order.id, e.target.value)}
//                       className={`p-2 rounded-md font-medium ${statusColors[order.status]} border-none`}
//                     >
//                       {Object.keys(statusColors).map(status => (
//                         <option key={status} value={status}>
//                           {status}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div >

//       {/* No Orders Found Message */}
//       {
//         filteredOrders.length === 0 && (
//           <p className="text-gray-500 text-center mt-4">No orders found for {selectedStatus}.</p>
//         )
//       }
//     </div >
//   );
// };

// export default OrderList;

"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Order {
  id: number;
  customer: string;
  total: string;
  profit: string;
  status: string;
}

interface OrderListProps {
  orders: Order[];
}

// Define status options and colors
const statuses = ["All", "Pending", "Confirmed", "Processing", "Picked", "Shipped", "Delivered", "Canceled"];
const statusColors: { [key: string]: string } = {
  Pending: "bg-yellow-100 text-yellow-400",
  Confirmed: "bg-green-100 text-green-400",
  Processing: "bg-blue-100 text-blue-400",
  Picked: "bg-purple-100 text-purple-400",
  Shipped: "bg-pink-100 text-pink-400",
  Delivered: "bg-green-400 text-white",
  Canceled: "bg-red-100 text-red-400",
};

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [orderData, setOrderData] = useState<Order[]>([]);


  useEffect(() => {
    const savedOrders = localStorage.getItem("orderData");
    if (savedOrders) {
      const parsedOrders: Order[] = JSON.parse(savedOrders);


      const uniqueOrders = Array.from(new Map(parsedOrders.map(order => [order.id, order])).values());

      setOrderData(uniqueOrders);
    } else {
      setOrderData(orders);
    }
  }, [orders]);

  // Save updated orders to localStorage
  const saveOrdersToLocalStorage = (updatedOrders: Order[]) => {
    localStorage.setItem("orderData", JSON.stringify(updatedOrders));
  };

  // Handle order status update and persist it in localStorage
  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedOrders = orderData.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrderData(updatedOrders);
    saveOrdersToLocalStorage(updatedOrders);
  };

  // Filter orders based on selected status
  const filteredOrders = selectedStatus === "All" ? orderData : orderData.filter(order => order.status === selectedStatus);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      {/* Status Filter Tabs */}
      <div className="flex space-x-4 border-b pb-2 text-gray-500">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 font-medium ${selectedStatus === status ? "text-red-500 border-b-2 border-red-500" : "hover:text-red-400"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="text-left p-3">ORDER ID</th>
              <th className="text-left p-3">CUSTOMER</th>
              <th className="text-left p-3">TOTAL</th>
              {selectedStatus === "All" && <th className="text-left p-3">STATUS</th>}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={`${order.id}-${index}`} className="border-b">
                {/* Link ORDER ID to specific OrderInfo Page */}
                <td className="p-3 font-medium">
                  <Link href={`/OrderInfo/${order.id}`} className="text-blue-600 hover:underline">
                    #{order.id}
                  </Link>
                </td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.total}</td>

                {/* Show Status Dropdown only in "All" section */}
                {selectedStatus === "All" && (
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      className={`p-2 rounded-md font-medium ${statusColors[order.status]} border-none`}
                    >
                      {Object.keys(statusColors).map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Orders Found Message */}
      {filteredOrders.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No orders found for {selectedStatus}.</p>
      )}
    </div>
  );
};

export default OrderList;

