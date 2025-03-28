import { configureStore } from '@reduxjs/toolkit';
import nightMode from './slices/nightModeSlice';
import subreddits from './slices/subredditsSlice';
import hotPosts from './slices/hotPostsSlice';
import posts from './slices/postSlice';
import rightSideBar from './slices/rightSideBarSlice';
import comments from './slices/commentSlice';
import popularSubreddits from './slices/popularSubredditsSlice';
import subredditPost from './slices/subredditPostSlice';

export const store = configureStore({
    reducer: {
        nightMode,
        subreddits,
        hotPosts,
        posts,
        rightSideBar,
        comments,
        popularSubreddits,
        subredditPost,
    },
});