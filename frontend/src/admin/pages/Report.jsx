import React from 'react';
import { TbDownload, TbChevronDown } from 'react-icons/tb';

// Custom bar chart component
const BarChart = ({ data, labels, maxY }) => {
  const highestValue = Math.max(...data);
  const yLabels = [];
  for (let i = 0; i <= 4; i++) {
    yLabels.push(Math.round((maxY / 4) * i));
  }
  
  return (
    <div className="h-full relative">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between">
        {yLabels.reverse().map((label, i) => (
          <div key={i} className="text-xs text-graydark">{label}</div>
        ))}
      </div>
      
      {/* Grid lines */}
      <div className="absolute left-12 right-0 top-0 bottom-10">
        {yLabels.map((_, i) => (
          <div key={i} className="border-t border-graylight border-dashed h-1/4"></div>
        ))}
      </div>
      
      {/* Bars */}
      <div className="absolute left-12 right-0 bottom-10 flex justify-between items-end h-5/6">
        {data.map((value, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            <div 
              className="w-4/5 bg-blue rounded-t"
              style={{ height: `${(value / maxY) * 100}%` }}
            ></div>
          </div>
        ))}
      </div>
      
      {/* X-axis labels */}
      <div className="absolute left-12 right-0 bottom-0 flex justify-between">
        {labels.map((label, i) => (
          <div key={i} className="text-xs text-center w-full text-graydark">{label}</div>
        ))}
      </div>
    </div>
  );
};

// Custom line chart component
const LineChart = ({ data, labels, maxY }) => {
  const points = data.map((value, index) => ({
    x: index * (100 / (data.length - 1)),
    y: 100 - (value / maxY * 100)
  }));
  
  const pathData = points.map((point, i) => 
    (i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`)
  ).join(' ');
  
  const yLabels = [];
  for (let i = 0; i <= 4; i++) {
    yLabels.push(Math.round((maxY / 4) * i));
  }
  
  return (
    <div className="h-full relative">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between">
        {yLabels.reverse().map((label, i) => (
          <div key={i} className="text-xs text-graydark">{label}</div>
        ))}
      </div>
      
      {/* Grid lines */}
      <div className="absolute left-12 right-0 top-0 bottom-10">
        {yLabels.map((_, i) => (
          <div key={i} className="border-t border-graylight border-dashed h-1/4"></div>
        ))}
      </div>
      
      {/* SVG for line chart */}
      <div className="absolute left-12 right-0 bottom-10 h-5/6">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d={pathData} 
            fill="none" 
            stroke="#0043FF" 
            strokeWidth="1.5"
          />
          {points.map((point, i) => (
            <circle 
              key={i}
              cx={point.x} 
              cy={point.y} 
              r="2" 
              fill="white" 
              stroke="#0043FF" 
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>
      
      {/* X-axis labels */}
      <div className="absolute left-12 right-0 bottom-0 flex justify-between">
        {labels.map((label, i) => (
          <div key={i} className="text-xs text-center w-full text-graydark">{label}</div>
        ))}
      </div>
    </div>
  );
};

export default function Report() {
  const revenueData = [42000, 38000, 45000, 48000, 53000, 59000];
  const bookingData = [120, 95, 135, 150, 165, 180];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="border border-graylight rounded-lg px-4 py-2 bg-white flex items-center justify-between cursor-pointer">
            <span className="text-graydark">Last 7 Days</span>
            <TbChevronDown className="text-graydark ml-2" size={18} />
          </div>
          <button className="bg-blue hover:bg-[#0024b5] text-white rounded-lg px-4 py-2 flex items-center justify-center">
            <TbDownload size={18} className="mr-2" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-6">Revenue Overview</h2>
          <div className="h-64">
            <BarChart 
              data={revenueData} 
              labels={months} 
              maxY={60000} 
            />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-6">Booking Trends</h2>
          <div className="h-64">
            <LineChart 
              data={bookingData} 
              labels={months} 
              maxY={180} 
            />
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-graydark font-medium mb-2">Total Revenue</h3>
          <div className="text-3xl font-bold mb-2">Rs.283,000</div>
          <div className="text-green">+12.5% from last period</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-graydark font-medium mb-2">Total Bookings</h3>
          <div className="text-3xl font-bold mb-2">200</div>
          <div className="text-green">+8.2% from last period</div>
        </div>
      </div>
      
      {/* Popular Vehicles Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-6">Popular Vehicles</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">Total Bookings</th>
                <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graylight">
              <tr>
                <td className="px-6 py-4">BMW X5</td>
                <td className="px-6 py-4">20</td>
                <td className="px-6 py-4">Rs.200,000</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Mercedes E-Class</td>
                <td className="px-6 py-4">21</td>
                <td className="px-6 py-4">Rs.240,000</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Toyota Camry</td>
                <td className="px-6 py-4">22</td>
                <td className="px-6 py-4">Rs.250,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}