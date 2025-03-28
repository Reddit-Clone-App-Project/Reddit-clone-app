import React from "react";
import styles from './SubredditsPopular.module.css';
import { Link } from "react-router-dom";
import SafeImage from "../SafeImage/SafeImage";

const SubredditsPopular = ({ subreddit }) => {
    
    return (
        <div className={styles.subreddit}>
            <div className={styles.firstRow}>
                <SafeImage src={subreddit?.icon} fallback="/mock_images/reddit-4.svg" alt={`Icon of r/${subreddit.name}`} style={{ width: '30px', marginTop: '8px' }} />
                <Link to={`/r/${subreddit.name}`} className={styles.name}>r/{subreddit.name}</Link>
            </div>
            <p className={styles.members}>{subreddit.subs.toLocaleString()} members</p>
        </div>
    )
};

export default SubredditsPopular;