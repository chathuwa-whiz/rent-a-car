import React from 'react';
import { TbDownload, TbCar, TbUsers, TbCreditCard, TbCalendarEvent } from 'react-icons/tb';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { useGetVehiclesQuery } from '../../redux/services/vehicleSlice';
import { useGetUsersQuery } from '../../redux/services/userSlice';
import { useGetBookingsQuery } from '../../redux/services/bookingSlice';

export default function Dashboard() {
  // Fetch data from Redux RTK Query endpoints
  const { data: vehicles, isLoading: isVehiclesLoading } = useGetVehiclesQuery();
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery();
  const { data: bookings, isLoading: isBookingsLoading } = useGetBookingsQuery();

  // Show a loading state if any query is still loading
  if (isVehiclesLoading || isUsersLoading || isBookingsLoading) {
    return <div>Loading...</div>;
  }

  // Calculate stats based on fetched data
  const totalVehicles = vehicles?.length || 0;
  const activeCustomers = users ? users.filter(user => user.role === 'user').length : 0;
  const revenue = bookings ? bookings.reduce((acc, booking) => acc + booking.total, 0) : 0;
  const pendingBookings = bookings ? bookings.filter(booking => booking.status === 'Pending').length : 0;

  // Group bookings by weekday to compute weekly revenue
  const revenueByDay = {};
  bookings?.forEach(booking => {
    const day = new Date(booking.createdAt).toLocaleString('en-US', { weekday: 'short' });
    revenueByDay[day] = (revenueByDay[day] || 0) + booking.total;
  });
  const weeklyRevenueData = Object.entries(revenueByDay).map(([day, total]) => ({
    name: day,
    revenue: total,
  }));

  // Build recent activities using the 4 most recent bookings
  const recentActivities = bookings
    ? bookings.slice(-4).reverse().map(booking => ({
        id: booking._id,
        type: 'booking',
        title: `Booking confirmed for vehicle ${booking.vehicle?.model || ''}`,
        time: new Date(booking.createdAt).toLocaleTimeString(),
        icon: <TbCalendarEvent size={20} className="text-blue" />,
      }))
    : [];

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-graydark shadow-lg rounded-md">
          <p className="font-medium">{`$${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <button className="bg-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <TbDownload size={18} />
          Download Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Vehicles */}
        <div className="bg-white rounded-lg shadow-lg p-6 relative">
          <div className="flex flex-col">
            <span className="text-graydark font-medium">Total Vehicles</span>
            <span className="text-3xl font-bold mt-2">{totalVehicles}</span>
        
          </div>
          <div className="absolute top-6 right-6 bg-[#cadbf3] p-2 rounded-full">
            <TbCar size={20} className="text-blue" />
          </div>
        </div>

        {/* Active Customers */}
        <div className="bg-white rounded-lg shadow-lg p-6 relative">
          <div className="flex flex-col">
            <span className="text-graydark font-medium">Active Customers</span>
            <span className="text-3xl font-bold mt-2">{activeCustomers}</span>
          
          </div>
          <div className="absolute top-6 right-6 bg-[#cadbf3] p-2 rounded-full">
            <TbUsers size={20} className="text-blue" />
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-lg shadow-lg p-6 relative">
          <div className="flex flex-col">
            <span className="text-graydark font-medium">Revenue</span>
            <span className="text-3xl font-bold mt-2">{`$${revenue.toLocaleString()}`}</span>
          
          </div>
          <div className="absolute top-6 right-6 bg-[#cadbf3] p-2 rounded-full">
            <TbCreditCard size={20} className="text-blue" />
          </div>
        </div>

        {/* Pending Booking */}
        <div className="bg-white rounded-lg shadow-lg p-6 relative">
          <div className="flex flex-col">
            <span className="text-graydark font-medium">Pending Booking</span>
            <span className="text-3xl font-bold mt-2">{pendingBookings}</span>
            
          </div>
          <div className="absolute top-6 right-6 bg-[#cadbf3] p-2 rounded-full">
            <TbCalendarEvent size={20} className="text-blue" />
          </div>
        </div>
      </div>

      {/* Charts and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-6">Weekly Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyRevenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickFormatter={(value) => `${value}`}
                  domain={[0, 'dataMax + 1000']}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(30, 136, 229, 0.1)' }} />
                <Bar dataKey="revenue" fill="#1E88E5" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-6">Recent Activities</h3>
          <div className="space-y-6">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="bg-[#cadbf3] p-2 rounded-full">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-graydark">{activity.title}</p>
                  <p className="text-sm text-graydark">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
