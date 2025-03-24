import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async ({ postId, permalink }) => {
        const response = await axios.get(`https://www.reddit.com${permalink}.json`);
        const json = response.data;
        return {
            postId,
            comments: json[1].data.children.map(c => ({
                id: c.data.id,
                author: c.data.author,
                created_utc: c.data.created_utc,
                body: c.data.body,
                score: c.data.score,
            }))
        };
    }
);

const initialState = {
    commentsByPostId: {}
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state, action) => {
                const postId = action.meta.arg.postId;
                state.commentsByPostId[postId] = {
                    comments: [],
                    isLoading: true,
                    error: null
                };
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const { postId, comments } = action.payload;
                state.commentsByPostId[postId] = {
                    comments,
                    isLoading: false,
                    error: null
                };
            })
            .addCase(fetchComments.rejected, (state, action) => {
                const postId = action.meta.arg.postId;
                state.commentsByPostId[postId] = {
                  comments: [],
                  isLoading: false,
                  error: action.error.message
                };
            });

    }
});

export const selectCommentsByPostId = (state, postId) => 
    state.comments.commentsByPostId[postId] || {
        comments: [],
        isLoading: false,
        error: null
    };

export default commentsSlice.reducer;