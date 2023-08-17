import React, { useState, useEffect, useContext, Fragment } from 'react';
import { ConfigContext } from './ConfigProvider';
import { Link } from '@mui/material';

const PromptSuggestions: React.FC = () => {
  const { prompt, setPrompt } = useContext(ConfigContext);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setSuggestions([
      'Examine CSAT scores for the past quarter and identify any trends.',
      'Analyze the NPS distribution and categorize customers as promoters, passives, or detractors.',
      'Investigate the correlation between CSAT scores and response rates.',
      'Compare the CSAT scores between different customer segments.',
      'Evaluate the impact of completion rate on overall survey data quality.',
      'Identify factors that lead to higher completion rates in specific demographics.',
      'Analyze the NPS trend over the last year and assess any changes in customer sentiment.',
      'Examine response rates across various touchpoints and identify areas for improvement.',
      'Identify the main drivers behind low CSAT scores in certain product categories.',
      'Compare NPS scores between different geographic regions to understand regional variations.',
      'Investigate the impact of survey length on completion rates and response quality.',
      'Analyze the correlation between NPS scores and customer loyalty behaviors.',
      'Examine the relationship between CSAT scores and customer retention rates.',
      'Identify factors that contribute to high NPS scores among long-term customers.',
      'Evaluate the effectiveness of follow-up actions on improving CSAT scores.',
      'Analyze the NPS scores of customers who provided detailed comments in the survey.',
      'Examine the impact of response rates on the reliability of NPS measurements.',
      'Identify any seasonal patterns in CSAT scores and response rates.',
      'Analyze the distribution of NPS scores and identify potential outliers.',
      'Investigate the impact of different survey distribution methods on NPS results.'
    ]);
  }, []);

  const filteredSuggestions = suggestions.filter(suggestion => suggestion !== prompt && suggestion.toLowerCase().includes(prompt.toLowerCase())).slice(0, 5);

  return (
    <div>
      {filteredSuggestions.length > 0 && (
        <Fragment>
          <h5>Choose prompt:</h5>
          <ul>
            {filteredSuggestions.map((suggestion) => (
              <li key={suggestion}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setPrompt(suggestion)}
                >
                  {suggestion}
                </Link>
              </li>
            ))}
          </ul>
        </Fragment>
      )}
    </div>
  );
}

export default PromptSuggestions;