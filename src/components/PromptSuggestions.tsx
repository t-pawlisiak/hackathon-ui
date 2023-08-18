import React, { useState, useEffect, useContext, Fragment } from 'react';
import { ConfigContext } from './ConfigProvider';
import { Link } from '@mui/material';

const PromptSuggestions: React.FC = () => {
  const { prompt, setPrompt } = useContext(ConfigContext);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (suggestions.length !== 0) return;
    (async () => {
      try {
        const response = await fetch('http://Sawomirs-MacBook-Pro.local:3000/suggestions/prompts', {
          method: 'POST',
          headers: { "Content-Type": "application/json", },
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
  });

  const filteredSuggestions = suggestions.filter(suggestion => suggestion !== prompt && suggestion.toLowerCase().includes(prompt.toLowerCase())).slice(0, 5);

  return (
    <div className="prompt-suggestions">
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
