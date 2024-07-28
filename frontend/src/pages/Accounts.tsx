import { useCallback, useContext, useEffect, useState } from "react";
import { AccountsContext } from "../accounts/AccountsContext";
import { Account } from "../accounts/types";
import { List } from "../components/List";
import { CreateLocalAccountModal } from "../modals/CreateLocalAccountModal";
import { SignMessageModal } from "../modals/SignMessageModal";
import { TransferAmountModal } from "../modals/TransferAmountModal";
import { Logo } from "./logo";
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

export const AccountsPage = () => {



  const classes = useStyles(); // Use custom styles
  const { accounts, fetchPolkadotAccounts } = useContext(AccountsContext);
  const currentAccount = Array.from(accounts.values())[0];

  const [imageUrl, setImageUrl] = useState<string>('');



  // ############################################Create Collections ####################################################################################################################################
  // const { createCollection, loading, error, collectionId } = useCreateCollection();
  // const [name, setName] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  // const [symbol, setSymbol] = useState<string>("");
  // const [file, setFile] = useState<File | null>(null);

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (!file) {
  //     alert("Please select a file");
  //     return;
  //   }

  //   const params: CreateCollectionParams = {
  //     name,
  //     description,
  //     symbol,
  //     file,
  //   };

  //   const result = await createCollection(params);
  //   if (result.error) {
  //     alert(result.error);
  //   }
  // };

  // ####################################################################################################################################

  const handleGenerate = async (prompt: string) => {
    const url = await generateImage(prompt);
    setImageUrl(url);
  };

  return (
    <>
      <div className="page flex-vertical">
        <div className="uniquerace">uniquerace</div>
        {/* <div className="uniqueracemini">web3 + ai + sports</div> */}
        <div className="columns">
          <div className="column"></div>
          <div className="column center">
            <div className="white-box">
              <div className="uniqueracemini">collections</div>
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className={classes.accordionSummary}
                >
                  <button className={classes.nftBox}>Show Collection</button>
                </AccordionSummary>
                <AccordionDetails className={classes.nftBox}>
                  <ul>
                    
                    <Link to="/trade">
                    <li>Collection 1</li>
                </Link>
                  </ul>
                </AccordionDetails>
              </Accordion>
              {/* <button onClick={} className={classes.nftBox}>Create Collection</button> */}
              <div>
      {/* <h1>Create Collection</h1> */}
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Collection"}
        </button>
      </form>
      {error && <p>Error: {error}</p>}
      {collectionId && <p>Collection created with ID: {collectionId}</p>} */}
    </div>
            </div>
            {/* <Logo /> */}
            <img src="uniqueracinglogo.png" className="uniqueracinglogo" />
            <div className="white-box">
              <div className="uniqueracemini">my nft racecar</div>
              <button className="nft-box">
                <img src="racecar.png" alt="Top Image" className="top-image" />
              </button>
              <PromptForm onGenerate={handleGenerate} />
            <ImageDisplay imageUrl={imageUrl} />
            </div>
            <div className="play-button">
              {currentAccount ? (
                <Link to="/game">
                  <button>play</button>
                </Link>
              ) : (
                <button onClick={fetchPolkadotAccounts}>
                  Connect Polkadot Wallet
                </button>
              )}
        
            </div>
          </div>
          <div className="column"></div>
        </div>
      </div>
    </>
  );
};
