import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./services/authSlice";
import { userApi } from "./services/userSlice";
import { vehicleApi } from "./services/vehicleSlice"
import { bookingApi } from "./services/bookingSlice"
import { paymentApi } from "./services/payhereSlice";
import { maintenanceApi } from "./services/maintenanceSlice";
import { reportApi } from "./services/reportSlice";
import { emailApi } from "./services/emailSlice";

export const store = configureStore({

    reducer: {

        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [vehicleApi.reducerPath]: vehicleApi.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [maintenanceApi.reducerPath]: maintenanceApi.reducer,
        [reportApi.reducerPath]: reportApi.reducer,
        [emailApi.reducerPath]: emailApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(vehicleApi.middleware)
            .concat(userApi.middleware)
            .concat(bookingApi.middleware)
            .concat(paymentApi.middleware)
            .concat(maintenanceApi.middleware)
            .concat(reportApi.middleware)
            .concat(userApi.middleware)
            .concat(emailApi.middleware),
})