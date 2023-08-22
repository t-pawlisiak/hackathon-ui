import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "./ConfigProvider";
import { Autocomplete, TextField, FormControl } from '@mui/material';

interface Workspace {
  id: string;
  name: string;
}

export const WorkspaceSearch: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Workspace[]>([]);
  const { workspaceId, setWorkspaceId, organizationId, loading } = useContext(ConfigContext);

  const fetchWorkspaces = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/suggestions/workspaces`, {
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
  }

  useEffect(() => {
    if (organizationId.length < 5) {
      setWorkspaceId('');
    }
  }, [organizationId]);

  const changeHandler = (value: string) => {
    const start = value.indexOf('(');
    const end = value.indexOf(')');
    let id = '';

    if (start !== -1 && end !== -1 && start < end) {
      id = value.substring(start + 1, end);
    }

    setWorkspaceId(id);
  }

  return (
    <FormControl fullWidth>
      <Autocomplete
        size="small"
        freeSolo
        filterOptions={(x) => x}
        options={suggestions.map((ws) => `${ws.name} (${ws.id})`)}
        value={workspaceId}
        disabled={organizationId.length < 5 || loading}
        onChange={(event, newValue) => changeHandler(newValue || '')}
        onFocus={fetchWorkspaces}
        renderInput={(params) => (
        <TextField
          {...params}
          disabled={organizationId.length < 5 || loading}
          type="text"
          label="Enter workspace ID"
          value={workspaceId}
          onChange={(e) => { setWorkspaceId(e.target.value);}}
        />
        )}
      />
    </FormControl>
  );
};
