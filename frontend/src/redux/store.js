import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./services/authSlice";
import { userApi } from "./services/userSlice";
import { vehicleApi } from "./services/vehicleSlice"
import { maintenanceApi } from "./services/maintenanceSlice";

export const store = configureStore({

    reducer: {

        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [vehicleApi.reducerPath]: vehicleApi.reducer,
        [maintenanceApi.reducerPath]: maintenanceApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(vehicleApi.middleware)
            .concat(maintenanceApi.middleware)
            .concat(userApi.middleware),
})