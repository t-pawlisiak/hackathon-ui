import { useContext, useState } from "react";
import { ConfigContext } from "./ConfigProvider";
import { Autocomplete, TextField, FormControl } from '@mui/material';
import { mockIds } from "./OrganizationSearch";

interface Workspace {
  id: string;
  name: string;
}

const WorkspaceSearchComponent: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<Workspace[]>([]);
  const { setWorkspaceId } = useContext(ConfigContext);

  const handleSearchChange = async (event: React.ChangeEvent<{}>, newValue: string | null) => {
    if (newValue?.length === 6) {
      setWorkspaceId(newValue);
    } else {
      setWorkspaceId('');
    }

    if (newValue) {
      setSearchText(newValue);

      if (newValue.length >= 3) {
        const matchingOrganizations = mockIds(newValue); ;
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
        options={suggestions.map((org) => org.id)}
        value={searchText}
        onChange={handleSearchChange}
        renderInput={(params) => (
          <TextField
            {...params}
            type="text"
            label="Enter workspace ID"
            value={searchText}
            onChange={(e) => handleSearchChange(e, e.target.value)}
          />
        )}
      />
    </FormControl>
  );
}

export const WorkspaceSearch = () =>  {
  const { organizationId } = useContext(ConfigContext);

  if (organizationId) {
    return <WorkspaceSearchComponent />;
  }

  return null;
}