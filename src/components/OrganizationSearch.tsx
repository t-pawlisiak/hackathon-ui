import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete, TextField, FormControl } from '@mui/material';
import { ConfigContext } from './ConfigProvider';

interface Organization {
  id: string;
  name: string;
}

export const OrganizationSearch: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Organization[]>([]);
  const { organizationId, setOrganizationId, loading, setInteraction } = useContext(ConfigContext);

  useEffect(() => {
    if (organizationId.length >= 3) {
      (async () => {
        try {
          const response = await fetch('http://Sawomirs-MacBook-Pro.local:3000/suggestions/organizations', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: organizationId }),
            mode: 'cors',
          });

          if (response.ok) {
            const matchingOrganizations = await response.json();
            setSuggestions(matchingOrganizations);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      setSuggestions([]);
    }
  }, [organizationId]);

  return (
    <FormControl fullWidth>
      <Autocomplete
        size="small"
        freeSolo
        filterOptions={(x) => x}
        options={suggestions.map((org) => org.id)}
        value={organizationId}
        onFocus={() => setInteraction(true)}
        disabled={loading}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            setOrganizationId(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            type="text"
            label="Enter organization ID"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            disabled={loading}
          />
        )}
      />
    </FormControl>
  );
};
