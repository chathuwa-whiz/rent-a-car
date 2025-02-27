import React, { useState, useEffect } from 'react'
import { TbPlus, TbSearch, TbFilter, TbCalendarEvent } from 'react-icons/tb';
import Calendar from '../components/Calendar';

export default function Booking() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [bookingDates, setBookingDates] = useState([]);

    // Sample booking data
    const bookingsData = [
        {
            id: 1,
            customer: {
                name: 'John Doe',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
            },
            vehicle: {
                name: 'BMW X5',
                image: '/car-model.png'
            },
            dates: {
                from: '2024-03-15',
                to: '2024-03-20'
            },
            status: 'Active',
            returnStatus: 'Pending',
            total: '$750'
        },
        {
            id: 2,
            customer: {
                name: 'Jane Smith',
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
            },
            vehicle: {
                name: 'Mercedes E-Class',
                image: '/car-model.png'
            },
            dates: {
                from: '2024-03-18',
                to: '2024-03-25'
            },
            status: 'Pending',
            returnStatus: 'Completed',
            total: '$1400'
        },
        {
            id: 3,
            customer: {
                name: 'Robert Johnson',
                avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
            },
            vehicle: {
                name: 'Audi Q7',
                image: '/car-model.png'
            },
            dates: {
                from: '2024-03-22',
                to: '2024-03-29'
            },
            status: 'Completed',
            returnStatus: 'Completed',
            total: '$1200'
        }
    ];

    // Extract all booking dates for the calendar
    useEffect(() => {
        const allDates = [];

        bookingsData.forEach(booking => {
            const fromDate = new Date(booking.dates.from);
            const toDate = new Date(booking.dates.to);

            // Add all dates between from and to (inclusive)
            const currentDate = new Date(fromDate);
            while (currentDate <= toDate) {
                allDates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });

        setBookingDates(allDates);
    }, []);

    // Filter bookings based on search query and status filter
    const filteredBookings = bookingsData.filter(booking => {
        const matchesSearch =
            booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === 'All Status' ||
            booking.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Get status badge color
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-gasolinlight text-green';
            case 'Pending':
                return 'bg-yellowlight bg-opacity-30 text-yellowdark';
            case 'Completed':
                return 'bg-gasolinlight bg-opacity-30 text-gasolindark';
            case 'Cancelled':
                return 'bg-lightred bg-opacity-30 text-darkred';
            default:
                return 'bg-graylight bg-opacity-30 text-graydark';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-bold">Booking Management</h1>
                <button
                    className="bg-blue hover:bg-opacity-90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    <TbCalendarEvent size={18} />
                    View Calendar
                </button>
            </div>

            {/* Calendar View */}
            {showCalendar && (
                <Calendar
                    bookingDates={bookingDates}
                    onClose={() => setShowCalendar(false)}
                />
            )}

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <TbSearch className="text-graydark" size={20} />
                    </div>
                    <input
                        type="text"
                        className="w-full py-2 pl-10 pr-4 text-textPrimary bg-white border border-graylight rounded-lg focus:outline-none focus:ring-1 focus:ring-blue focus:border-blue"
                        placeholder="Search bookings..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-graylight rounded-lg text-graydark"
                        onClick={() => {
                            const nextStatus = statusFilter === 'All Status' ? 'Active' :
                                statusFilter === 'Active' ? 'Pending' :
                                    statusFilter === 'Pending' ? 'Completed' :
                                        statusFilter === 'Completed' ? 'Cancelled' : 'All Status';
                            setStatusFilter(nextStatus);
                        }}
                    >
                        <TbFilter size={20} />
                        {statusFilter}
                    </button>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                <table className="min-w-full">
                    <thead className="bg-gray-50 text-left">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">
                                Customer & Vehicle
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">
                                Dates
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-graylight">
                        {filteredBookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={booking.customer.avatar}
                                            alt={booking.customer.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-medium">{booking.customer.name}</p>
                                            <div className="flex items-center gap-2 text-sm text-graydark">
                                                <img
                                                    src={booking.vehicle.image}
                                                    alt={booking.vehicle.name}
                                                    className="w-5 h-5 object-cover"
                                                />
                                                {booking.vehicle.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        {new Date(booking.dates.from).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                        <p className="text-sm text-graydark">to</p>
                                        {new Date(booking.dates.to).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {booking.total}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        {booking.returnStatus === 'Pending' && (
                                            <button className="text-blue hover:text-opacity-80 font-medium">
                                                Return
                                            </button>
                                        )}
                                        {booking.status === 'Pending' && (
                                            <>
                                                <button className="text-green hover:text-opacity-80 font-medium">
                                                    Approve
                                                </button>
                                                <button className="text-darkred hover:text-opacity-80 font-medium">
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
