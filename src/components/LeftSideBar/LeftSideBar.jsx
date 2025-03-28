import React, {useState} from 'react'
import './LeftSideBar.css';
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
import { Link } from 'react-router-dom';

const LeftSideBar = () => {
    const [feedsOpen, setFeedsOpen] = useState(true);
    const [recentOpen, setRecentOpen] = useState(true);
    const [communitiesOpen, setCommunitiesOpen] = useState(true);
    const [resourcesOpen, setResourcesOpen] = useState(true);

    return (
    <nav className='left-side-bar custom-scroll'>
            <div className='home-bar'>
                <Link to={`/`} className='bar-btn'>
                    <img className='icon-nav' src={Home} alt='Home'/>
                    <p>Home</p>
                </Link>
                <div className='bar-btn'>
                    <img className='icon-nav' src={Popular} alt='Popular'/>
                    <p>Popular</p>
                </div>
                <div className='bar-btn'>
                    <img className='icon-nav' src={Explore} alt='Explore'/>
                    <p>Explore</p>
                </div>
                <div className='bar-btn'>
                    <img className='icon-nav' src={All} alt='All'/>
                    <p>All</p>
                </div>
            </div>
            <div className='feeds-bar'>
                <div className='bar-btn topic-btn' onClick={() => setFeedsOpen(!feedsOpen)}>
                    <p>CUSTOM FEEDS</p>
                    <div className={`open-close ${feedsOpen ? 'open' : ''}`}></div>
                </div>
                <div className={`dropdown-menu ${feedsOpen ? 'open' : ''}`}>
                    <div className='bar-btn'>
                        <img className='icon-nav' src={New} alt='Create a custom feed'/>
                        <p>Create a custom feed</p>
                    </div>
                    <div className='bar-btn star-btn'>
                        <img className='icon-nav' src={Home} alt='Home'/>
                        <p>Home</p>
                    </div>
                </div>
            </div>
            <div className='recent-bar'>
                <div className='bar-btn topic-btn' onClick={() => setRecentOpen(!recentOpen)}>
                    <p>RECENT</p>
                    <div className={`open-close ${recentOpen ? 'open' : ''}`}></div>
                </div>
                <div className={`dropdown-menu ${recentOpen ? 'open' : ''}`}>
                    <div className='bar-btn'>
                        <img className='icon-nav' src={New} alt='Create a custom feed'/>
                        <p>Create a custom feed</p>
                    </div>
                </div>
            </div>
            <div className='communities-bar'>
                <div className='bar-btn topic-btn' onClick={() => setCommunitiesOpen(!communitiesOpen)}>
                    <p>COMMUNITIES</p>
                    <div className={`open-close ${communitiesOpen ? 'open' : ''}`}></div>
                </div>
                <div className={`dropdown-menu ${communitiesOpen ? 'open' : ''}`}>
                    <div className='bar-btn'>
                        <img className='icon-nav' src={New} alt='Create a custom feed'/>
                        <p>Create a community</p>
                    </div>
                </div>
            </div>
            <div className='resource-bar'>
                <div className='bar-btn topic-btn' onClick={() => setResourcesOpen(!resourcesOpen)}>
                    <p>RESOURCES</p>
                    <div className={`open-close ${resourcesOpen ? 'open' : ''}`}></div>
                </div>
                <div className={`dropdown-menu ${resourcesOpen ? 'open' : ''}`}>
                    <div className='resource-part-1'>
                        <div className='bar-btn'>
                            <img className='icon-nav' src={About} alt='About Reddit'/>
                            <p>About Reddit</p>
                        </div>
                        <div className='bar-btn'>
                            <img className='icon-nav' src={Ads} alt='Advertise'/>
                            <p>Advertise</p>
                        </div>
                        <div className='bar-btn'>
                            <img className='icon-nav' src={Help} alt='Help'/>
                            <p>Help</p>
                        </div>
                        <div className='bar-btn'>
                            <img className='icon-nav' src={Blog} alt='Blog'/>
                            <p>Blog</p>
                        </div>
                        <div className='bar-btn'>
                            <img className='icon-nav' src={Career} alt='Careers'/>
                            <p>Careers</p>
                        </div>
                        <div className='bar-btn'>
                            <img className='icon-nav' src={Press} alt='Press'/>
                            <p>Press</p>
                        </div>
                    </div>
                    <div className='resource-part-2'>
                        <div className='bar-btn'>
                            <img className='icon-nav' src={Communities} alt='Communities'/>
                            <p>Communities</p>
                        </div>
                        <div className='bar-btn'>
                            <img className='icon-nav' src={BestOfReddit} alt='Best of Reddit'/>
                            <p>Best of Reddit</p>
                        </div>
                        <div className='bar-btn'>
                            <img className='icon-nav' src={Topics} alt='Topics'/>
                            <p>Topics</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default LeftSideBar