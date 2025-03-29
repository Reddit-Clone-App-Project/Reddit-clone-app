import React, { useState } from "react";
import styles from './Comment.module.css';
import EmptyArrowUp from "../../assets/images/post/empty-up.svg?url";
import EmptyArrowDown from "../../assets/images/post/empty-down.svg?url";
import EmptyArrowUpDark from "../../assets/images/post/dark/empty-up-dark.svg?url";
import EmptyArrowDownDark from "../../assets/images/post/dark/empty-down-dark.svg?url";
import OrangeArrowUp from "../../assets/images/post/orange-up.svg?url";
import OrangeArrowDown from "../../assets/images/post/orange-down.svg?url";
import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { selectNightMode } from "../../redux/slices/nightModeSlice";


function timeSinceDate(dateString) {
    const pastDate = new Date(dateString * 1000);
    const currentDate = new Date();
    const diffInMs = currentDate - pastDate;
    const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
    
    if (diffInHours >= 24) {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} days ago`;
    }
    return `${diffInHours} h ago`.replace(".00", "");
};

const Comment = ({ comment }) => {
    const nightMode = useSelector(selectNightMode);
    const [vote, setVote] = useState(null);
    const [numVotes, setNumVotes] = useState(comment.score);

    const handleVote = (direction) => {
        if (direction === vote) {
            setVote(null)
            setNumVotes(prev => direction === 'up' ? prev - 1 : prev + 1)
        } else {
            let change = 0;

            if (vote === null) {
                change = direction === 'up' ? 1 : -1;
                } else if (vote === 'up' && direction === 'down') {
                change = -2;
                } else if (vote === 'down' && direction === 'up') {
                change = 2;
                };
            
            setVote(direction);
            setNumVotes(prev => prev + change);
        };
    };

    const renderCommentBody = (text) => {
        if (!text) return null;
    
        const decodeHtml = (html) => {
            const txt = document.createElement('textarea');
            txt.innerHTML = html;
            return txt.value;
        };
    
        const cleanedText = text.replace(/\b(jpg|jpeg|png|webp|gif)\s*\?[^ \n]+/gi, match => '<<<IMG_FRAGMENT:' + match + '>>>');
    
        const imageRegex = /https?:\/\/[^\s)]+?\.(jpg|jpeg|png|webp|gif)(\?[^\s)]*)?|https?:\/\/preview\.redd\.it\/[^\s)]+|!\[gif\]\((giphy\|[^)]+)\)/gi;
        const parts = cleanedText.split(imageRegex).filter(p => p !== undefined && p !== null);
    
        let previewBase = null;
    
        return parts.map((part, i) => {
            const decodedPart = decodeHtml(part).trim();
    
            if (/^https?:\/\/[^\s)]+?\.(jpg|jpeg|png|webp|gif)(\?[^\s)]*)?$/i.test(decodedPart)) {
                return (
                    <img
                        key={i}
                        src={decodedPart}
                        alt="img"
                        className={styles.commentImg}
                    />
                );
            }
    
            if (/^https?:\/\/preview\.redd\.it\/[^\s.]+$/i.test(decodedPart)) {
                previewBase = decodedPart;
                return null;
            }
    
            const fragMatch = decodedPart.match(/^<<<IMG_FRAGMENT:(jpg|jpeg|png|webp|gif)\s*\?([^\s>]+)>>$/i);
            if (fragMatch && previewBase) {
                const ext = fragMatch[1];
                const query = fragMatch[2];
                const fullUrl = `${previewBase}.${ext}?${query}`;
                previewBase = null;
    
                return (
                    <img
                        key={i}
                        src={fullUrl}
                        alt="img"
                        className={styles.commentImg}
                    />
                );
            }
    
            const giphyMatch = decodedPart.match(/^giphy\|([a-zA-Z0-9]+)(?:\|([a-zA-Z0-9]+))?$/i);
            if (giphyMatch) {
                const gifId = giphyMatch[1];
                const variant = giphyMatch[2] || 'giphy';
                const giphyUrl = `https://media.giphy.com/media/${gifId}/${variant}.gif`;

                return (
                    <img
                        key={i}
                        src={giphyUrl}
                        alt="gif"
                        className={styles.commentImg}
                    />
                );
            }

            if (/^(jpg|jpeg|png|webp|gif)\s*\?/i.test(decodedPart)) {
                return null;
            }
    
            return decodedPart.length > 0 ? <span key={i}>{decodedPart} </span> : null;
        });
    };
    
    
    
    return (
        <>
            <hr className={styles.hrComment}/>
            <div className={`${styles.commentList} ${nightMode ? styles.dark : ''}`}>
                <div className={styles.topComment}>
                    <img className={styles.avatar} src={`https://api.dicebear.com/6.x/personas/svg?seed=${comment.author}`} style={{width: '30px'}}/>
                    <p>{comment.author} · </p>
                    <p className={styles.date}>{timeSinceDate(comment.created_utc)}</p>
                </div>
                <p className={styles.content}>{renderCommentBody(comment.body)}</p>
                <div className={styles.bottom}>
                    <img className={styles.arrow} src={vote === 'up' ? OrangeArrowUp : (nightMode ? EmptyArrowUpDark : EmptyArrowUp)} onClick={() => handleVote('up')} alt="arrow"/>
                    <p>{numVotes}</p>
                    <img className={styles.arrow} src={vote === 'down' ? OrangeArrowDown : (nightMode ? EmptyArrowDownDark : EmptyArrowDown)} onClick={() => handleVote('down')} alt="arrow"/>
                </div>
            </div>
        </>
    );
};

export default Comment;