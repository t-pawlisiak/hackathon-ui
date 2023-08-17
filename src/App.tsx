import React, { useContext } from 'react';
import './App.css';
import OrganizationSearch from './components/OrganizationSearch';
import PromptInput from './components/PromptInput';
import { ConfigProvider } from './components/ConfigProvider';
import { WorkspaceSearch } from './components/WorkspaceSearch';
import IndustrySelect from './components/IndustrySelect';

function App() {
  return (
    <ConfigProvider>
      <div className="wrapper">
        <OrganizationSearch />
        <WorkspaceSearch />
        <IndustrySelect/>
        <PromptInput />
      </div>
    </ConfigProvider>
  );
}

export default App;
