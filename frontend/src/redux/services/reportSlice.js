import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5010/api",
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
