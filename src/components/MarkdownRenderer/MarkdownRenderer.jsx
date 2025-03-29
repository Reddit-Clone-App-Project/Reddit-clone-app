import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link as RouterLink } from 'react-router-dom';
import he from 'he';

const transformMarkdown = (text) => {
  if (!text || typeof text !== 'string') return '';

  const decoded = he.decode(text);
  const withSpoilers = decoded.replace(/>!(.*?)!</g, '<span class="spoiler">$1</span>');
  const withSubreddits = withSpoilers.replace(
    /(^|\s)r\/([a-zA-Z0-9_]+)\b/g,
    (_, space, sub) => `${space}[r/${sub}](/r/${sub})`
  );
  const withUsers = withSubreddits.replace(
    /(^|\s)u\/([a-zA-Z0-9_-]+)\b/g,
    (_, space, user) => `${space}[u/${user}](https://www.reddit.com/u/${user})`
  );

  return withUsers;
};

const MarkdownRenderer = ({ content }) => {
  const finalText = transformMarkdown(content);

  return (
    <ReactMarkdown
      components={{
        a: ({ href, children, ...props }) => {
          if (href.startsWith('/r/')) {
            return (
              <RouterLink to={href} {...props} style={{ color: 'inherit', textDecoration: 'underline' }}>
                {children}
              </RouterLink>
            );
          }

          return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          );
        },
        span: ({ className, children }) =>
          className === 'spoiler' ? (
            <span
              style={{
                backgroundColor: '#333',
                color: '#333',
                borderRadius: '3px',
                padding: '2px 4px',
                cursor: 'pointer'
              }}
              title="Spoiler"
              onMouseEnter={(e) => (e.target.style.color = '#fff')}
              onMouseLeave={(e) => (e.target.style.color = '#333')}
            >
              {children}
            </span>
          ) : (
            <span>{children}</span>
          )
      }}
    >
      {finalText}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
