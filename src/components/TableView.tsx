import React, { useContext, useEffect } from 'react';
import { ConfigContext } from './ConfigProvider';
import ResultsTable from './ResultsTable';
import requestVideo from '../assets/Request_in_progress.mp4';
import greetingVideo from '../assets/Greeting.mp4';

export const TableView: React.FC = () => {
  const { response, loading, interaction } = useContext(ConfigContext);

  useEffect(() => {
    if (loading || interaction) {
      const video = document.getElementById("myVideo") as HTMLVideoElement;
      video.play();
    }
  }, [loading, interaction]);

  const videoSource = interaction ? greetingVideo : requestVideo;

  return (
    !response.length || loading || interaction ? (
      <video
        style={{ width: '100%', height: 'auto' }}
        id="myVideo"
      >
        <source
          src={videoSource}
          type="video/mp4"
        />
      </video>
    ) :
    <ResultsTable/>
  );
};
