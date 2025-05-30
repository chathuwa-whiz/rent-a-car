import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({

    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({

        baseUrl: "https://rent-a-car-0n6z.onrender.com/api",
        
    }),

    endpoints: (builder) => ({

        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        register: builder.mutation({

            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
        }),
        
    }),
});

export const {

    useLoginMutation,
    useRegisterMutation,
    
} = authApi;