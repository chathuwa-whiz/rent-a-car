import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({

    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({

        baseUrl: "https://rent-a-car-0n6z.onrender.com/api",
        prepareHeaders: (headers) => {

            const token = localStorage.getItem('token');
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),

    endpoints: (builder) => ({

        getUsers: builder.query({
            query: () => '/user',
        }),

        getUserById: builder.query({
            query: (id) => `/user/${id}`,
        }),

        getUserByRole: builder.query({
            query: (role) => `/user/role/${role}`,
        }),

        updateUser: builder.mutation({
            query: ({id, user}) => ({
                url: `/user/${id}`,
                method: 'PUT',
                body: user,
            }),
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {

    useGetUsersQuery,
    useGetUserByIdQuery,
    useGetUserByRoleQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,

} = userApi;