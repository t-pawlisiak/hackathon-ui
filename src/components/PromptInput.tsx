import React, { useContext, useState } from 'react';
import PromptSuggestions from './PromptSuggestions';
import { FormControl, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { ConfigContext } from './ConfigProvider';

const PromptSender: React.FC = () => {
  const { organizationId, workspaceId, industry, setPrompt, prompt, setResponse, loading, setLoading } = useContext(ConfigContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload: {
      prompt: string;
      organizationId?: string;
      workspaceId?: string;
      industry?: string;
    } = { prompt };

    if (organizationId) {
      payload.organizationId = organizationId;
    }

    if (workspaceId) {
      payload.workspaceId = workspaceId;
    }

    if (industry) {
      payload.industry = industry;
    }

    try {
      setLoading(true);

      const reponse = await fetch('http://Sawomirs-MacBook-Pro.local:3000/messages', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: 'cors',
      });

      if (reponse.ok) {
        const results = await reponse.json();

        setResponse(results);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
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
            disabled={loading}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            className="submit-button"
            loading={loading}
          >
            Send Prompt
          </LoadingButton>
        </FormControl>
      </form>

      <PromptSuggestions />
    </div>
  );
}

export default PromptSender;
