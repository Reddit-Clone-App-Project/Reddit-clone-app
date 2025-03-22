import React from 'react'
import Header from '../Header/Header'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import { Outlet } from 'react-router-dom'
import PostList from '../PostList/PostList'
import RightSideBar from '../RightSideBar/RightSideBar'
import './Root.css';

const Root = () => {
  return (
    <>
        <Header />
        <main>
            <LeftSideBar />
            <PostList />
            <RightSideBar />
            <Outlet />
        </main>
    </>
  )
}

export default Root