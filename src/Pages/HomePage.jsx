import { Box } from "@mui/material";
import React from "react";
import GameCards from "../Components/GameCards";
import memoryIcon from "../Images/amnesia.png";
import hangmanIcon from "../Images/hangman-game.png";
import numbersIcon from "../Images/numbers.png";
import tttIcon from "../Images/tic-tac-toe.png";
import sumIcon from "../Images/triplesum.png";
import snakeIcon from "../Images/snake.png";
export default function HomePage() {
    const gamesArr = [
        {
            name: "Tic Tac Toe",
            icon: tttIcon,
        },
        {
            name: "Hangman",
            icon: hangmanIcon,
        },
        {
            name: "Number Guesser",
            icon: numbersIcon,
        },
        {
            name: "Memory Game",
            icon: memoryIcon,
        },
        {
            name: "Triple Sum",
            icon: sumIcon,
        },
        { name: "Snake", icon: snakeIcon },
    ];
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "100%",
            }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "space-around" },
                    alignContent: { xs: "center", md: "space-around" },
                    alignItems: "center",
                    flexWrap: "wrap",
                    height: "100%",
                }}>
                {gamesArr.map((el) => (
                    <GameCards key={el.name} name={el.name} icon={el.icon} />
                ))}
            </Box>
        </Box>
    );
}
