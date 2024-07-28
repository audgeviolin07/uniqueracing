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
        placeholder="enter your achievement"
        className="uniqueraceminimini"
      />
      <button type="submit">claim unique achievement</button>
    </form>
  );
};

export default PromptForm;
