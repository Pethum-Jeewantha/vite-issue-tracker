import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BasicUserInfo} from "@asgardeo/auth-react";

interface UserState {
    user: BasicUserInfo | undefined;
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string;
    loading: boolean,
}

const initialState: UserState = {
    user: undefined,
    status: "idle",
    error: "",
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<BasicUserInfo>) => {
            state.user = action.payload;
        },
    },
});

export default userSlice.reducer;
