import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vehicleApi = createApi({

    reducerPath: "vehicleApi",
    baseQuery: fetchBaseQuery({

        baseUrl: "http://localhost:5010/api",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),

    endpoints: (builder) => ({

        getVehicles: builder.query({
            query: () => '/vehicles',
        }),

        getVehicle: builder.query({
            query: (id) => `/vehicles/${id}`,
          }),

        addVehicle: builder.mutation({
            query: (data) => ({
                url: '/vehicles',
                method: 'POST',
                body: data,
            }),
        }),

        updateVehicle: builder.mutation({

            query: ({ id, data }) => ({
                url: `/vehicles/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),

        deleteVehicle: builder.mutation({

            query: (id) => ({
                url: `/vehicles/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {

    useGetVehiclesQuery,
    useGetVehicleQuery,
    useAddVehicleMutation,
    useUpdateVehicleMutation,
    useDeleteVehicleMutation,
    
} = vehicleApi;