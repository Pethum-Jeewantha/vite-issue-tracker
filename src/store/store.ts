import { configureStore } from "@reduxjs/toolkit";
import issueReducer from "./features/issue/issue.slice.ts";
import userReducer from "./features/user/user.slice.ts";

export const store = configureStore({
    reducer: {
        issue: issueReducer,
        user: userReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
