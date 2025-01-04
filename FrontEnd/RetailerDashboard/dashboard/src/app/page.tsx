import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        

      {/* Dashboard Content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800">Out of Stock</h3>
                <p className="mt-2 text-3xl font-bold text-red-600">24</p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800">New Orders</h3>
                <p className="mt-2 text-3xl font-bold text-green-500">89</p>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-800">Inventory Details</h3>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white shadow rounded-lg">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Casual Shirt</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Shirts</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">50</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$25</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Denim Jeans</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Jeans</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">80</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$40</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Leather Jacket</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Jackets</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">20</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$120</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
