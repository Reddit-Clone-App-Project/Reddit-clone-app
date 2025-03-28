import React from "react";
import styles from './SubredditsPopular.module.css';
import { Link } from "react-router-dom";

const SubredditsPopular = ({ subreddit }) => {
    const isValidIcon = subreddit.icon && subreddit.icon.startsWith('http');

    return (
        <div className={styles.subreddit}>
            <div className={styles.firstRow}>
                <img src={isValidIcon ? subreddit.icon : "/mock_images/reddit-4.svg"} alt={`Icon of r/${subreddit.name}`} style={{ width: '30px', marginTop: '8px' }} 
                    onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default-icon.png";}}/>
                <Link to={`/r/${subreddit.name}`} className={styles.name}>r/{subreddit.name}</Link>
            </div>
            <p className={styles.members}>{subreddit.subs.toLocaleString()} members</p>
        </div>
    )
};

export default SubredditsPopular;