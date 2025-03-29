import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularSubreddits, selectPopularSubreddits } from '../../redux/slices/popularSubredditsSlice';
import styles from './RightSideBar.module.css';
import SubredditsPopular from '../Subreddit/SubredditsPopular';
import { selectNightMode } from '../../redux/slices/nightModeSlice';

const RightSideBar = () => {
  const nightMode = useSelector(selectNightMode);
  
  const { subreddits, isLoading, error }= useSelector(state => state.popularSubreddits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularSubreddits(5));
  }, [dispatch]);

  if (isLoading) return <p className={styles.isLoading}>Loading popular subreddits...</p>;
  if (error) return <div className={styles.isloading}>Error: {error}</div>;
  
  return (
    <div className={`${styles.rightSideBar} ${nightMode ? styles.dark : ''}`}>
      <h3>Popular Community</h3>
      {subreddits.map((subreddit) => {
        return (
            <SubredditsPopular
              key={subreddit.id}
              subreddit={subreddit}
            />
        )
      })}
    </div>
  )
}

export default RightSideBar