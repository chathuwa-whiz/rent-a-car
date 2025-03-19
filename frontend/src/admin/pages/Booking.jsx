import React, { useState, useEffect } from "react";
import { TbSearch, TbFilter, TbCalendarEvent } from "react-icons/tb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "../components/Calendar";
import { useGetBookingsQuery, useUpdateBookingMutation } from "../../redux/services/bookingSlice";

export default function Booking() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [bookingDates, setBookingDates] = useState([]);

  const { data: bookingsData, isLoading, isError } = useGetBookingsQuery();
  const [updateBooking] = useUpdateBookingMutation();

  useEffect(() => {
    if (!bookingsData) return;

    const allDates = [];
    bookingsData.forEach((booking) => {
      const fromDate = new Date(booking.dates.from);
      const toDate = new Date(booking.dates.to);

      const currentDate = new Date(fromDate);
      while (currentDate <= toDate) {
        allDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    setBookingDates(allDates);
  }, [bookingsData]);

  const confirmAndUpdateStatus = (id, newStatus) => {
    const statusMessages = {
      Active: "Are you sure you want to approve this booking?",
      Cancelled: "Are you sure you want to cancel this booking?",
      Completed: "Are you sure you want to mark this booking as returned?"
    };

    toast.warn(
      <div>
        <p>{statusMessages[newStatus]}</p>
        <div className="flex gap-4 mt-2">
          <button
            className="bg-gasolinlight hover:bg-gasolindark text-white px-3 py-1 rounded"
            onClick={async () => {
              try {
                await updateBooking({ id, data: { status: newStatus } });
                toast.success(`Booking status updated to ${newStatus}`, { position: "top-center" });
                toast.dismiss(10)
              } catch (error) {
                toast.error("Error updating booking status.", { position: "top-center" });
                toast.dismiss()
              }
            }}
          >
            Yes
          </button>
          <button
            className="bg-lightred hover:bg-darkred text-white px-3 py-1 rounded"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false
      }
    );
  };

  return (
    <div className="space-y-6">
      <ToastContainer /> {/* Required for Toast notifications */}

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

      {showCalendar && <Calendar bookingDates={bookingDates} onClose={() => setShowCalendar(false)} />}

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">Customer & Vehicle</th>
              <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-xs font-medium text-graydark uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graylight">
            {bookingsData?.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-sm text-graydark">{booking.vehicle?.brand} {booking.vehicle?.model}</p>
                </td>
                <td className="px-6 py-4">
                  {new Date(booking.dates.from).toLocaleDateString("en-US")} to {new Date(booking.dates.to).toLocaleDateString("en-US")}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">Rs.{booking.total}</td>
                <td className="px-6 py-4">
                  {booking.status !== "Completed" && booking.status !== "Cancelled" && (
                    <div className="flex gap-3">
                      {booking.returnStatus === "Pending" && (
                        <button className="bg-lightblue px-4 py-1 rounded-full text-blue hover:text-opacity-80 font-medium cursor-pointer" onClick={() => confirmAndUpdateStatus(booking._id, "Completed")}>
                          Return
                        </button>
                      )}
                      {booking.status === "Pending" && (
                        <>
                          <button className= "bg-[#bafff0] px-4 py-1 rounded-full text-green hover:text-opacity-80 font-medium cursor-pointer" onClick={() => confirmAndUpdateStatus(booking._id, "Active")}>
                            Approve
                          </button>
                          <button className="bg-[#f2dddd] px-4 py-1 rounded-full text-darkred hover:text-opacity-80 font-medium cursor-pointer" onClick={() => confirmAndUpdateStatus(booking._id, "Cancelled")}>
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Active": return "bg-lightblue text-blue";
    case "Pending": return "bg-[#fff6c6] bg-opacity-30 text-yellowdark";
    case "Completed": return "bg-[#bafff0] bg-opacity-30 text-gasolindark";
    case "Cancelled": return "bg-[#f2dddd] bg-opacity-30 text-darkred";
    default: return "bg-graylight bg-opacity-30 text-graydark";
  }
};
