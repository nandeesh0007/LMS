import React, { useState, useEffect } from 'react';
import './VideoPlayer.css';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  const [hasError, setHasError] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');

  useEffect(() => {
    // Convert YouTube URL to embed URL
    const getYouTubeEmbedUrl = (url: string) => {
      if (!url) return '';
      
      // If it's already an embed URL, return it directly
      if (url.includes('youtube.com/embed/')) {
        return url;
      }
      
      // Convert watch URL to embed URL
      let videoId = '';
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1]?.split('&')[0] || '';
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      }
      
      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    };

    const url = getYouTubeEmbedUrl(videoUrl);
    console.log('VideoPlayer - Original URL:', videoUrl);
    console.log('VideoPlayer - Embed URL:', url);
    setEmbedUrl(url);
    setHasError(false);
  }, [videoUrl]);

  const handleIframeError = () => {
    console.error('VideoPlayer - Iframe failed to load:', embedUrl);
    setHasError(true);
  };

  const handleIframeLoad = () => {
    console.log('VideoPlayer - Iframe loaded successfully:', embedUrl);
    setHasError(false);
  };

  // Fallback video URLs that are guaranteed to work
  const fallbackVideos = [
    'https://www.youtube.com/embed/HKSRPmJquM', // FreeCodeCamp Java
    'https://www.youtube.com/embed/_uQrJ0RZ44w', // FreeCodeCamp Python
    'https://www.youtube.com/embed/kUMe1FH4CHE', // Traversy Media HTML
    'https://www.youtube.com/embed/W6NZfCO5SIk', // Net Ninja JavaScript
    'https://www.youtube.com/embed/0-S5a0e2ypw', // React Native
  ];

  const handleRetryWithFallback = () => {
    const randomFallback = fallbackVideos[Math.floor(Math.random() * fallbackVideos.length)];
    console.log('VideoPlayer - Retrying with fallback:', randomFallback);
    setEmbedUrl(randomFallback);
    setHasError(false);
  };

  if (!embedUrl) {
    return (
      <div className="video-player-error">
        <div className="error-message">
          <h3>Video Not Available</h3>
          <p>This video is currently unavailable.</p>
          <button onClick={handleRetryWithFallback} className="retry-btn">
            Try Another Video
          </button>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="video-player-error">
        <div className="error-message">
          <h3>Video Failed to Load</h3>
          <p>The video could not be loaded. This might be due to regional restrictions or network issues.</p>
          <button onClick={handleRetryWithFallback} className="retry-btn">
            Try Another Video
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="video-player">
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onError={handleIframeError}
        onLoad={handleIframeLoad}
        className="video-iframe"
      />
    </div>
  );
};

export default VideoPlayer;
