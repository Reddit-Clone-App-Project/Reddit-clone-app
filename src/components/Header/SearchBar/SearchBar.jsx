// ! Delete clearPosts and fetchHotPosts
import React, { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import Search from "../../../assets/images/header/search.svg";
import SearchNight from "../../../assets/images/header/search-night.svg";
import SubredditsDefault from "../../../assets/images/general/subreddit_default_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { selectNightMode } from "../../../redux/slices/nightModeSlice";
import {
  clearResults,
  fetchSubreddits,
  selectIsLoading,
  selectQuery,
  selectSubreddits,
  setQuery,
} from "../../../redux/slices/subredditsSlice";
// import { clearPosts, fetchHotPosts } from "../../../redux/slices/hotPostsSlice";
 import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const nightModeState = useSelector(selectNightMode);
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const subreddits = useSelector(selectSubreddits);
  const isLoading = useSelector(selectIsLoading);
  const trendings = useSelector((state) => state.hotPosts.trendings);
  const dropdownRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length === 0) {
      dispatch(clearResults());
      // dispatch(fetchHotPosts(6));
      return;
    }
    // dispatch(clearPosts());
    dispatch(fetchSubreddits(query));
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(clearResults());
        // dispatch(clearPosts());
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <div className={`middle-header ${nightModeState ? 'night' : ''}`}>
      <div className="search-bar">
        <img src={nightModeState ? SearchNight : Search} alt="Search" />
        <input
          type="text"
          placeholder="Search Reddit..."
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          className="search-input"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {/* Drop down */}
      {isFocused && (
        <div ref={dropdownRef} className="dropdown custom-scroll">
          {isLoading ? (
            <div className="dropdown-item">Loading...</div>
          ) : (
            <div>
              {subreddits.length > 0 ? (
                <h5>Communities</h5>
              ) : (
                <div>
                  <h5>TRENDING TODAY</h5>
                </div>
              )}
              {subreddits.length > 0 &&
                subreddits.map((subreddit) => (
                  <div className="dropdown-item">
                    <img
                      src={
                        subreddit.icon_img
                          ? subreddit.icon_img
                          : SubredditsDefault
                      }
                      alt="icon"
                    />
                    <a
                      key={subreddit.id}
                      href={`https://www.reddit.com/r/${subreddit.display_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>r/{subreddit.display_name}</strong>
                    </a>
                  </div>
                ))}
              {(trendings && subreddits.length == 0) &&
                trendings.slice(0, 6).map((trending) => (
                  <div key={trending.id} className="trending-item">
                    <div className="trending-item-left">
                      <p>
                        <strong>{trending.title}</strong>
                      </p>
                      <p>{trending.selftext}</p>
                      <p>r/{trending.subreddit}</p>
                    </div>
                    {trending.thumbnail && trending.thumbnail !== "self" && (
                      <img
                        src={trending.thumbnail}
                        alt=""
                        className="trending-item-right"
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
