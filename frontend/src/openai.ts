import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const generateImage = async (prompt: string): Promise<string> => {
  const response = await axios.post(
    'https://api.openai.com/v1/images/generations',
    {
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const imageUrl = response.data.data[0].url;
  return imageUrl;
};
