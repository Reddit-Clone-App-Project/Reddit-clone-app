import React, {useState} from 'react'
import './LeftSideBar.css';
// Import Light mode
import About from '../../assets/images/LeftSideBar/about.svg';
import All from '../../assets/images/LeftSideBar/all.svg';
import Bars from '../../assets/images/LeftSideBar/bars.svg';
import BestOfReddit from '../../assets/images/LeftSideBar/best-of-reddit.svg';
import Blog from '../../assets/images/LeftSideBar/blog.svg';
import Career from '../../assets/images/LeftSideBar/career.svg';
import Communities from '../../assets/images/LeftSideBar/community.svg';
import Explore from '../../assets/images/LeftSideBar/explore.svg';
import Home from '../../assets/images/LeftSideBar/home.svg';
import NotStar from '../../assets/images/LeftSideBar/not-star.svg';
import Star from '../../assets/images/LeftSideBar/star.svg';
import New from '../../assets/images/general/new.svg';
import Popular from '../../assets/images/LeftSideBar/popular.svg';
import Press from '../../assets/images/LeftSideBar/press.svg';
import Help from '../../assets/images/LeftSideBar/question.svg';
import Topics from '../../assets/images/LeftSideBar/topic.svg';
import Ads from '../../assets/images/general/ads.svg';

// Import Dark mode
import AboutDark from '../../assets/images/LeftSideBar/dark/about-dark.svg'
import AllDark from '../../assets/images/LeftSideBar/dark/all-dark.svg'
import BarsDark from '../../assets/images/LeftSideBar/dark/bars-dark.svg'
import BestOfRedditDark from '../../assets/images/LeftSideBar/dark/best-of-reddit-dark.svg'
import BlogDark from '../../assets/images/LeftSideBar/dark/blog-dark.svg'
import CareerDark from '../../assets/images/LeftSideBar/dark/career-dark.svg'
import CommunitiesDark from '../../assets/images/LeftSideBar/dark/community-dark.svg'
import ExploreDark from '../../assets/images/LeftSideBar/dark/explore-dark.svg'
import HomeDark from '../../assets/images/LeftSideBar/dark/home-dark.svg'
import NotStarDark from '../../assets/images/LeftSideBar/dark/not-star-dark.svg'
import StarDark from '../../assets/images/LeftSideBar/dark/star-dark.svg'
import NewDark from '../../assets/images/general/new-night.svg'
import PopularDark from '../../assets/images/LeftSideBar/dark/popular-dark.svg'
import PressDark from '../../assets/images/LeftSideBar/dark/press-dark.svg'
import HelpDark from '../../assets/images/LeftSideBar/dark/question-dark.svg'
import TopicsDark from '../../assets/images/LeftSideBar/dark/topics-dark.svg'
import AdsDark from '../../assets/images/general/ads-night.svg'


import { Link } from 'react-router-dom';
import { openLink } from '../../util/openOnNewTab';
import { useSelector } from 'react-redux';
import { selectNightMode } from '../../redux/slices/nightModeSlice';

