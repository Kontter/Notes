import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { notesApi } from "./notesApi";


export const store = configureStore({
    reducer: {
        [notesApi.reducerPath]: notesApi.reducer,                              
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([notesApi.middleware, notesApi.middleware])
})


setupListeners(store.dispatch)