import React, { useState } from "react";
import styles from './Comment.module.css';
import EmptyArrowUp from "../../assets/images/post/empty-up.svg?url";
import EmptyArrowDown from "../../assets/images/post/empty-down.svg?url";
import OrangeArrowUp from "../../assets/images/post/orange-up.svg?url";
import OrangeArrowDown from "../../assets/images/post/orange-down.svg?url";


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

const Comment = ({ comment }) => {
    const [vote, setVote] = useState(null);
    const [numVotes, setNumVotes] = useState(comment.score);

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
            <div className={styles.commentList}>
                <div className={styles.topComment}>
                    <img className={styles.avatar} src={`https://api.dicebear.com/6.x/personas/svg?seed=${comment.author}`} style={{width: '30px'}}/>
                    <p>{comment.author} · </p>
                    <p className={styles.date}>{timeSinceDate(comment.created_utc)}</p>
                </div>
                <p className={styles.content}>{comment.body}</p>
                <div className={styles.bottom}>
                    <img className={styles.arrow} src={vote === 'up' ? OrangeArrowUp : EmptyArrowUp} onClick={() => handleVote('up')} alt="arrow"/>
                    <p>{numVotes}</p>
                    <img className={styles.arrow} src={vote === 'down' ? OrangeArrowDown : EmptyArrowDown} onClick={() => handleVote('down')} alt="arrow"/>
                </div>
            </div>
        </>
    );
};

export default Comment;