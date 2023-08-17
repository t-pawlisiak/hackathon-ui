import React from 'react';
import './App.css';
import OrganizationSearch from './components/OrganizationSearch';
import IndustrySelect from './components/IndustrySelect';

function App() {
  return (
    <div className="App">
      <h1>Organization Search</h1>
      <OrganizationSearch />
      <h1>Industry</h1>
      <IndustrySelect />
    </div>
  );
}

export default App;
