import React, { useEffect, useState, useContext } from 'react';
import { AccountsContext } from "../accounts/AccountsContext";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Corrected import
import { makeStyles } from '@mui/styles'; // Import makeStyles
import PromptForm from '../components/PromptForm';
import ImageDisplay from '../components/ImageDisplay';
import { generateImage } from '../openai'; // Corrected path
import Road from '../components/Road';
import Car from '../components/Car';
import { useCreateCollection } from "../utils/sdk-methods/create-collection";
import { CreateCollectionParams } from "../utils/sdk-methods/types";

const useStyles = makeStyles({
  nftBox: {
    fontSize: '40px',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #ffffff, #4ea0d3, #2e8cb3)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    textAlign: 'center',
    textShadow: '0 0 10px rgba(111, 189, 243, 0.8), 0 0 20px rgba(111, 189, 243, 0.6), 0 0 30px rgba(111, 189, 243, 0.4)',
    position: 'relative',
  },
  accordion: {
    background: 'linear-gradient(45deg, #ffffff, #4ea0d3, #2e8cb3)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    textAlign: 'center',
    textShadow: '0 0 10px rgba(111, 189, 243, 0.8), 0 0 20px rgba(111, 189, 243, 0.6), 0 0 30px rgba(111, 189, 243, 0.4)',
    borderRadius: '8px',
    '&:before': {
      display: 'none',
    },
    '&.MuiAccordion-root.Mui-expanded': {
      margin: 'auto',
    },
  },
  accordionSummary: {
    background: 'linear-gradient(45deg, #ffffff, #4ea0d3, #2e8cb3)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    textAlign: 'center',
    textShadow: '0 0 10px rgba(111, 189, 243, 0.8), 0 0 20px rgba(111, 189, 243, 0.6), 0 0 30px rgba(111, 189, 243, 0.4)',
    borderRadius: '8px',
  },
  accordionDetails: {
    backgroundColor: '#ffffff',
    padding: '16px',
  },
});

const CarAchievements: React.FC = () => {
  const classes = useStyles(); // Use custom styles
  const { accounts, fetchPolkadotAccounts } = useContext(AccountsContext);
  const currentAccount = Array.from(accounts.values())[0];

  const [imageUrl, setImageUrl] = useState<string>('');
  const [winner, setWinner] = useState<string | null>(null);

  // Function to handle image generation
  const handleGenerate = async (prompt: string) => {
    const url = await generateImage(prompt);
    setImageUrl(url);
  };


  return (
    <div className="page flex-vertical">
      <div className="uniquerace">trade - achievements to powerups</div>
      <div className="columns">
        <div className="column"></div>
        <div className="column center">
        <div className="white-box">
            <div className="uniqueracemini"> achievement </div>
            <button className="nft-box">
              <img src="racecar.png" alt="Top Image" className="top-image" />
            </button>
            <button>trade for powerup</button>
            </div>
        
          <div className="white-box">
          <div className="uniqueracemini"> achievement </div>
            <button className="nft-box">
              <img src="racecar.png" alt="Top Image" className="top-image" />
              
            </button>
            
            <button>trade for powerup</button>
          </div>
          
          <div className="white-box">
            <div className="uniqueracemini"> achievement </div>
            <button className="nft-box">
              <img src="racecar.png" alt="Top Image" className="top-image" />
            </button>
            <button>trade for powerup</button>
            </div>
          

        <div className="white-box">
        <PromptForm onGenerate={handleGenerate} />

    
            <button className="nft-box">
            <div className="image-display">
                <ImageDisplay imageUrl={imageUrl} />
            </div>
            </button>
            </div>
          
      </div>
      </div>
        </div>
  );
};

export default CarAchievements;
