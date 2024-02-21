// Videocomponent
import React, { useCallback } from 'react';
import { useMedia } from 'react-chromecast';

const mediaSrc = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"

function Video() {
    const media = useMedia()
    const playVideo = useCallback(async () => {
    if (media) {
        console.log(media)
      await media.playMedia(mediaSrc);
    }
  }, [media]);
  
  return (
    <>
        <button onClick={playVideo}>Play</button>
    </>
  )
}

export default Video;