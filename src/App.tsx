import React from 'react';
import './App.css';
import OrganizationSearch from './components/OrganizationSearch';
import PromptInput from './components/PromptInput';

function App() {
  return (
    <div className="App">
      <h1>Organization Search</h1>
      <OrganizationSearch />
      <PromptInput />
    </div>
  );
}

export default App;
