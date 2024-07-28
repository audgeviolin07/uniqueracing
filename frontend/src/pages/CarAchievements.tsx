import React, { useState, useContext } from "react";
import { AccountsContext } from "../accounts/AccountsContext";
import PromptForm from "../components/PromptForm";
import ImageDisplay from "../components/ImageDisplay";
import { generateImage } from "../openai";
import { makeStyles } from "@mui/styles";
import { SdkContext } from "../sdk/SdkContext"; // Assuming you have an SDK context setup
import Sdk from "@unique-nft/sdk";

const useStyles = makeStyles({
  uniquerace: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  uniqueracemini: {
    padding: "16px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
  },
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
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  achievementBox: {
    padding: "16px",
    backgroundColor: "#1f1f1f", // Dark background color
    borderRadius: "8px",
    textAlign: "center",
    color: "#ffffff", // Light text color for contrast
  },
  button: {
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#4ea0d3",
    border: "none",
    borderRadius: "8px",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "bold",
    textShadow:
      "0 0 10px rgba(111, 189, 243, 0.8), 0 0 20px rgba(111, 189, 243, 0.6), 0 0 30px rgba(111, 189, 243, 0.4)",
  },
});

const achievements = [
  {
    wins: 10,
    defeats: 5,
    bestLap: "1:20",
    totalPlayTime: "5h",
    collectionId: 1,
    tokenId: 101,
  },
  {
    wins: 12,
    defeats: 3,
    bestLap: "1:18",
    totalPlayTime: "6h",
    collectionId: 1,
    tokenId: 102,
  },
  {
    wins: 8,
    defeats: 7,
    bestLap: "1:22",
    totalPlayTime: "4h",
    collectionId: 1,
    tokenId: 103,
  },
  // Add more achievements if needed
];

const CarAchievements: React.FC = () => {
  const classes = useStyles(); // Use custom styles
  const { accounts } = useContext(AccountsContext);
  const { sdk } = useContext(SdkContext); // Use SDK context
  const currentAccount = Array.from(accounts.values())[0];

  const [imageUrl, setImageUrl] = useState<string>("");
  const [selectedAchievement, setSelectedAchievement] = useState(
    achievements[0]
  );

  // Function to handle image generation
  const handleGenerate = async (prompt: string) => {
    const url = await generateImage(prompt);
    setImageUrl(url);
  };
  // Function to handle the burn action
  const handleBurn = async (collectionId: number, tokenId: number) => {
    try {
      await sdk!.token.burn({
        collectionId,
        tokenId,
      });
      alert(
        `Token ${tokenId} from collection ${collectionId} has been burned.`
      );
    } catch (error) {
      console.error("Error burning token:", error);
      alert("Failed to burn token.");
    }
  };

  return (
    <div className="page flex-vertical">
      <div className={classes.uniquerace}>Trade - Achievements to Powerups</div>
      <div className="columns">
        <div className="column"></div>
        <div className="column center">
          <div className={classes.gridContainer}>
            {achievements.map((achievement, index) => (
              <div key={index} className={classes.achievementBox}>
                <div className={classes.uniqueracemini}>
                  Achievement {index + 1}
                </div>
                <p>Wins: {achievement.wins}</p>
                <p>Defeats: {achievement.defeats}</p>
                <p>Best Lap: {achievement.bestLap}</p>
                <p>Total Play Time: {achievement.totalPlayTime}</p>
                <button
                  className={classes.button}
                  onClick={() =>
                    handleBurn(achievement.collectionId, achievement.tokenId)
                  }
                >
                  Trade for Powerup
                </button>
              </div>
            ))}
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
