import React, { useEffect } from "react";
import styles from "./SubredditsPage.module.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSubredditPost, selectSubredditPost } from "../../redux/slices/subredditPostSlice";

const SubredditsPage = () => {
    const { posts, isLoading, error } = useSelector(selectSubredditPost);
    const dispatch = useDispatch();
    const { subredditName } = useParams();

    useEffect(() => {
        dispatch(fetchSubredditPost(subredditName));
    }, [dispatch, subredditName]);

    if (isLoading) return <div className={styles.loading}>Loading posts...</div>;
    if (error) return <div className={styles.loading}>Error: {error}</div>;

    return (
        <div className={styles.SubredditsPage}>
            <h2>r/{subredditName}</h2>
            {posts.map((post) => {
                return (
                    <Post
                        key={post.id}
                        post={post}
                    />
                )
            })}
        </div>
    )
};

export default SubredditsPage;