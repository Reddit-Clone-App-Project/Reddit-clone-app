import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async ({ postId, permalink, limit }) => {
        const response = await axios.get(`https://www.reddit.com${permalink}.json`);
        const json = response.data;
        const allComments = json[1]?.data?.children || [];
        const limitComments = allComments
            .filter(c => c.kind === 't1' && c.data?.body && c.data?.author)
            .slice(0, limit);

        return {
            postId,
            comments: limitComments.map(c => ({
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
                const current = state.commentsByPostId[postId];

                if (current && current.comments.length > 0) {
                    state.commentsByPostId[postId].isLoadingMore = true;
                } else {
                    state.commentsByPostId[postId] = {
                        comments: [],
                        isLoading: true,
                        isLoadingMore: false,
                        error: null
                    };
                }
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const { postId, comments } = action.payload;
                const current = state.commentsByPostId[postId];
              
                if (!current) {
                  state.commentsByPostId[postId] = {
                    comments,
                    isLoading: false,
                    isLoadingMore: false,
                    error: null
                  };
                } else {
                  const currentIds = new Set(current.comments.map(c => c.id));
                  const newOnes = comments.filter(c => !currentIds.has(c.id));
              
                  state.commentsByPostId[postId].comments = [
                    ...current.comments,
                    ...newOnes
                  ];
                  state.commentsByPostId[postId].isLoading = false;
                  state.commentsByPostId[postId].isLoadingMore = false;
                  state.commentsByPostId[postId].error = null;
                }
              })
            .addCase(fetchComments.rejected, (state, action) => {
                const postId = action.meta.arg.postId;
                state.commentsByPostId[postId] = {
                  comments: [],
                  isLoading: false,
                  isLoadingMore: false,
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