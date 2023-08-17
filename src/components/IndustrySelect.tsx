import React, { useState } from 'react';

const IndustrySelect: React.FC = () => {
  const [industry, setIndustry] = useState<string | undefined>(undefined);

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
    <select
      value={industry}
      onChange={(e) => setIndustry(e.target.value)}
    >
      <option value={undefined}>Select an industry...</option>
      {organizationIndustries.map((industryOption) => (
        <option key={industryOption.value} value={industryOption.value}>
          {industryOption.label}
        </option>
      ))}
    </select>
  );
};

export default IndustrySelect;