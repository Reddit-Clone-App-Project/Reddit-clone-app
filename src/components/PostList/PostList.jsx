import React from 'react';
import { useSelector } from "react-redux";
import styles from './PostList.module.css';
import Post from '../Post/Post';

const PostList = () => {
  const posts = useSelector(state => state.posts.posts);
  const comments = useSelector(state => state.posts.comments);

  return (
    <div className={styles.postList}>
      {posts.map((post) => {
        return (
          <Post 
            key={post.id}
            post={post}
            comments={comments}
          />
        )
      })};
    </div>
  );
};

export default PostList;