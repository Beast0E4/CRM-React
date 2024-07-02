import { configureStore } from "@reduxjs/toolkit";

import authSLiceReducer from "./Slices/AuthSLice";

const store = configureStore({
    reducer: {
        auth: authSLiceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export default store;