import React, { useState } from 'react';

interface PromptFormProps {
  onGenerate: (prompt: string) => void;
}

const PromptForm: React.FC<PromptFormProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onGenerate(prompt);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        className="uniqueraceminimini"
      />
      <button type="submit">generate nft for 0.8k</button>
    </form>
  );
};

export default PromptForm;
