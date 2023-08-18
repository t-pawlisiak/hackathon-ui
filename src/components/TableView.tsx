import React, { useContext, useEffect } from 'react';
import { ConfigContext } from './ConfigProvider';
import ResultsTable from './ResultsTable';
import requestVideo from '../assets/Request_in_progress.mp4';
import greetingVideo from '../assets/Greeting.mp4';

export const TableView: React.FC = () => {
  const { response, loading, interaction } = useContext(ConfigContext);

  useEffect(() => {
    const play = async () => {
      if (loading || interaction) {
        const video = document.getElementById("myVideo") as HTMLVideoElement;
        await video.querySelector('source')!.setAttribute('src', loading ? requestVideo : greetingVideo);
        video.load();
        video.play();
      }
    };

    play();
  }, [loading, interaction]);

  return (
    !response.length || loading || interaction ? (
      <video
        style={{ width: '100%', height: 'auto' }}
        id="myVideo"
      >
        <source
          src={!loading ? greetingVideo : requestVideo}
          type="video/mp4"
        />
      </video>
    ) :
    <ResultsTable/>
  );
};
