import { configureStore } from "@reduxjs/toolkit";

import authSLiceReducer from "./Slices/AuthSLice";
import ticketSliceReducer from './Slices/TicketSlice';

const store = configureStore({
    reducer: {
        auth: authSLiceReducer,
        tickets: ticketSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export default store;