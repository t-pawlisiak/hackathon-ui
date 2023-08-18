import React, { useContext, useEffect } from 'react';
import { ConfigContext } from './ConfigProvider';
import ResultsTable from './ResultsTable';
import video from '../assets/Greeting.mp4'


export const TableView: React.FC = () => {
  const { response, loading } = useContext(ConfigContext);

  useEffect(() => {
    if (loading) {
      const video = document.getElementById("myVideo") as HTMLVideoElement;
      video.play();
    }
  }, [loading]);

  return (
    !response.length || loading ? (
      <video
        style={{ width: '100%', height: 'auto' }}
        id="myVideo"
      >
        <source
          src={video}
          type="video/mp4"
        />
      </video>
    ) :
    <ResultsTable/>
  );
};