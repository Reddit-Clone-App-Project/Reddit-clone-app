import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch hot posts
export const fetchHotPosts = createAsyncThunk(
    'hotPosts/fetchHotPosts',
    async(limit) => {
        const response = await axios.get(`https://www.reddit.com/hot.json?limit=${limit}`);
        return response.data.data.children.map((child) => ({
            id: child.data.id,
            title: child.data.title,
            selftext: child.data.selftext,
            thumbnail: child.data.thumbnail,
            subreddit: child.data.subreddit,
            author: child.data.author,
            score: child.data.score,
            num_comments: child.data.num_comments,
            created_utc: child.data.created_utc,
            url: child.data.url_overridden_by_dest?.trim() || null, 
            permalink: child.data.permalink,
            post_hint: child.data.post_hint,
            media: child.data.media,
        }))
    }
);

const hotPostsSlice = createSlice({
    name: "hotPosts",
    initialState: {
        trendings: [],
        error: null,
        isLoading: false,
    },
    reducers: {
        clearPosts: (state) => {
            state.trendings = [];
            state.error = null;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotPosts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchHotPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trendings = action.payload;
            })
            .addCase(fetchHotPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export default hotPostsSlice.reducer;
export const selectTrendings = (state) => state.hotPosts.trendings;
export const { clearPosts } = hotPostsSlice.actions;