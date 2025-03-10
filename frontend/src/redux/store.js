import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./services/authSlice";
import { userApi } from "./services/userSlice";
import { vehicleApi } from "./services/vehicleSlice"
import { maintenanceApi } from "./services/maintenanceSlice";
import { reportApi } from "./services/reportSlice";

export const store = configureStore({

    reducer: {

        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [vehicleApi.reducerPath]: vehicleApi.reducer,
        [maintenanceApi.reducerPath]: maintenanceApi.reducer,
        [reportApi.reducerPath]: reportApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(vehicleApi.middleware)
            .concat(maintenanceApi.middleware)
            .concat(reportApi.middleware)
            .concat(userApi.middleware),
})