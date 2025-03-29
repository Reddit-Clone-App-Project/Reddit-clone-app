import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSubredditInfo = createAsyncThunk(
    'subredditInfo/fetchSubredditInfo',
    async (subreddit) => {
        const response = await axios.get(`https://www.reddit.com/r/${subreddit}/about.json`);
        const data = response.data.data;
        return {
            id: data.id,
            name: data.display_name,
            subs: data.subscribers,
            icon: data.icon_img,
            communityIcon: data.community_icon,
            description: data.public_description,
            banner: data.banner_background_image,
            bannerColor: data.banner_background_color,
        };

    }
);

const subredditInfoSlice = createSlice({
    name: 'subredditInfo',
    initialState: {
        subreddit: null,
        isLoadingInfo: false,
        errorInfo: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubredditInfo.pending, (state) => {
                state.isLoadingInfo = true;
                state.errorInfo = null;
            })
            .addCase(fetchSubredditInfo.fulfilled, (state, action) => {
                state.subreddit = action.payload;
                state.isLoadingInfo = false;
            })
            .addCase(fetchSubredditInfo.rejected, (state, action) => {
                state.isLoadingInfo = false;
                state.errorInfo = action.error.message;
            });
    },
});

export const selectSubredditInfo = (state) => state.subredditInfo.subreddit;
export default subredditInfoSlice.reducer;