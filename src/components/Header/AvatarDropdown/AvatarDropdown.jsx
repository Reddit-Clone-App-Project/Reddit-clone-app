import React from "react";
import "./AvatarDropDown.css";
// ! The avatar is hardcoded
import Avatar from "../../../assets/images/header/avatar.png";
// Get the light svg
import ContributeProgram from "../../../assets/images/header/avatar-drop-down/contribute-program.svg";
import DarkMode from "../../../assets/images/header/avatar-drop-down/dark-mode.svg";
import Drafts from "../../../assets/images/header/avatar-drop-down/drafts.svg";
import EditAvatar from "../../../assets/images/header/avatar-drop-down/edit-avatar.svg";
import Setting from "../../../assets/images/header/avatar-drop-down/setting.svg";
import Logout from "../../../assets/images/header/avatar-drop-down/log-out.svg";
import Premium from "../../../assets/images/header/avatar-drop-down/premium.svg";
import Achievements from "../../../assets/images/header/avatar-drop-down/achievements.svg";
import Coins from "../../../assets/images/header/avatar-drop-down/coins.svg";
import Advertise from "../../../assets/images/general/ads.svg";
// Get the dark svg
import AdvertiseDark from "../../../assets/images/general/ads-night.svg";
import AchievementsDark from "../../../assets/images/header/avatar-drop-down/dark/achievements-dark.svg";
import CoinsDark from "../../../assets/images/header/avatar-drop-down/dark/coins-dark.svg";
import ContributingProgramDark from "../../../assets/images/header/avatar-drop-down/dark/contributing-program-dark.svg";
import DarkModeDark from "../../../assets/images/header/avatar-drop-down/dark/dark-mode-dark.svg";
import DraftsDark from "../../../assets/images/header/avatar-drop-down/dark/drafts-dark.svg";
import EditAvatarDark from "../../../assets/images/header/avatar-drop-down/dark/edit-avatar-dark.svg";
import LogoutDark from "../../../assets/images/header/avatar-drop-down/dark/log-out-dark.svg";
import PremiumDark from "../../../assets/images/header/avatar-drop-down/dark/premium-dark.svg";
import SettingDark from "../../../assets/images/header/avatar-drop-down/dark/setting-dark.svg";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  changeNightMode,
  selectNightMode,
} from "../../../redux/slices/nightModeSlice";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";
import { openLink } from "../../../util/openOnNewTab";

const AvatarDropdown = ({ openAvatar, dropdownRef }) => {
  const nightModeState = useSelector(selectNightMode);
  const dispatch = useDispatch();

  const handleMenuClick = (action) => (e) => {
    e.stopPropagation();
    if (typeof action === "function") {
      action();
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`avatar-dropdown ${openAvatar ? "open" : ""} ${nightModeState ? "night" : ''}`}
    >
      <div
        className="avatar-block avatar-double-line"
        onClick={handleMenuClick(() => console.log("Profile clicked"))}
      >
        {/* Avatar is hardcoded */}
        <img src={Avatar} alt="avatar" className="avatar-img" />
        <div>
          <p>View Profile</p>
          <p>u/defaultUser</p>
        </div>
      </div>
      <div
        className="avatar-block"
        onClick={handleMenuClick(() => console.log("Edit Avatar clicked"))}
      >
        <img
          src={nightModeState ? EditAvatarDark : EditAvatar}
          alt="edit avatar"
          className="avatar-img"
        />
        <p>Edit Avatar</p>
      </div>
      <div
        className="avatar-block"
        onClick={handleMenuClick(() => console.log("Drafts clicked"))}
      >
        <img
          src={nightModeState ? DraftsDark : Drafts}
          alt="drafts"
          className="avatar-img"
        />
        <p>Drafts</p>
      </div>
      <div
        className="avatar-block"
        onClick={handleMenuClick(() => console.log("Achievements clicked"))}
      >
        <img
          src={nightModeState ? AchievementsDark : Achievements}
          alt="achievement"
          className="avatar-img"
        />
        <div>
          <p>Achievements</p>
          <p>0 unlocked</p>
        </div>
      </div>
      <div
        className="avatar-block avatar-double-line"
        onClick={handleMenuClick(() =>
          console.log("Contributing Program clicked")
        )}
      >
        <img
          src={nightModeState ? ContributingProgramDark : ContributeProgram}
          alt="contributing program"
          className="avatar-img"
        />
        <div>
          <p>Contributing Program</p>
          <div className="contributing-program-info">
            <img src={nightModeState ? CoinsDark : Coins} />
            <p>0 coins earned</p> {/*This is hardcoded*/}
          </div>
        </div>
      </div>
      <div
        className="avatar-block avatar-dark-mode"
        
      >
        <div className="avatar-dark-mode-info" onClick={handleMenuClick(() => dispatch(changeNightMode()))}>
          <img
            src={nightModeState ? DarkModeDark : DarkMode}
            className="avatar-img"
          />
          <p>Dark Mode</p>
        </div>
        <ToggleSwitch />
      </div>
      <div
        className="avatar-block"
        onClick={handleMenuClick(() => console.log("Log Out clicked"))}
      >
        <img
          src={nightModeState ? LogoutDark : Logout}
          className="avatar-img"
        />
        <p>Log Out</p>
      </div>
      <br />
      <div
        className="avatar-block"
        onClick={handleMenuClick(() => openLink('https://ads.reddit.com/register?utm_source=web3x_consumer&utm_name=user_menu_cta'))}
      >
        <img
          src={nightModeState ? AdvertiseDark : Advertise}
          className="avatar-img"
        />
        <p>Advertise on Reddit</p>
      </div>
      <br />
      <div
        className="avatar-block"
        onClick={handleMenuClick(() => console.log("Setting clicked"))}
      >
        <img
          src={nightModeState ? SettingDark : Setting}
          className="avatar-img"
        />
        <p>Setting</p>
      </div>
      <br />
      <div
        className="avatar-block"
        onClick={handleMenuClick(() =>
          openLink('https://www.reddit.com/premium')
        )}
      >
        <img
          src={nightModeState ? PremiumDark : Premium}
          className="avatar-img"
        />
        <p>Upgrade to Premium</p>
      </div>
    </div>
  );
};

export default AvatarDropdown;
