'use client';
import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

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
          tooltip={{ trigger: 'item' }} // Enhanced tooltip on hover
          grid={{ vertical: true, horizontal: true }} // Added grid for better readability
          width={320} // Adjusted width to shift left slightly
          height={130} // Slightly increased height for better visualization
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
          tooltip={{ trigger: 'item' }} // Enhanced tooltip on hover
          grid={{ vertical: true, horizontal: true }} // Added grid for better readability
          width={320} // Adjusted width to shift left slightly
          height={130} // Slightly increased height for better visualization
        />
      </div>

    </div>
  );
};

export default AnalyticsGraphs;
