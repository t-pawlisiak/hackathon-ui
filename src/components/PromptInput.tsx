import React, { useState } from 'react';

const PromptSender: React.FC = () => {
  const [prompt, setPrompt] = useState(''); // To manage the value of the textarea

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value); // Update the prompt state whenever the textarea value changes
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Sending the prompt:", prompt);
    setPrompt('');
  };

  return (
    <div className="prompt_sender">
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter your prompt here..."
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit">Send Prompt</button>
      </form>
    </div>
  );
}

export default PromptSender;