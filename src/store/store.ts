import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "./features/issue/issue.slice.ts";

export const store = configureStore({
    reducer: {
        issue: issueReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
