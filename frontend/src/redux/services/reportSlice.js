import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportApi = createApi({
  reducerPath: "reportApi",
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
    getBookingReport: builder.query({
      query: (period = "7days") => `/reports/bookings?period=${period}`,
    }),

    getAllReports: builder.query({
      query: () => "/reports",
    }),
  }),
});

export const { useGetBookingReportQuery, useGetAllReportsQuery } = reportApi;
