import React from 'react';
import ReactPlayer from 'react-player';

export const PlayerResponsive = (props) => {
  const { videoUrl, height, width } = props;

  return (
    <div className="player-wrapper">
      <ReactPlayer
        playing
        className="react-player"
        url={videoUrl}
        width={width || '100%'}
        height={height || '100%'}
        controls={true}
        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
};
