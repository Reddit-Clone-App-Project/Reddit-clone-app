import React, { useEffect } from "react";
import styles from "./SubredditsPage.module.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSubredditPost, selectSubredditPost } from "../../redux/slices/subredditPostSlice";
import { fetchSubredditInfo, selectSubredditInfo } from "../../redux/slices/subredditInfoSlice";
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer";
import SafeImage from "../SafeImage/SafeImage";

const SubredditsPage = () => {
    const { posts, isLoading, error } = useSelector(selectSubredditPost);
    const { subreddit, isLoadingInfo, errorInfo } = useSelector(
        (state) => state.subredditInfo || {}
      );
    const dispatch = useDispatch();
    const { subredditName } = useParams();

    useEffect(() => {
        dispatch(fetchSubredditPost(subredditName));
    }, [dispatch, subredditName]);

    useEffect(() => {
        dispatch(fetchSubredditInfo(subredditName));
    }, [dispatch, subredditName]);

    const icon = subreddit?.icon || subreddit?.communityIcon;


    if (isLoading) return <div className={styles.loading}>Loading posts...</div>;
    if (error) return <div className={styles.loading}>Error: {error}</div>;

    return (
        <div className={styles.subredditsPage}>
            <div className={styles.header}>
                <div className={styles.banner}
                    style={{
                        backgroundImage: subreddit?.banner ? `url(${subreddit?.banner})` : undefined,
                        backgroundColor: !subreddit?.banner && subreddit?.bannerColor ? subreddit?.bannerColor : undefined,
                    }}>
                </div>
                <div className={styles.headerContent}>
                    <SafeImage src={icon} fallback="/mock_images/reddit-4.svg" alt={`Icon of r/${subredditName}`} className={styles.icon} />
                    <h2 className={styles.title}>r/{subredditName}</h2>
                    <p className={styles.members}>{subreddit?.subs.toLocaleString()} members</p>
                </div>
                <div className={styles.description}>
                    <MarkdownRenderer content={subreddit.description} />
                </div>
            </div>
            <hr className={styles.hrDescription}/>
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