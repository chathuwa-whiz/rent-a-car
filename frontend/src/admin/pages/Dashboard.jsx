import React from 'react';
import { TbDownload, TbCar, TbUsers, TbCreditCard, TbCalendarEvent } from 'react-icons/tb';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {

    // Weekly revenue data for the chart
    const weeklyRevenueData = [
        { name: 'Mon', revenue: 4000 },
        { name: 'Tue', revenue: 3000 },
        { name: 'Wed', revenue: 5000 },
        { name: 'Thu', revenue: 2600 },
        { name: 'Fri', revenue: 4800 },
        { name: 'Sat', revenue: 6300 },
        { name: 'Sun', revenue: 3400 }
    ];

    // Recent activities data
    const recentActivities = [
        {
            id: 1,
            type: 'vehicle',
            title: 'New vehicle added: BMW X5 2024',
            time: '2 hours',
            icon: <TbCar size={20} className="text-blue" />
        },
        {
            id: 2,
            type: 'customer',
            title: 'New customer registration: john doe',
            time: '3 hours',
            icon: <TbUsers size={20} className="text-blue" />
        },
        {
            id: 3,
            type: 'payment',
            title: 'Payment received: $580',
            time: '5 hours',
            icon: <TbCreditCard size={20} className="text-blue" />
        },
        {
            id: 4,
            type: 'booking',
            title: 'Booking confirmed: BMW m3 2021',
            time: '8 hours',
            icon: <TbCalendarEvent size={20} className="text-blue" />
        }
    ];

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                <button className="hover:bg-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
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
                        <span className="text-3xl font-bold mt-2">124</span>
                        <span className="text-green text-sm mt-1">+12% from last month</span>
                    </div>
                    <div className="absolute top-6 right-6 bg-blue-100 p-2 rounded-full">
                        <TbCar size={20} className="text-blue" />
                    </div>
                </div>

                {/* Active Customers */}
                <div className="bg-white rounded-lg shadow-lg p-6 relative">
                    <div className="flex flex-col">
                        <span className="text-graydark font-medium">Active Customers</span>
                        <span className="text-3xl font-bold mt-2">1,893</span>
                        <span className="text-green text-sm mt-1">+12% from last month</span>
                    </div>
                    <div className="absolute top-6 right-6 bg-blue-100 p-2 rounded-full">
                        <TbUsers size={20} className="text-blue" />
                    </div>
                </div>

                {/* Revenue */}
                <div className="bg-white rounded-lg shadow-lg p-6 relative">
                    <div className="flex flex-col">
                        <span className="text-graydark font-medium">Revenue</span>
                        <span className="text-3xl font-bold mt-2">Rs.48,294</span>
                        <span className="text-green text-sm mt-1">+12% from last month</span>
                    </div>
                    <div className="absolute top-6 right-6 bg-blue-100 p-2 rounded-full">
                        <TbCreditCard size={20} className="text-blue" />
                    </div>
                </div>

                {/* Pending Booking */}
                <div className="bg-white rounded-lg shadow-lg p-6 relative">
                    <div className="flex flex-col">
                        <span className="text-graydark font-medium">Pending Booking</span>
                        <span className="text-3xl font-bold mt-2">124</span>
                        <span className="text-darkred text-sm mt-1">-5% from last month</span>
                    </div>
                    <div className="absolute top-6 right-6 bg-blue-100 p-2 rounded-full">
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
                            <BarChart
                                data={weeklyRevenueData}
                                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                            >
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
                                <Bar
                                    dataKey="revenue"
                                    fill="#1E88E5"
                                    radius={[4, 4, 0, 0]}
                                    barSize={30}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-6">Recent Activities</h3>
                    <div className="space-y-6">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4">
                                <div className="bg-blue-100 p-2 rounded-full">
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
};