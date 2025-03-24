import React, { useState, useEffect } from "react";
import styles from './Post.module.css';
import Comment from "../Comment/Comment";
import EmptyArrowUp from "../../assets/images/post/empty-up.svg?url";
import EmptyArrowDown from "../../assets/images/post/empty-down.svg?url";
import OrangeArrowUp from "../../assets/images/post/orange-up.svg?url";
import OrangeArrowDown from "../../assets/images/post/orange-down.svg?url";
import CommentIcon from "../../assets/images/post/comment-icon.svg?url";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, selectCommentsByPostId } from "../../redux/slices/commentSlice";

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
    const dispatch = useDispatch(); 
    
    const { comments, isLoading, error } = useSelector(state =>
        selectCommentsByPostId(state, post.id)
      );

    const handleComment = () => {
        setCommentShown(!commentShown);
        if (!comments.length && !isLoading) {
            dispatch(fetchComments({ postId: post.id, permalink: post.permalink }));
        }
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
                <h2>{post.title}</h2>
                <p className={styles.content}>{post.selftext}</p>
                <img className={styles.media} src={post.url}/>
                <div className={styles.bottom}>
                    <div className={styles.upvotes}>
                        <img className={styles.arrow} src={vote === 'up' ? OrangeArrowUp : EmptyArrowUp} onClick={() => handleVote('up')} alt="arrow"/>
                        <p>{numVotes}</p>
                        <img className={styles.arrow} src={vote === 'down' ? OrangeArrowDown : EmptyArrowDown} onClick={() => handleVote('down')} alt="arrow"/>
                    </div>
                    <div className={styles.comment}>
                        <img style={{ cursor: 'pointer' }} onClick={handleComment} className={styles.commentIcon} src={CommentIcon} alt="comment"/>
                        <p style={{ cursor: 'pointer' }} onClick={handleComment}>{post.comments}</p>
                    </div>
                </div>
            </div>
            <div className={comments}>
                {commentShown && (
                    <>
                        {isLoading && <p>Loading comments...</p>}
                        {error && <p>Error: {error}</p>}
                        {comments.lenght > 0 &&
                            comments.map((comment) => (
                                <Comment 
                                key={comment.id}
                                comment={comment}
                                />   
                            ))
                        }
                    </>
                )}
            </div>
            <hr/>
        </>
    );
};

export default Post;