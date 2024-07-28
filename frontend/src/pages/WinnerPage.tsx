import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Player {
  playerName: string;
  bestLaps: string;
  numberOfWins: number;
  totalPlayingTime: string;
  positionGainsPerRace: number;
}



const players: Player[] = [
  {
    playerName: 'Player 1',
    bestLaps: '1:10:00',
    numberOfWins: 2,
    totalPlayingTime: '5:00:00',
    positionGainsPerRace: 1,
  },
  // Add more players as needed
  {
    playerName: 'Player 2',
    bestLaps: '1:20:00',
    numberOfWins: 1,
    totalPlayingTime: '6:00:00',
    positionGainsPerRace: 0,
  },
];

const WinnerPage: React.FC = () => {
  return (
    <>
    <div className="flex-vertical">
        <h1 className="uniqueracemini">Winner is Player 1</h1>
        <img src="uniqueracinglogo.png" />
    </div>
      <TableContainer component={Paper}>
        <Table style={{ backgroundColor: `black`, borderColor: `white`, height: 0 }}>
          <TableHead>
            <TableRow>
              <TableCell className="uniqueracemini"><h1>Player Name</h1></TableCell>
              <TableCell className="uniqueracemini"><h1>Best Laps</h1></TableCell>
              <TableCell className="uniqueracemini"><h1>Number of Wins</h1></TableCell>
              <TableCell className="uniqueracemini"><h1>Total Playing Time</h1></TableCell>
              <TableCell className="uniqueracemini"><h1>Position Gains Per Race</h1></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player, index) => (
              <TableRow key={index}>
                <TableCell className="uniqueracemini"><h2>{player.playerName}</h2></TableCell>
                <TableCell className="uniqueracemini"><h2>{player.bestLaps}</h2></TableCell>
                <TableCell className="uniqueracemini"><h2>{player.numberOfWins}</h2></TableCell>
                <TableCell className="uniqueracemini"><h2>{player.totalPlayingTime}</h2></TableCell>
                <TableCell className="uniqueracemini"><h2>{player.positionGainsPerRace}</h2></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WinnerPage;
