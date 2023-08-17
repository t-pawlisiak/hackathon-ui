import React, { useState } from 'react';
import { Autocomplete, TextField, FormControl } from '@mui/material';

interface Organization {
  id: string;
  name: string;
}

const mockOrganizations = (inputValue: string) => {
  const chars = inputValue.slice(0, 6);  // Get the first 6 characters
  const organizations = [];
  const suffixLength = 6 - chars.length;

  for (let i = 0; i < 10; i++) {
    const randomSuffix = (Math.random().toString().substr(2, suffixLength));
    organizations.push({
      id: chars + randomSuffix,
      name: `Organization ${i}`,
    });
  }
  console.log(organizations);
  return organizations;
};

const OrganizationSearch: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<Organization[]>([]);

  const handleSearchChange = async (event: React.ChangeEvent<{}>, newValue: string | null) => {
    if (newValue) {
      setSearchText(newValue);

      if (newValue.length >= 3) {
        const matchingOrganizations = mockOrganizations(newValue); //await response.json();
        setSuggestions(matchingOrganizations);
      } else {
        setSuggestions([]);
      }
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <Autocomplete
        size="small"
        freeSolo
        filterOptions={(x) => x}
        options={suggestions.map((org) => org.name)}
        value={searchText}
        onChange={handleSearchChange}
        renderInput={(params) => (
          <TextField
            {...params}
            type="text"
            label="Enter organization ID"
            value={searchText}
            onChange={(e) => handleSearchChange(e, e.target.value)}
          />
        )}
      />
    </FormControl>
  );
};

export default OrganizationSearch;
