import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchHotPosts, selectTrendings } from '../../redux/slices/hotPostsSlice';
import { useEffect } from 'react';
import styles from './PostList.module.css';
import Post from '../Post/Post';

const PostList = () => {
  const posts = useSelector(selectTrendings);
  const isLoading = useSelector(state => state.hotPosts.isLoading);
  const error = useSelector(state => state.hotPosts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHotPosts(20));
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.postList}>
      {posts.map((post) => {
        return (
          <Post 
            key={post.id}
            post={post}
          />
        )
      })};
    </div>
  );
};

export default PostList;