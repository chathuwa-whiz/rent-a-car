import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./services/authSlice";
import { userApi } from "./services/userSlice";
import { vehicleApi } from "./services/vehicleSlice"
import { bookingApi } from "./services/bookingSlice"
import { paymentApi } from "./services/payhereSlice";

export const store = configureStore({

    reducer: {

        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [vehicleApi.reducerPath]: vehicleApi.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(vehicleApi.middleware)
            .concat(userApi.middleware)
            .concat(bookingApi.middleware)
            .concat(paymentApi.middleware),

})