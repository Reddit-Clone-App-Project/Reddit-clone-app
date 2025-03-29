import React, { useState, useEffect } from "react";
import styles from './Post.module.css';
import Comment from "../Comment/Comment";
import PostMedia from "../Media/Media";
import EmptyArrowUp from "../../assets/images/post/empty-up.svg?url";
import EmptyArrowDown from "../../assets/images/post/empty-down.svg?url";
import OrangeArrowUp from "../../assets/images/post/orange-up.svg?url";
import OrangeArrowDown from "../../assets/images/post/orange-down.svg?url";
import CommentIcon from "../../assets/images/post/comment-icon.svg?url";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, selectCommentsByPostId } from "../../redux/slices/commentSlice";
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';

function timeSinceDate(dateString) {
    const pastDate = new Date(dateString * 1000);
    const currentDate = new Date();
    const diffInMs = currentDate - pastDate;
    const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
    
    if (diffInHours >= 24) {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} days ago`;
    }
    return `${diffInHours} h ago`.replace(".00", "");
};

const Post = ({ post }) => {
    const [commentShown, setCommentShown] = useState(false);
    const [vote, setVote] = useState(null);
    const [numVotes, setNumVotes] = useState(post.score);
    const [commentLimit, setCommentLimit] = useState(5);
    const dispatch = useDispatch(); 
    
    const { comments, isLoading, isLoadingMore, error } = useSelector(state =>
        selectCommentsByPostId(state, post.id)
      );

    const handleComment = () => {
        setCommentShown(!commentShown);
        if (!comments.length && !isLoading) {
            dispatch(fetchComments({ postId: post.id, permalink: post.permalink, limit: commentLimit }));
        }
    };

    const handleMore = () => {
        const newLimit = commentLimit + 5;
        setCommentLimit(newLimit);
        dispatch(fetchComments({ postId: post.id, permalink: post.permalink, limit: newLimit }));
    };

    const handleVote = (direction) => {
        if (direction === vote) {
            setVote(null)
            setNumVotes(prev => direction === 'up' ? prev - 1 : prev + 1)
        } else {
            let change = 0;

            if (vote === null) {
                change = direction === 'up' ? 1 : -1;
              } else if (vote === 'up' && direction === 'down') {
                change = -2;
              } else if (vote === 'down' && direction === 'up') {
                change = 2;
              };
            
            setVote(direction);
            setNumVotes(prev => prev + change);
        };
    };

    

    return (
        <>
            <div className={styles.postList}>
                <div className={styles.topPost}>
                    <img className={styles.avatar} src={`https://api.dicebear.com/6.x/personas/svg?seed=${post.author}`}/>
                    <p>{post.author} · </p>
                    <p className={styles.date}>{timeSinceDate(post.created_utc)}</p>
                    <p className={styles.subreddit}>r/{post.subreddit}</p>
                </div>
                <h2 className={styles.title}>{post.title}</h2>
                {post.selftext && (
                    <div className={styles.content}>
                        <MarkdownRenderer content={post?.selftext || ''} />
                    </div>
                )}
                <PostMedia post={post} />
                <div className={styles.bottom}>
                    <div className={styles.upvotes}>
                        <img className={styles.arrow} src={vote === 'up' ? OrangeArrowUp : EmptyArrowUp} onClick={() => handleVote('up')} alt="arrow"/>
                        <p>{numVotes}</p>
                        <img className={styles.arrow} src={vote === 'down' ? OrangeArrowDown : EmptyArrowDown} onClick={() => handleVote('down')} alt="arrow"/>
                    </div>
                    <div className={styles.comment}>
                        <img style={{ cursor: 'pointer' }} onClick={handleComment} className={styles.commentIcon} src={CommentIcon} alt="comment"/>
                        <p style={{ cursor: 'pointer' }} onClick={handleComment}>{post.num_comments}</p>
                    </div>
                </div>
            </div>
            <div>
                {commentShown && (
                    <>
                        {isLoading &&
                            <>
                                <hr className={styles.hrComment}/>
                                <p className={styles.loading}>Loading comments...</p>
                            </>
                        }
                        {error && 
                            <p>Error: {error}</p>}
                        {comments.length > 0 &&
                            comments.map((comment) => (
                                <Comment 
                                key={comment.id}
                                comment={comment}
                                />   
                            ))
                        }
                        {isLoadingMore && (
                            <>
                                <hr className={styles.hrComment}/>
                                <p className={styles.loading}>Loading more comments...</p>
                            </>
                        )}
                        {comments.length > 0 && !isLoadingMore &&
                            <>
                                <hr className={styles.hrComment}/>
                                <p className={styles.buttonMore} onClick={handleMore}>Show more</p>
                            </>
                        }
                    </>
                )}
            </div>
            <hr/>
        </>
    );
};

export default Post;