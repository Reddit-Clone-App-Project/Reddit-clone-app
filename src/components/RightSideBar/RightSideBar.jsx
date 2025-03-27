import React from 'react';
import { useSelector } from 'react-redux';
import styles from './RightSideBar.module.css';
import Subreddit from '../Subreddit/Subreddit';

const RightSideBar = () => {
  const subreddits = useSelector(state => state.rightSideBar.rightSideBar);
  return (
    <div className={styles.rightSideBar}>
      <h3>Popular Community</h3>
      {subreddits.map((subreddit) => {
        return (
          <div>
            <Subreddit
              key={subreddit.id}
              subreddit={subreddit}
            />
          </div>
        )
      })}
    </div>
  )
}

export default RightSideBar