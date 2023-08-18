import React, { useContext } from 'react';
import { ConfigContext } from './ConfigProvider';


export const TableView: React.FC = () => {
  const { response} = useContext(ConfigContext);

  if (true) {
    return <video src="../assets/Greeting.mp4" autoPlay loop muted controls style={{ width: '100%', height: 'auto' }} />;
  }

  // if (response.promptSent) {
  //   return <video src="" autoPlay />;
  // }

  return <div className="table">Your table content here...</div>;
};