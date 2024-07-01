import { configureStore } from "@reduxjs/toolkit"

import authSLiceReducer from "./Slices/AuthSLice";

const store = configureStore({
    reducer: {
        auth: authSLiceReducer
    },
    devTools: true
});

export default store;