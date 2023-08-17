import React, { useState } from 'react';

interface Organization {
  id: string;
  name: string;
}

const mockOrganizations = (string: string) => {
    const chars = string.slice(0, 12);
    const organizations = [];

    for (let i = 0; i < 10; i++) {
        organizations.push({
            id: chars + Math.random() * (12 - chars.length),
            name: `Organization ${i}`,
        });
    }

    console.log(organizations);

    return organizations;
}

const OrganizationSearch: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<Organization[]>([]);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchText(inputValue);

    if (inputValue.length >= 3) {
    //   try {
        // const response = await fetch(`/api/organizations?query=${inputValue}`);
        // if (response.ok) {
          const matchingOrganizations = mockOrganizations(inputValue); //await response.json();
          setSuggestions(matchingOrganizations);
        // } else {
        //   console.error('Failed to fetch organizations');
        // }
    //   } catch (error) {
    //     console.error('Error fetching organizations', error);
    //   }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter organization ID"
        value={searchText}
        onChange={handleSearchChange}
      />
      <ul>
        {suggestions.map(org => (
          <li key={org.id}>{org.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationSearch;
