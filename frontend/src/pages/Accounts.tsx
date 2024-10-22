import { useCallback, useContext, useEffect, useState } from "react";
import { AccountsContext } from "../accounts/AccountsContext";
import { Account } from "../accounts/types";
import { List } from "../components/List";
import { CreateLocalAccountModal } from "../modals/CreateLocalAccountModal";
import { SignMessageModal } from "../modals/SignMessageModal";
import { TransferAmountModal } from "../modals/TransferAmountModal";
import { Logo } from "./logo";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import PromptForm from "../components/PromptForm";
import ImageDisplay from "../components/ImageDisplay";
import { generateImage } from "../openai";
import { useCreateCollection } from "../utils/sdk-methods/create-collection";
import { CreateCollectionParams } from "../utils/sdk-methods/types";
import axios from "axios";
import { SdkContext } from "../sdk/SdkContext";
import Collection from "../../../backend/models/Collection";
import { connectSdk } from "../utils/connect-sdk";

const useStyles = makeStyles({
  nftBox: {
    fontSize: "40px",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #ffffff, #4ea0d3, #2e8cb3)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    backgroundClip: "text",
    color: "transparent",
    textAlign: "center",
    textShadow:
      "0 0 10px rgba(111, 189, 243, 0.8), 0 0 20px rgba(111, 189, 243, 0.6), 0 0 30px rgba(111, 189, 243, 0.4)",
    position: "relative",
  },
  accordion: {
    background: "linear-gradient(45deg, #ffffff, #4ea0d3, #2e8cb3)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    backgroundClip: "text",
    color: "transparent",
    textAlign: "center",
    textShadow:
      "0 0 10px rgba(111, 189, 243, 0.8), 0 0 20px rgba(111, 189, 243, 0.6), 0 0 30px rgba(111, 189, 243, 0.4)",
    borderRadius: "8px",
    "&:before": {
      display: "none",
    },
    "&.MuiAccordion-root.Mui-expanded": {
      margin: "auto",
    },
  },
  accordionSummary: {
    background: "linear-gradient(45deg, #ffffff, #4ea0d3, #2e8cb3)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    backgroundClip: "text",
    color: "transparent",
    textAlign: "center",
    textShadow:
      "0 0 10px rgba(111, 189, 243, 0.8), 0 0 20px rgba(111, 189, 243, 0.6), 0 0 30px rgba(111, 189, 243, 0.4)",
    borderRadius: "8px",
  },
  accordionDetails: {
    backgroundColor: "#ffffff",
    padding: "16px",
  },
  topLeftImages: {
    position: "absolute",
    top: 10,
    left: 10,
    display: "flex",
    gap: "10px",
  },
  image: {
    width: "50px",
    height: "50px",
  },
});

