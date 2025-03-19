import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const payments = [
  {
    id: 1,
    customer: 'John Doe',
    amount: 580,
    date: '2024-03-15',
    method: 'Credit Card',
    status: 'completed',
    type: 'incoming',
    description: 'Booking #1234 - BMW X5'
  },
  {
    id: 2,
    customer: 'Jane Smith',
    amount: 750,
    date: '2024-03-14',
    method: 'PayPal',
    status: 'completed',
    type: 'incoming',
    description: 'Booking #1235 - Mercedes E-Class'
  },
  {
    id: 3,
    customer: 'Alice Johnson',
    amount: 300,
    date: '2024-03-13',
    method: 'Credit Card',
    status: 'failed',
    type: 'incoming',
    description: 'Booking #1236 - Audi A4'
  }
];

const statusColors = {
  completed: 'bg-[#bafff0] text-gasolinlight',
  failed: 'bg-[#f2dddd] text-darkred'
};

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter payments based on search term and status
  const filteredPayments = payments.filter((payment) => {
    const matchesSearchTerm =
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || payment.status === filterStatus;

    return matchesSearchTerm && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      <h1 className="text-2xl font-bold">Payment Management</h1>
        
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-graydark">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">$48,294</h3>
              <p className="text-sm text-green mt-2">+12% from last month</p>
            </div>
            <div className="bg-[#bafff0] text-gasolindark p-3 rounded-full">
              <ArrowUpRight className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-graydark">Failed Payments</p>
              <h3 className="text-2xl font-bold mt-1">$1,240</h3>
              <p className="text-sm text-lightred mt-2">3 payments failed</p>
            </div>
            <div className="bg-[#f2dddd] text-darkred p-3 rounded-full">
              <ArrowDownRight className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search payments..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-graylight" />
        </div>
        <div className="relative">
          <select
            className="appearance-none bg-white pl-10 pr-8 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
          <Filter className="absolute left-3 top-2.5 h-5 w-5 text-graylight" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-graylight">
            <thead className="bg-[#f3f3f3]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-graydark uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-graydark uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-graydark uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-graydark uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-graydark uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-graylight">
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-black">{payment.customer}</div>
                      <div className="text-sm text-graydark">{payment.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-black">${payment.amount}</div>
                    <div className="text-sm text-graydark">{payment.method}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-graydark">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[payment.status]}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue mr-3 cursor-pointer">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
