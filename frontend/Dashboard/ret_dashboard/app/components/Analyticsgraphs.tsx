'use client';
import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

const AnalyticsGraphs = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-6"> {/* Adjusted padding to move charts slightly left */}

      {/* Average Revenue Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md relative">
        <p className="text-gray-500 font-semibold">Average Revenue</p>
        <h1 className="text-2xl font-bold">LKR 25,565</h1>
        <p className="text-green-600 text-sm font-semibold mt-1">🟢 20% LKR 20,452</p>
        <LineChart
          xAxis={[{ scaleType: 'point', data: ['M', 'T', 'W', 'T', 'F', 'S', 'S'] }]}
          series={[
            {
              data: [15, 18, 12, 20, 22, 25, 18],
              color: 'green',
              area: true,
              showMark: true, // Enable data point markers
              curve: 'catmullRom', // Smooth curve effect
            },
          ]}
          tooltip={{ trigger: 'item' }}
          grid={{ vertical: true, horizontal: true }}
          width={320}
          height={130}
        />
      </div>

      {/* Customer Return Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md relative">
        <p className="text-gray-500 font-semibold">Customer Return</p>
        <h1 className="text-2xl font-bold">7,956</h1>
        <p className="text-red-600 text-sm font-semibold mt-1">🔴 15% 6,759</p>
        <LineChart
          xAxis={[{ scaleType: 'point', data: ['M', 'T', 'W', 'T', 'F', 'S', 'S'] }]}
          series={[
            {
              data: [5, 7, 6, 8, 9, 7, 6],
              color: 'red',
              area: true,
              showMark: true, // Enable data point markers
              curve: 'catmullRom', // Smooth curve effect
            },
          ]}
          tooltip={{ trigger: 'item' }}
          grid={{ vertical: true, horizontal: true }}
          width={320}
          height={130}
        />
      </div>

      {/* Revenue vs Order Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md col-span-2"> {/* Full-width */}
        <p className="text-gray-500 font-semibold">Revenue vs Order</p>
        <LineChart
          xAxis={[{ scaleType: 'point', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }]}
          series={[
            {
              data: [200, 100, 400, 700, 900, 800, 600, 500, 300, 700, 1000, 900],
              color: 'blue',
              label: 'Revenue',
              showMark: true,
              curve: 'catmullRom',
            },
            {
              data: [100, 200, 300, 500, 700, 900, 800, 600, 400, 500, 600, 700],
              color: 'red',
              label: 'Order',
              showMark: true,
              curve: 'catmullRom',
            },
          ]}
          tooltip={{ trigger: 'item' }} // Interactive tooltip
          grid={{ vertical: true, horizontal: true }} // Grid for readability
          width={1000} // Wider chart
          height={200}
          legend={{ position: { horizontal: 'right', vertical: 'top' } }} // Positioned legend at top-right
        />
      </div>

      {/* Sales by Category Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md col-span-1 flex flex-col items-center">
        <p className="text-grey-200 font-bold item-center justify-center">Sales by Category</p>

        {/* Pie Chart with Inner Text */}
        <div className="relative">
          <PieChart
            series={[
              {
                data: [
                  { id: 1, value: 78, label: 'Women', color: '#6FCF97' }, // Green
                  { id: 2, value: 22, label: 'Men', color: '#C5B3FF' }, // Light Purple
                ],
                innerRadius: 60, // Creates donut effect
                outerRadius: 100,
                paddingAngle: 1,

              },
            ]}
            tooltip={{ trigger: 'item' }}
            width={300}
            height={250}
            slotProps={{

              legend: { hidden: true },
            }}
          />

          {/* Center White Circle */}
          <div className="absolute inset-0 flex items-center justify-center right-20">
            <div className="bg-white w-50 h-0 rounded-full flex items-center justify-center item-center shadow-md">
              <p className="text-sm font-semibold text-gray-800 text-center">Total Sales</p>
            </div>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="flex mt-4 space-x-4">
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-[#6FCF97] rounded-full"></span>
            <p className="text-gray-700">Women</p>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-[#C5B3FF] rounded-full"></span>
            <p className="text-gray-700">Men</p>
          </div>
        </div>
      </div>




    </div>
  );
};

export default AnalyticsGraphs;
