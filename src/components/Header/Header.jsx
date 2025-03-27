import React from 'react'
import './Header.css';
import RedditLogo from '../../assets/images/header/reddit-icon.svg';
import RedditTextLogoMorning from '../../assets/images/header/reddit-morning.svg';
import RedditTextLogoNight from '../../assets/images/header/reddit-night.svg';
import Ads from '../../assets/images/general/ads.svg';
import AdsNight from '../../assets/images/general/ads-night.svg';
import Chat from '../../assets/images/header/chat.svg';
import ChatNight from '../../assets/images/header/chat-night.svg';
import Notification from '../../assets/images/header/notification.svg';
import NotificationNight from '../../assets/images/header/notification-night.svg';
import CreatePost from '../../assets/images/general/new.svg';
import CreatePostNight from '../../assets/images/general/new-night.svg';
import Avatar from '../../assets/images/header/avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectNightMode } from '../../redux/slices/nightModeSlice';
import SearchBar from './SearchBar/SearchBar';
import { Link } from 'react-router-dom';


const Header = () => {
    const nightModeState = useSelector(selectNightMode);

    return (
    <header>
        <Link to={`/`} className='left-header'>
            <img src={RedditLogo} alt='Reddit Logo'/>
            <img src={nightModeState ? RedditTextLogoNight : RedditTextLogoMorning} alt='Reddit Logo'/>
        </Link>
        <SearchBar />
        <div className='right-header'>
            <img className='header-button' src={nightModeState ? AdsNight : Ads} alt='Ads'/>
            <img className='header-button' src={nightModeState ? ChatNight : Chat} alt='Chat'/>
            <div className='createPost header-button'>
                <img src={nightModeState ? CreatePostNight : CreatePost} alt='create post'/>
                <span>Create Post</span>
            </div>
            <img className='header-button' src={nightModeState ? NotificationNight : Notification} alt='Notification'/>
            <img className='header-button' src={Avatar} alt='Avatar'/>
        </div>
    </header>
  )
}

export default Header