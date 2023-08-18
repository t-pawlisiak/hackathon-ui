import React, { useContext } from 'react';
import { ConfigContext } from './ConfigProvider';
import ResultsTable from './ResultsTable';


export const TableView: React.FC = () => {
  const { response } = useContext(ConfigContext);

  if (!response.length) {
    return <video src="../assets/Greeting.mp4" autoPlay loop muted controls style={{ width: '100%', height: 'auto' }} />;
  }

// if (response.promptSent) {
//   return <video src="" autoPlay />;
// }

  return (
    <ResultsTable/>
  );
};