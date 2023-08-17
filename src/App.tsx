import React from 'react';
import './App.css';
import OrganizationSearch from './components/OrganizationSearch';
import PromptInput from './components/PromptInput';
import { ConfigProvider } from './components/DataProvider';

function App() {
  return (
    <ConfigProvider>
      <OrganizationSearch />
      <PromptInput />
    </ConfigProvider>
  );
}

export default App;
