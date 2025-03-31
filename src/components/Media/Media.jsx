import React from "react";
import styles from "./Media.module.css";

const PostMedia = ({ post }) => {
    const isImage = (post) => {
        return post.post_hint === "image" || /\.(jpg|jpeg|png|gif|webp)$/i.test(post.url);
    };

    const isRedditVideo = post.post_hint === "hosted:video" && 
                        post.media?.reddit_video?.fallback_url;

    const isYouTubeVideo = post.post_hint === "rich:video" &&
                         post.media?.oembed?.provider_name === "YouTube" &&
                         post.media?.oembed?.html;

    const isExternalLink = post.post_hint === "link" && !isImage && !isYouTubeVideo;

    if (isImage && post.url) {
        return (
          <img
            className={styles.media}
            src={post.url}
            alt={post.title}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        );
      }

    if (isRedditVideo) {
        return (
            <video controls style={{ maxWidth:"100%", borderRadius: '0.5em' }}>
            <source src={post.media.reddit_video.fallback_url} type="video/mp4" className={styles.media}/>
            Il tuo browser non supporta il video.
            </video>
        );
    }

    if (isYouTubeVideo) {
        const html = post.media.oembed.html;
        const match = html.match(/src="([^"]+)"/);
        const src = match ? match[1] : null;
    
        if (src) {
          return (
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={src}
                title={post.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '0.5em',
                }}
              />
            </div>
          );
        }
      }

      if (isExternalLink) {
        return (
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.625em',
              background: '#f0f0f0',
              borderRadius: '0.5em',
              textDecoration: 'none',
              color: '#333'
            }}
          >
            {post.url}
          </a>
        );
      }
    

    return null;
};

export default PostMedia;