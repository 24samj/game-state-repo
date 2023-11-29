import { Box, Button, Divider, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function HangManPage() {
    function getWord() {
        axios
            .get(
                "https://random-word-api.vercel.app/api?words=1&type=uppercase"
            )
            .then((resp) => {
                setWord(resp.data[0]);
                setTimeUp(false);
                setTimeLeft(2 * 60000);
                setCorrectGuesses([]);
                setAttempt(Math.min(resp.data[0].length * 3, 15));
            });
    }

    const alphabets = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];

    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [timeUp, setTimeUp] = useState(false);
    const [attempt, setAttempt] = useState(10);
    const [timeLeft, setTimeLeft] = useState(2 * 60000); // 2 minutes
    const [word, setWord] = useState("HANGMAN");
    const statusRef = useRef();

    useEffect(() => {
        const timeInterval = setInterval(() => {
            if (timeLeft > 1000) {
                setTimeLeft(timeLeft - 1000);
            } else {
                setTimeLeft(0);
                setTimeUp(true);
            }
        }, 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, [timeLeft, word]);

    function handleAlphabetClick(alphabet) {
        if (attempt !== 0 && !word.includes(alphabet)) {
            setAttempt(attempt - 1);
        } else if (word.includes(alphabet)) {
            setCorrectGuesses([...correctGuesses, alphabet]);
        }
    }

    const maskedWord = word
        .split("")
        .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
        .join(" ");

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                height: "100%",
            }}>
            <Typography
                sx={{ fontSize: { xs: "3rem", sm: "6rem" } }}
                variant="h1">
                {maskedWord}
            </Typography>
            <Box>
                <Typography
                    sx={{ fontSize: { xs: "1rem", sm: "2rem" } }}
                    variant="h1">
                    {timeLeft / 1000} Seconds Left
                </Typography>
                <Divider />
                <Typography
                    sx={{ fontSize: { xs: "1rem", sm: "2rem" } }}
                    variant="h1">
                    {attempt} Attempts Left
                </Typography>
            </Box>
            {timeUp || !attempt ? (
                <Box>
                    <Typography ref={statusRef} variant="h2">
                        You lost!
                    </Typography>
                    <Typography variant="h5">
                        Correct word is <strong>"{word}"</strong>
                    </Typography>
                </Box>
            ) : (
                !maskedWord.includes("_") && (
                    <Typography ref={statusRef} variant="h2">
                        You won🥳
                    </Typography>
                )
            )}
            <Button
                onClick={getWord}
                variant="contained"
                sx={{ fontSize: { xs: "1rem", sm: "2rem" } }}>
                New Word
            </Button>
            <Box>
                {alphabets.map((alphabet, index) => (
                    <Button
                        variant="outlined"
                        sx={{
                            fontSize: { xs: "1rem", sm: "3rem" },
                            margin: { xs: 0.2, sm: 2 },
                        }}
                        key={index}
                        onClick={() => handleAlphabetClick(alphabet)}>
                        {alphabet}
                    </Button>
                ))}
            </Box>
        </Box>
    );
}
