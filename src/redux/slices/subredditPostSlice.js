import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubredditPost = createAsyncThunk(
    'subredditPost/fetchSubredditPost',
    async(subredditName) => {
        const response = await axios.get(`https://www.reddit.com/r/${subredditName}.json`);
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

const subredditPostSlice = createSlice({
    name: "subredditPost",
    initialState: {
        posts: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubredditPost.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSubredditPost.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchSubredditPost.rejected, (state, action) => {
                state.error = action.error.message;
                state.isLoading = false;
            });
    },
});

export const selectSubredditPost = (state) => state.subredditPost;

export default subredditPostSlice.reducer;