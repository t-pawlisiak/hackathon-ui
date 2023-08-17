import React, { useContext } from 'react';
import './App.css';
import OrganizationSearch from './components/OrganizationSearch';
import PromptInput from './components/PromptInput';
import { ConfigContext, ConfigProvider } from './components/ConfigProvider';
import { WorkspaceSearch } from './components/WorkspaceSearch';

function App() {
  const { workspaceId } = useContext(ConfigContext);

  return (
    <ConfigProvider>
      <OrganizationSearch />
      <WorkspaceSearch />
      <PromptInput />
    </ConfigProvider>
  );
}

export default App;
