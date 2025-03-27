import React from 'react';
import Header from '../Header/Header';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import { Outlet } from 'react-router-dom';
import RightSideBar from '../RightSideBar/RightSideBar';
import './Root.css';

const Root = () => {
  return (
    <>
        <Header />
        <main>
            <LeftSideBar />
            <Outlet />
            <RightSideBar />
        </main>
    </>
  )
};

export default Root;