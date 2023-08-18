import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "./ConfigProvider";
import { Autocomplete, TextField, FormControl } from '@mui/material';

interface Workspace {
  id: string;
  name: string;
}

export const mockIds = (inputValue: string) => {
  const chars = inputValue.slice(0, 6);
  const organizations = [];
  const suffixLength = 6 - chars.length;

  for (let i = 0; i < 10; i++) {
    const randomSuffix = (Math.random().toString().substr(2, suffixLength));
    organizations.push({
      id: chars + randomSuffix,
      name: `Organization ${i}`,
    });
  }

  return organizations;
};

export const WorkspaceSearch: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Workspace[]>([]);
  const { workspaceId, setWorkspaceId } = useContext(ConfigContext);

  useEffect(() => {
    if (workspaceId.length >= 3) {
      const matchingWorkspaces = mockIds(workspaceId);
      setSuggestions(matchingWorkspaces);
    } else {
      setSuggestions([]);
    }
  }, [workspaceId]);

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
            type="text"
            label="Enter workspace ID"
            value={workspaceId}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length === 6 || value.length === 0) {
                setWorkspaceId(value);
              }
            }}
          />
        )}
      />
    </FormControl>
  );
};
