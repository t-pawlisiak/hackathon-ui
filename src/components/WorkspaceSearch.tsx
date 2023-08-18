import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "./ConfigProvider";
import { Autocomplete, TextField, FormControl } from '@mui/material';

interface Workspace {
  id: string;
  name: string;
}

export const WorkspaceSearch: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Workspace[]>([]);
  const { workspaceId, setWorkspaceId, organizationId } = useContext(ConfigContext);

  useEffect(() => {
    if (workspaceId) {
      (async () => {
        try {
          const response = await fetch('http://Sawomirs-MacBook-Pro.local:3000/suggestions/workspaces', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: "feed", organization_id: organizationId }),
            mode: 'cors',
          });

          if (response.ok) {
            const matchingWorkspaces = await response.json();
            setSuggestions(matchingWorkspaces);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      setSuggestions([]);
    }
  }, [workspaceId, organizationId]);

  useEffect(() => {
    if (organizationId.length < 5) {
      setWorkspaceId('');
    }
  }, [organizationId]);

  return (
    <FormControl fullWidth>
      <Autocomplete
        size="small"
        freeSolo
        filterOptions={(x) => x}
        options={suggestions.map((ws) => ws.id)}
        value={workspaceId}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            setWorkspaceId(newValue);
          }
        }}
        renderInput={(params) => (
        <TextField
          {...params}
          disabled={organizationId.length < 5}
          type="text"
          label="Enter workspace ID"
          value={workspaceId}
          onChange={(e) => { setWorkspaceId(e.target.value);}}
          onKeyDown={(e) => {
            if (organizationId.length < 5) {
              e.preventDefault();
            }
          }}
        />
        )}
      />
    </FormControl>
  );
};
