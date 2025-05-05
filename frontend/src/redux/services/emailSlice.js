import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emailApi = createApi({
  reducerPath: "emailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rent-a-car-0n6z.onrender.com/api/send-email", 
    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem("token"); 
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),

  endpoints: (builder) => ({

    createEmail: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});


export const {
  useCreateEmailMutation,
} = emailApi;
