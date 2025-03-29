import React from 'react';
import Header from '../Header/Header';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import { Outlet } from 'react-router-dom';
import RightSideBar from '../RightSideBar/RightSideBar';
import './Root.css';
import { useSelector } from 'react-redux';
import { selectNightMode } from '../../redux/slices/nightModeSlice';

const Root = () => {
  const nightModeState = useSelector(selectNightMode);
  return (
    <div className={`app ${nightModeState ? 'night' : ''}`}>
        <Header />
        <main>
            <LeftSideBar />
            <Outlet />
            <RightSideBar />
        </main>
    </div>
  )
};

export default Root;