const LeftSideBar = () => {
    const nightModeState = useSelector(selectNightMode);
    const [feedsOpen, setFeedsOpen] = useState(true);
    const [recentOpen, setRecentOpen] = useState(true);
    const [communitiesOpen, setCommunitiesOpen] = useState(true);
    const [resourcesOpen, setResourcesOpen] = useState(true);

    return (
    <nav id='left-side-bar' className={`left-side-bar custom-scroll ${nightModeState ? 'night' : ''}`}>
            <div className='home-bar'>
                <Link to={`/`} className='bar-btn'>
                    <img className='icon-nav' src={nightModeState ? HomeDark : Home} alt='Home'/>
                    <p>Home</p>
                </Link>
                <div className='bar-btn'>
                    <img className='icon-nav' src={nightModeState ? PopularDark : Popular} alt='Popular'/>
                    <p>Popular</p>
                </div>
                <div className='bar-btn'>
                    <img className='icon-nav' src={nightModeState ? ExploreDark : Explore} alt='Explore'/>
                    <p>Explore</p>
                </div>
                <div className='bar-btn'>
                    <img className='icon-nav' src={nightModeState? AllDark : All} alt='All'/>
                    <p>All</p>
                </div>
            </div>
            <div className='feeds-bar'>
                <div className='bar-btn topic-btn' onClick={() => setFeedsOpen(!feedsOpen)}>
                    <p>CUSTOM FEEDS</p>
                    <div className={`open-close ${feedsOpen ? 'open' : ''} ${nightModeState ? 'night' : ''}`}></div>
                </div>
                <div className={`dropdown-menu-left-side-bar ${feedsOpen ? 'open' : ''}`}>
                    <div className='bar-btn'>
                        <img className='icon-nav' src={nightModeState ? NewDark : New} alt='Create a custom feed'/>
                        <p>Create a custom feed</p>
                    </div>
                </div>
            </div>
            <div className='recent-bar'>
                <div className='bar-btn topic-btn' onClick={() => setRecentOpen(!recentOpen)}>
                    <p>RECENT</p>
                    <div className={`open-close ${recentOpen ? 'open' : ''} ${nightModeState ? 'night' : ''}`}></div>
                </div>
                <div className={`dropdown-menu-left-side-bar ${recentOpen ? 'open' : ''}`}>
                    <div className='bar-btn'>
                        <img className='icon-nav' src={nightModeState ? NewDark : New} alt='Create a custom feed'/>
                        <p>Create a custom feed</p>
                    </div>
                </div>
            </div>
            <div className='communities-bar'>
                <div className='bar-btn topic-btn' onClick={() => setCommunitiesOpen(!communitiesOpen)}>
                    <p>COMMUNITIES</p>
                    <div className={`open-close ${communitiesOpen ? 'open' : ''} ${nightModeState ? 'night' : ''}`}></div>
                </div>
                <div className={`dropdown-menu-left-side-bar ${communitiesOpen ? 'open' : ''}`}>
                    <div className='bar-btn'>
                        <img className='icon-nav' src={nightModeState ? NewDark : New} alt='Create a custom feed'/>
                        <p>Create a community</p>
                    </div>
                </div>
            </div>
            <div className='resource-bar'>
                <div className='bar-btn topic-btn' onClick={() => setResourcesOpen(!resourcesOpen)}>
                    <p>RESOURCES</p>
                    <div className={`open-close ${resourcesOpen ? 'open' : ''} ${nightModeState ? 'night' : ''}`}></div>
                </div>
                <div className={`dropdown-menu-left-side-bar ${resourcesOpen ? 'open' : ''}`}>
                    <div className='resource-part-1'>
                        <div className='bar-btn' onClick={() => openLink('https://redditinc.com/')}>
                            <img className='icon-nav' src={nightModeState ? AboutDark : About} alt='About Reddit'/>
                            <p>About Reddit</p>
                        </div>
                        <div className='bar-btn' onClick={() => openLink('https://ads.reddit.com/register?utm_source=web3x_consumer&utm_name=left_nav_cta')}>
                            <img className='icon-nav' src={nightModeState ? AdsDark : Ads} alt='Advertise'/>
                            <p>Advertise</p>
                        </div>
                        <div className='bar-btn' onClick={() => openLink('https://support.reddithelp.com/hc/vi-vn?utm_campaign=evergreen&utm_medium=footer&utm_source=reddit')}>
                            <img className='icon-nav' src={nightModeState ? HelpDark : Help} alt='Help'/>
                            <p>Help</p>
                        </div>
                        <div className='bar-btn' onClick={() => openLink('https://redditinc.com/blog')}>
                            <img className='icon-nav' src={nightModeState ? BlogDark : Blog} alt='Blog'/>
                            <p>Blog</p>
                        </div>
                        <div className='bar-btn' onClick={() => openLink('https://redditinc.com/careers')}>
                            <img className='icon-nav' src={nightModeState ? CareerDark : Career} alt='Careers'/>
                            <p>Careers</p>
                        </div>
                        <div className='bar-btn' onClick={() => openLink('https://redditinc.com/press')}>
                            <img className='icon-nav' src={nightModeState ? PressDark : Press} alt='Press'/>
                            <p>Press</p>
                        </div>
                    </div>
                    <div className='resource-part-2'>
                        <div className='bar-btn'>
                            <img className='icon-nav' src={nightModeState ? CommunitiesDark : Communities} alt='Communities'/>
                            <p>Communities</p>
                        </div>
                        <div className='bar-btn'>
                            <img className='icon-nav' src={nightModeState ? BestOfRedditDark : BestOfReddit} alt='Best of Reddit'/>
                            <p>Best of Reddit</p>
                        </div>
                        <div className='bar-btn'>
                            <img className='icon-nav' src={nightModeState ? TopicsDark : Topics} alt='Topics'/>
                            <p>Topics</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default LeftSideBar