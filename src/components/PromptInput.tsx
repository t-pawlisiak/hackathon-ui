import React, { useContext } from 'react';
import PromptSuggestions from './PromptSuggestions';
import { FormControl, TextField, Button } from '@mui/material';
import { ConfigProvider } from './ConfigProvider';

const PromptSender: React.FC = () => {
  const { prompt, setPrompt } = useContext(ConfigProvider);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Sending the prompt:", prompt);
    setPrompt('');
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            value={prompt}
            onChange={handleInputChange}
            label="Enter your prompt here..."
            multiline
            maxRows={6}
          />
          <Button type="submit" variant="contained">
            Send Prompt
          </Button>
        </form>
      </FormControl>

      <PromptSuggestions
        prompt={prompt}
      />
    </div>
  );
}

export default PromptSender;
