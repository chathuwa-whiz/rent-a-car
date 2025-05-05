import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rent-a-car-0n6z.onrender.com/api", 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({

    getBookings: builder.query({
      query: () => "/bookings",
    }),

    getUserBookings: builder.query({
      query: () => "/bookings/user",
    }),

    getBooking: builder.query({
      query: (id) => `/bookings/${id}`,
    }),

    createBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
    }),

    updateBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: `/bookings/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});


export const {
  useGetBookingsQuery,
  useGetUserBookingsQuery,
  useGetBookingQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
