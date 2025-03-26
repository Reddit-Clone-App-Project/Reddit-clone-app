import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPopularSubreddits = createAsyncThunk(
    'popularSubreddits/fetchPopularSubreddits',
    async(limit) => {
        const response = await axios.get(`https://www.reddit.com/subreddits/popular.json?limit=${limit}`);
        return response.data.data.children.map((child) => ({
            id: child.data.id,
            name: child.data.display_name,
            subs: child.data.subscribers,
            icon: child.data.icon_img,
        }))
    }
);

const popularSubredditsSlice = createSlice({
    name: "popularSubreddits",
    initialState: {
        subreddits: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularSubreddits.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPopularSubreddits.fulfilled, (state, action) => {
                state.subreddits = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchPopularSubreddits.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            });
    },
});

export const selectPopularSubreddits = (state) => state.popularSubreddits;

export default popularSubredditsSlice.reducer;