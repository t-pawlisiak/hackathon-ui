import React, { useContext } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { ConfigContext } from './ConfigProvider';

export const IndustrySelect: React.FC = () => {
  const { industry, setIndustry, loading, interaction, setInteraction } = useContext(ConfigContext);

  const organizationIndustries = [
    { label: 'Arts', value: 'Arts' },
    { label: 'Automotive', value: 'Automotive' },
    { label: 'Constructions & Engineering', value: 'Constructions & Engineering' },
    { label: 'Consulting', value: 'Consulting' },
    { label: 'Consumer Goods', value: 'Consumer Goods' },
    { label: 'Education', value: 'Education' },
    { label: 'Energy', value: 'Energy' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Fintech', value: 'Fintech' },
    { label: 'Food & Beverages', value: 'Food & Beverages' },
    { label: 'Government', value: 'Government' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'Human Resources', value: 'Human Resources' },
    { label: 'Insurance', value: 'Insurance' },
    { label: 'IT', value: 'IT' },
    { label: 'Logistics', value: 'Logistics' },
    { label: 'Manufacturing', value: 'Manufacturing' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Media', value: 'Media' },
    { label: 'NGO', value: 'NGO' },
    { label: 'Professional Services', value: 'Professional Services' },
    { label: 'Real Estate', value: 'Real Estate' },
    { label: 'Restaurants', value: 'Restaurants' },
    { label: 'Retail', value: 'Retail' },
    { label: 'Software', value: 'Software' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Telecom', value: 'Telecom' },
    { label: 'Travel & Leisure', value: 'Travel & Leisure' },
    { label: 'Other', value: 'Other' }
  ];

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="industry-select-label">Select an industry...</InputLabel>
      <Select
        labelId="industry-select-label"
        label="Select an industry..."
        value={industry}
        disabled={loading}
        onChange={(e) => { setIndustry(e.target.value as string); }}
        onFocus={() => !interaction ? setInteraction(true) : () => {}}
      >
        {organizationIndustries.map((industryOption) => (
          <MenuItem key={industryOption.value} value={industryOption.value}>
            {industryOption.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
