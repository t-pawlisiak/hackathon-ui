import React, { useContext } from 'react';
import PromptSuggestions from './PromptSuggestions';
import { FormControl, TextField, Button } from '@mui/material';
import { ConfigContext } from './ConfigProvider';

const PromptSender: React.FC = () => {
  const { organizationId, workspaceId, setPrompt, prompt } = useContext(ConfigContext);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload: {
      prompt: string;
      organizationId?: string;
      workspaceId?: string;
    } = { prompt };

    if (organizationId) {
      payload.organizationId = organizationId;
    }

    if (workspaceId) {
      payload.workspaceId = workspaceId;
    }

    // if (industry) {
    //   payload.industry = industry;
    // }
    
    try {
      const reponse = await fetch('http://Sawomirs-MacBook-Pro.local:3000/messages', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: 'cors',
      });

      if (reponse.ok) {
        console.log(reponse.json());
        setPrompt('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField
            value={prompt}
            onChange={handleInputChange}
            label="Enter your prompt here..."
            multiline
            maxRows={6}
          />
  
          <Button type="submit" variant="contained" className="submit-button">
            Send Prompt
          </Button>
        </FormControl>
      </form>

      <PromptSuggestions />
    </div>
  );
}

export default PromptSender;