export const AccountsPage = () => {
  const classes = useStyles();
  const { accounts, fetchPolkadotAccounts } = useContext(AccountsContext);
  const currentAccount = Array.from(accounts.values())[0];

  const [imageUrl, setImageUrl] = useState<string>("");
  const { sdk } = useContext(SdkContext);

  const [hasCollection, setHasCollection] = useState(false);

  const fetchCollections = useCallback(async () => {
    if (!sdk) return;
    try {
      const response = await axios.post(
        "http://localhost:3001/api/get-collections",
        { walletAddress: currentAccount.address }
      );
      console.log(response.data);
      if (response.data.collections.length !== 0) setHasCollection(true);
    } catch (e) {
      console.log(e);
    }
  }, [currentAccount, axios]);

//  #############################################################################################################################################################################################
// const handlePlay = async (carId) => {
//   try {
//     // Fetch the car details from the database
//     const car = await Car.findById(carId).lean();
//     if (!car) {
//       console.error('Car not found');
//       return;
//     }

//     // Simulate race outcome (for demonstration purposes)
//     const raceOutcome = Math.random(); // A random number between 0 and 1
//     const didWin = raceOutcome > 0.5; // Let's say the car wins if the outcome is greater than 0.5

//     if (didWin) {
//       console.log(`Car ${car.name} won the race! Creating achievement...`);

//       // Create the achievement
//       const { account, sdk } = await connectSdk();
//       const imageUrl = 'URL_TO_ACHIEVEMENT_IMAGE'; // Replace with the actual image URL or upload logic

//       const { parsed } = await sdk.token.createV2({
//         AchievementcollectionId: 'ACHIEVEMENT_COLLECTION_ID', // Replace with the actual achievement collection ID
//         image: imageUrl,
//         owner: car.owner,
//         attributes: [
//           { trait_type: 'CarId', value:car   },
//           { trait_type: 'TotalTime', value: 0 },
//           { trait_type: 'Score', value: 0 },
//           { trait_type: 'Position', value: 0 },
//         ],
//       });

//       if (!parsed) {
//         console.error('Failed to parse achievement creation response');
//         return;
//       }

//       const achievementId = parsed.tokenId;
//       console.log('Achievement created, Token ID:', achievementId);

//       // Save the achievement to the database
//       // const newAchievement = new Achievement({
//       //   achievementId,
//       //   AchievementcollectionId: new mongoose.Types.ObjectId('ACHIEVEMENT_COLLECTION_ID'), // Replace with the actual achievement collection ID
//       //   name: `Achievement for ${car.name}`,
//       //   image: imageUrl,
//       //   owner: car.owner,
//       //   victories: 1,
//       //   defeats: 0,
//       // });

//       // await newAchievement.save();
//       // console.log('Achievement saved to database:', newAchievement);

//       // Update the car's victories
//       car.victories += 1;
//       await Car.findByIdAndUpdate(carId, { victories: car.victories });
//       console.log(`Car ${car.name} victories updated to ${car.victories}`);
//     } else {
//       console.log(`Car ${car.name} lost the race.`);
//       // Update the car's defeats
//       car.defeats += 1;
//       await Car.findByIdAndUpdate(carId, { defeats: car.defeats });
//       console.log(`Car ${car.name} defeats updated to ${car.defeats}`);
//     }
//   } catch (error) {
//     console.error('Error handling play:', error.message);
//     console.error(error.stack);
//   }
// };


// #############################################################################################################################################################################################
  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const handleGenerate = async (prompt: string) => {
    const url = await generateImage("image of indie race car");
    setImageUrl(url);
  };

  console.log(currentAccount);

  return (
    <>
      <div className="page flex-vertical">
        <div className="uniquerace">uniquerace</div>
        {/* <div className="uniqueracemini">web3 + ai + sports</div> */}
        <div className="columns">
          <div className="column"></div>
          <div className="column center">
            <div className="white-box">
              <div className="uniqueracemini">collections + achievements</div>
              {hasCollection ? (
                <>
                  <Accordion className={classes.accordion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classes.accordionSummary}
                    >
                      <button className={classes.nftBox}>
                        🏎️ show collection
                      </button>
                    </AccordionSummary>
                    <AccordionDetails className="uniqueracemini">
                      <ul>
                        <Link to="/trade">
                          <li>Cars</li>
                        </Link>
                      </ul>
                    </AccordionDetails>
                  </Accordion>

                  <Link to="/achievements">
                    <button className={classes.nftBox}>
                      🏆 show achievements
                    </button>
                  </Link>
                </>
              ) : (
                <h1>
                  You seem to have no collections. Why not{" "}
                  <button
                    style={{ display: "inline" }}
                    onClick={async () => {
                      generateImage("image of indie race car").then((url) => {
                        console.log("Generated image");
                        sdk?.collection
                          .createV2({
                            name: "Racing Dreams",
                            description: "Racing simulation demo",
                            symbol: "CAR",
                            cover_image: { url: url },
                            // NOTICE: activate nesting for collection admin in order to assign achievements
                            permissions: { nesting: { collectionAdmin: true } },
                            encodeOptions: {
                              overwriteTPPs: [
                                {
                                  // tokenData is a container for attributes
                                  key: "tokenData",
                                  permission: {
                                    // NOTICE: limit mutability for admins only
                                    collectionAdmin: true,
                                    tokenOwner: false,
                                    mutable: true,
                                  },
                                },
                              ],
                            },
                          })
                          .then((e) => {
                            const collectionId = e.parsed?.collectionId;
                            return axios
                              .post(
                                "http://localhost:3001/api/create-collection",
                                {
                                  collectionId,
                                  name: "Racing Dreams",
                                  description: "Racing simulation demo",
                                  symbol: "CAR",
                                  url,
                                  owner: currentAccount.address,
                                }
                              )
                              .then((e) => console.log(e))
                              .catch((error) => console.log(error));
                          });
                      });
                    }}
                  >
                    make one?
                  </button>
                </h1>
              )}
              <div></div>
            </div>
            <img src="uniqueracinglogo.png" className="uniqueracinglogo" />
            {currentAccount ? (
              <>
                <div className="white-box">
                  <div className="uniqueracemini">my nft racecar</div>
                  <button className="nft-box">
                    <img
                      src="racecar.png"
                      alt="Top Image"
                      className="top-image"
                    />
                  </button>
                  <ImageDisplay imageUrl={imageUrl} />
                </div>
              </>
            ) : (
              <div className="white-box" />
            )}

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
