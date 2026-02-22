// src/redux/store.ts

// Configure store

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        // Reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
