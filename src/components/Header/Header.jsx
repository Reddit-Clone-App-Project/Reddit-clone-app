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
import { useDispatch, useSelector } from "react-redux";
import { selectNightMode } from "../../redux/slices/nightModeSlice";
import SearchBar from "./SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { openLink } from "../../util/openOnNewTab";
import AvatarDropdown from "./AvatarDropdown/AvatarDropdown";

const Header = () => {
  const nightModeState = useSelector(selectNightMode);
  const [openAvatar, setOpenAvatar] = useState(false);
  const avatarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setOpenAvatar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <Link to={`/`} className="left-header">
        <img src={RedditLogo} alt="Reddit Logo" />
        <img
          src={nightModeState ? RedditTextLogoNight : RedditTextLogoMorning}
          alt="Reddit Logo"
        />
      </Link>
      <SearchBar />
      <div className="right-header">
        <div
          className="header-button"
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
          <span>Create Post</span>
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
          ref={avatarRef}
        >
          <img src={Avatar} alt="Avatar" />
        </div>
        <AvatarDropdown openAvatar={openAvatar} />
      </div>
    </header>
  );
};

export default Header;
