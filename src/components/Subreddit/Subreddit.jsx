import React from "react";
import styles from './Subreddit.module.css';

const Subreddit = ({ subreddit }) => {
    return (
        <div className={styles.subreddit}>
            <div className={styles.firstRow}>
                <img src={subreddit.icon} alt="avatar" style={{ width: '25px' }}/>
                <p className={styles.name}>r/{subreddit.name}</p>
            </div>
            <p className={styles.members}>{subreddit.members.toLocaleString()} members</p>
        </div>
    )
};

export default Subreddit;