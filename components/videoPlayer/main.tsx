'use client'

import React, { useEffect } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

interface PlyrVideoComponentProps {
  videoId: string;
  onProgress?: (progress: number) => void; // progress: 0-1 (fraction)
  onEnded?: () => void;
}

const PlyrVideoComponent = ({ videoId, onProgress, onEnded }: PlyrVideoComponentProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const player = new Plyr('#player', {
        controls: [
          'play', 'pause','airplay', 'rewind', 'duration', 'fast-forward', 'volume', 'captions', 'current-time', 'play-large', 'fullscreen', 'restart'
        ],
        settings: [],
        fullscreen: { enabled: true, fallback: true,  },
      });

      // Attach event listeners for progress and ended
      const handleProgress = (event: any) => {
        if (player.duration > 0) {
          const progress = player.currentTime / player.duration;
          onProgress?.(progress);
        }
      };

      const handleEnded = () => {
        onEnded?.();
      };

      player.on('progress', handleProgress);
      player.on('ended', handleEnded);

      const hideYouTubeButtons = () => {
        const style = document.createElement('style');
        style.innerHTML = `
          #player iframe {
            pointer-events: none;
          }
          #player iframe::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 9999;
            pointer-events: auto;
          }
          .ytp-button.ytp-share-button,
          .ytp-button.ytp-watch-later-button,
          .ytp-button.ytp-copylink-button,
          .ytp-button.ytp-search-button,
          .ytp-button.ytp-cards-button,
          .ytp-button.ytp-overflow-button {
            display: none !important;
          }
        `;
        document.head.appendChild(style);
      };

      hideYouTubeButtons();

      return () => {
        // Clean up event listeners
        player.off('progress', handleProgress);
        player.off('ended', handleEnded);
        player.destroy();
        const style = document.querySelector('style');
        if (style) {
          document.head.removeChild(style);
        }
      };
    }
  }, [videoId, onProgress, onEnded]);

  return (
    <div className="plyr__video-embed" style={{ width: '1200px', height: '600px', position: 'relative' }} id="player">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0&disablekb=1&playsinline=1&cc_load_policy=0&cc_lang_pref=auto&modestbranding=1&showinfo=0&iv_load_policy=3&rel=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ width: '100%', height: '100%' }}
      ></iframe>
    </div>
  );
};

export default PlyrVideoComponent;