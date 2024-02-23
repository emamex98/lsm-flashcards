import { useRef, useEffect } from 'react';

const Video = ({ source }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      let playback = 0;

      video.onended = () => {
        playback = playback + 1;
        if (playback != 3) {
          video.play();
        }
      };

      video.play();
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src={source}
        controls
        muted
        height={'400px'}
      ></video>
    </>
  );
};

export default Video;
