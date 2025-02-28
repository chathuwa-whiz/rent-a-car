import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download} from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 38000 },
  { month: 'Mar', revenue: 45000 },
  { month: 'Apr', revenue: 48000 },
  { month: 'May', revenue: 52000 },
  { month: 'Jun', revenue: 58000 }
];

const bookingsData = [
  { month: 'Jan', bookings: 124 },
  { month: 'Feb', bookings: 98 },
  { month: 'Mar', bookings: 132 },
  { month: 'Apr', bookings: 145 },
  { month: 'May', bookings: 162 },
  { month: 'Jun', bookings: 178 }
];

const Reports = () => {
  const [dateRange, setDateRange] = useState('6months');

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-4 lg:items-centerr">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <select
            className="bg-white border border-graylight text-graydark px-2 py-2 rounded-lg hover:bg-gray-50"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-[#0024b5] flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-md md:text-lg font-semibold mb-4">Revenue Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Booking Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#3B82F6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-20">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">$283,000</p>
          <p className="text-sm text-green mt-2">+12.5% from last period</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium">Total Bookings</h3>
          <p className="text-2xl font-bold mt-2">839</p>
          <p className="text-sm text-lightred mt-2">+8.2% from last period</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Popular Vehicles</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-graylight">
            <thead className="bg-[#f3f3f3]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Total Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Utilization Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-graylight">
              {[
                { vehicle: 'BMW X5', bookings: 145, revenue: 58000, utilization: 85 },
                { vehicle: 'Mercedes E-Class', bookings: 132, revenue: 52800, utilization: 82 },
                { vehicle: 'Toyota Camry', bookings: 128, revenue: 38400, utilization: 78 },
              ].map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-graydark">
                    {item.vehicle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-graydark">
                    {item.bookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-graydark">
                    ${item.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-graydark">
                    {item.utilization}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
