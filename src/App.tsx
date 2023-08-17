import React, { useContext } from 'react';
import './App.css';
import OrganizationSearch from './components/OrganizationSearch';
import PromptInput from './components/PromptInput';
import { ConfigContext, ConfigProvider } from './components/ConfigProvider';
import { WorkspaceSearch } from './components/WorkspaceSearch';
import IndustrySelect from './components/IndustrySelect';

function App() {
  const { workspaceId } = useContext(ConfigContext);

  return (
    <ConfigProvider>
      <div className="wrapper">
        <OrganizationSearch />
        {workspaceId ? <WorkspaceSearch /> : null}
        <IndustrySelect/>
        <PromptInput />
      </div>
    </ConfigProvider>
  );
}

export default App;
