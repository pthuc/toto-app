import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth.slice"
import taskReducer from "./task.slice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: taskReducer
    }
    
})

export type RootState = ReturnType<typeof store.getState>