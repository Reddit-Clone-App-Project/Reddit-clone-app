import React, { useState } from 'react';
import he from 'he';

const SafeImage = ({ src, fallback = '/mock_images/reddit-4.svg', alt = '', ...props }) => {
  const [hasError, setHasError] = useState(false);

  const decodedSrc = src ? he.decode(src) : '';
  const isValid = decodedSrc.startsWith('http');
  const finalSrc = !hasError && isValid ? decodedSrc : fallback;

  if ((!src || !isValid) && !fallback) return null;
  if (hasError && !fallback) return null;

  return (
    <img
      src={finalSrc}
      alt={alt}
      onError={() => setHasError(true)}
      {...props}
    />
  );
};

export default SafeImage;
