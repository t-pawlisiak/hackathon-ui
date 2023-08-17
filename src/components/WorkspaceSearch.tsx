import { useContext, useState } from "react";
import { ConfigContext } from "./ConfigProvider";
import { Autocomplete, TextField, FormControl } from '@mui/material';
import { mockIds } from "./OrganizationSearch";

interface Workspace {
  id: string;
  name: string;
}

export const WorkspaceSearch: React.FC = () => {
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
    <FormControl fullWidth>
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
