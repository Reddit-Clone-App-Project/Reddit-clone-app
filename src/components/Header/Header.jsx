import React, { useEffect, useState, useRef } from "react";
import "./Header.css";
import RedditLogo from "../../assets/images/header/reddit-icon.svg";
import RedditTextLogoMorning from "../../assets/images/header/reddit-morning.svg";
import RedditTextLogoNight from "../../assets/images/header/reddit-night.svg";
import Ads from "../../assets/images/general/ads.svg";
import AdsNight from "../../assets/images/general/ads-night.svg";
import Chat from "../../assets/images/header/chat.svg";
import ChatNight from "../../assets/images/header/chat-night.svg";
import Notification from "../../assets/images/header/notification.svg";
import NotificationNight from "../../assets/images/header/notification-night.svg";
import CreatePost from "../../assets/images/general/new.svg";
import CreatePostNight from "../../assets/images/general/new-night.svg";
import Avatar from "../../assets/images/header/avatar.png";
import MobileLeftSideBar from "../../assets/images/header/mobile-left-side-bar.svg";
import MobileLeftSideBarDark from "../../assets/images/header/mobile-left-side-bar-dark.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectNightMode } from "../../redux/slices/nightModeSlice";
import SearchBar from "./SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { openLink } from "../../util/openOnNewTab";
import AvatarDropdown from "./AvatarDropdown/AvatarDropdown";

const Header = () => {
  const nightModeState = useSelector(selectNightMode);
  const [openAvatar, setOpenAvatar] = useState(false);
  const dropdownRef = useRef(null);
  const avatarButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Close only if clicking outside both dropdown and avatar button
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !avatarButtonRef.current.contains(event.target)
      ) {
        setOpenAvatar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`${nightModeState ? 'night' : ''}`}>
      <div className="left-header">
        <img className="mobile-left-side-bar" src={nightModeState ? MobileLeftSideBarDark : MobileLeftSideBar} alt="Open Menu Bar In Mobile" onClick={() => {
          document.getElementById('left-side-bar').style.display = document.getElementById('left-side-bar').style.display == "none" ? "block" : "none";
        }}/>
        <Link to={`/`} className="logo">
          <img src={RedditLogo} alt="Reddit Logo" />
          <img
            src={nightModeState ? RedditTextLogoNight : RedditTextLogoMorning}
            alt="Reddit Logo"
            className="logo-text"
          />
        </Link>
      </div>
      <SearchBar />
      <div className="right-header">
        <div
          className="header-button ads-header-button"
          onClick={() => {
            openLink(
              "https://ads.reddit.com/onboarding?utm_name=nav_cta&utm_source=web3x_consumer"
            );
          }}
        >
          <img src={nightModeState ? AdsNight : Ads} alt="Ads" />
        </div>

        <div className="header-button">
          <img src={nightModeState ? ChatNight : Chat} alt="Chat" />
        </div>

        <div className="createPost header-button">
          <img
            src={nightModeState ? CreatePostNight : CreatePost}
            alt="create post"
          />
          <span>Create</span>
        </div>

        <div className="header-button">
          <img
            src={nightModeState ? NotificationNight : Notification}
            alt="Notification"
          />
        </div>

        <div
          className="header-button"
          onClick={(e) => {
            e.stopPropagation();
            setOpenAvatar(!openAvatar);
          }}
          ref={avatarButtonRef}
        >
          <img src={Avatar} alt="Avatar" />
        </div>
        <AvatarDropdown openAvatar={openAvatar} dropdownRef={dropdownRef} />
      </div>
    </header>
  );
};

export default Header;
