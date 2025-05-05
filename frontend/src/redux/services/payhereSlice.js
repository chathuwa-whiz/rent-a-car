import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rent-a-car-0n6z.onrender.com/api/payhere",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Fetch payment hash from backend
    getPaymentHash: builder.mutation({
      query: (booking) => ({
        url: "/hash",
        method: "POST",
        body: booking,
      }),
    }),
  }),
});

export const { useGetPaymentHashMutation } = paymentApi;
