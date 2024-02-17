import {  createSlice } from "@reduxjs/toolkit";
import {create, fetchAll, fetchById, fetchSummary, patch, remove, update} from "./issue.service.ts";
import {IssueInterface} from "../../../interfaces/issue.interface.ts";

interface IssueSliceInterface {
    list: IssueInterface[];
    offset: number;
    limit: number;
    total: number;
}

interface SummaryInterface {
    open: number;
    inProgress: number;
    closed: number;
    latestIssues: IssueInterface[];
}

interface IssueState {
    issues: IssueSliceInterface;
    issue: IssueInterface | undefined;
    summary: SummaryInterface | undefined;
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string;
    loading: boolean,
}

const initialState: IssueState = {
    issues: {
        list: [],
        offset: 0,
        limit: 10,
        total: 0,
    },
    issue: undefined,
    summary: undefined,
    status: "idle",
    error: "",
    loading: false,
};

const issueSlice = createSlice({
    name: "issue",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAll.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAll.fulfilled, (state, action) => {
                state.loading = false;
                state.issues = action.payload;
            })
            .addCase(fetchAll.rejected, (state) => {
                state.loading = false;
                state.error = "failed";
            })
            .addCase(fetchSummary.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.summary = action.payload;
            })
            .addCase(fetchSummary.rejected, (state) => {
                state.loading = false;
                state.error = "failed";
            })
            .addCase(fetchById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchById.fulfilled, (state, action) => {
                state.loading = false;
                state.issue = action.payload;
            })
            .addCase(fetchById.rejected, (state) => {
                state.loading = false;
                state.error = "failed";
            })
            .addCase(create.pending, (state) => {
                state.loading = true;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.loading = false;
                state.issues.list.push(action.payload);
            })
            .addCase(create.rejected, (state) => {
                state.loading = false;
                state.error = "action.error";
            })
            .addCase(remove.pending, (state) => {
                state.loading = true;
            })
            .addCase(remove.fulfilled, (state, action) => {
                state.loading = false;
                state.issues.list = state.issues.list.filter((item) => item?.id !== action.payload);
            })
            .addCase(remove.rejected, (state) => {
                state.loading = false;
                state.error = "action.error.message";
            })
            .addCase(update.pending, (state) => {
                state.loading = true;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.loading = false;
                const { id, updatedData } = action.payload;

                const dataToUpdate = state.issues.list.find((issue) => issue.id === id);
                if (dataToUpdate) {
                    Object.assign(dataToUpdate, updatedData);
                }
            })
            .addCase(update.rejected, (state) => {
                state.loading = false;
                state.error = "action.error.message";
            })
            .addCase(patch.pending, (state) => {
                state.loading = true;
            })
            .addCase(patch.fulfilled, (state, action) => {
                state.loading = false;
                const { id, updatedData } = action.payload;

                const dataToUpdate = state.issues.list.find((issue) => issue.id === id);
                if (dataToUpdate) {
                    Object.assign(dataToUpdate, updatedData);
                }
            })
            .addCase(patch.rejected, (state) => {
                state.loading = false;
                state.error = "action.error.message";
            });
    },
});

export default issueSlice.reducer;
