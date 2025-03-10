import React, { useState } from 'react';
import { Search, Phone, Mail, MapPin, Star } from 'lucide-react';
import { useGetUsersQuery } from '../../redux/services/userSlice'; // adjust the import path as needed

export default function Customers() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [searchTerm, setSearchTerm] = useState('');

  // Map backend user data to the UI's customer structure.
  // Some fields (like totalBookings, totalSpent, rating, and image) are not in your backend,
  // so we provide default values.
  const mappedCustomers = users
    ? users.map((user) => ({
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        location: user.address,
        totalBookings: 0, // default value
        totalSpent: 0,    // default value
        rating: 0,        // default value
        status: 'active', // default value
        image: user.image || 'https://via.placeholder.com/100', // default image
      }))
    : [];

    console.log("Token in localStorage:", localStorage.getItem("token"));


  // Filter customers based on the search term
  const filteredCustomers = mappedCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching customers</p>;

  return (
    <div className="space-y-6">
      <div className="flex-col lg:flex-row justify-start lg:justify-between gap-4 lg:items-center">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <button className="bg-blue text-white px-4 py-2 mt-4 rounded-lg cursor-pointer hover:bg-[#0024b5]">
          Export Customer Data
        </button>
      </div>

      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search customers..."
          className="w-full text-sm pl-10 pr-4 py-2 rounded-lg border border-graylight focus:outline-none focus:ring-1 focus:ring-blue"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-graylight" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <img src={customer.image} alt="" className="h-16 w-16 rounded-full" />
              <div>
                <h3 className="text-lg font-semibold text-black">{customer.name}</h3>
                <div className="flex items-center text-sm text-graydark">
                  <Star className="h-4 w-4 text-yellowlight mr-1" />
                  {customer.rating} rating
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-graydark">
                <Mail className="h-4 w-4 mr-2" />
                {customer.email}
              </div>
              <div className="flex items-center text-sm text-graydark">
                <Phone className="h-4 w-4 mr-2" />
                {customer.phone}
              </div>
              <div className="flex items-center text-sm text-graydark">
                <MapPin className="h-4 w-4 mr-2" />
                {customer.location}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-graylight">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-black">Total Bookings</p>
                  <p className="text-lg font-semibold">{customer.totalBookings}</p>
                </div>
                <div>
                  <p className="text-sm text-black">Total Spent</p>
                  <p className="text-lg font-semibold">${customer.totalSpent}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
