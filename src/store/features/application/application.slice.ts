import {  createSlice } from "@reduxjs/toolkit";
import {ApplicationInterface} from "../../../interfaces/application.interface.ts";
import {fetchAll} from "./application.service.ts";

interface ApplicationState {
    data: ApplicationInterface[];
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string;
    loading: boolean,
}

const initialState: ApplicationState = {
    data: [],
    status: "idle",
    error: "",
    loading: false,
};

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAll.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAll.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAll.rejected, (state) => {
                state.loading = false;
                state.error = "failed";
            });
    },
});

export default applicationSlice.reducer;
