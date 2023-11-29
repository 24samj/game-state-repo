import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import axios from "axios";

const HangManPage = () => {
    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [timeUp, setTimeUp] = useState(false);
    const [attempt, setAttempt] = useState(10);
    const [word, setWord] = useState("HANGMAN");
    const [timeLeft, setTimeLeft] = useState(word?.length * 10000); // 2 minutes
    const [prevGuesses, setPrevGuesses] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const statusRef = useRef();

    const alphabets = Array.from({ length: 26 }, (_, i) =>
        String.fromCharCode(65 + i)
    );

    const maskedWord = word
        .split("")
        .map((letter) => (correctGuesses.includes(letter) ? letter : "_"))
        .join(" ");

    useEffect(() => {
        const timeInterval = setInterval(() => {
            if (timeLeft > 1000) {
                setTimeLeft((prevTime) => prevTime - 1000);
            } else {
                setTimeLeft(0);
                setTimeUp(true);
            }
        }, 1000);

        if (!maskedWord.includes("_") || !attempt) {
            setGameOver(true);
        }

        return () => {
            clearInterval(timeInterval);
        };
    }, [timeLeft, word, maskedWord, attempt]);

    const handleAlphabetClick = (alphabet) => {
        if (prevGuesses.includes(alphabet)) {
            alert("You've already guessed that letter!");
            return;
        }

        if (attempt !== 0 && !word.includes(alphabet)) {
            setAttempt((prevAttempt) => prevAttempt - 1);
            if (prevGuesses === "") {
                setPrevGuesses((prev) => prev + " " + alphabet);
            } else {
                setPrevGuesses((prev) => prev + ", " + alphabet);
            }
            if (timeLeft > 5000) {
                setTimeLeft((prevTime) => prevTime - 5000);
            }
        } else if (word.includes(alphabet)) {
            setCorrectGuesses((prevGuesses) => [...prevGuesses, alphabet]);
        }
    };

    const handleNewWordClick = () => {
        getWord();
        setGameOver(false);
    };

    const getWord = () => {
        axios
            .get(
                "https://random-word-api.vercel.app/api?words=1&type=uppercase"
            )
            .then((resp) => {
                setWord(resp.data[0]);
                setTimeUp(false);
                setTimeLeft(resp.data[0].length * 10000);
                setCorrectGuesses([]);
                setAttempt(Math.min(resp.data[0].length * 2, 15));
                setPrevGuesses("");
            });
    };

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

            {!gameOver && !timeUp && (
                <Box>
                    <Typography
                        sx={{ fontSize: { xs: "1rem", sm: "2rem" } }}
                        variant="h1"
                        color={
                            timeLeft < 6000
                                ? "red"
                                : timeLeft < 11000
                                ? "orange"
                                : "green"
                        }>
                        {timeLeft / 1000} Seconds Left
                    </Typography>
                    <Divider />
                    <Typography
                        sx={{ fontSize: { xs: "1rem", sm: "2rem" } }}
                        variant="h1">
                        {attempt} Attempts Left
                    </Typography>
                </Box>
            )}

            {(timeUp || !attempt) && (
                <Box>
                    <Typography ref={statusRef} variant="h2">
                        You lost!
                    </Typography>
                    <Typography variant="h5">
                        Correct word was <strong>"{word}".</strong>
                    </Typography>
                </Box>
            )}

            {!maskedWord.includes("_") && (
                <Typography ref={statusRef} variant="h2">
                    You won🥳
                </Typography>
            )}

            <Button
                onClick={handleNewWordClick}
                variant="contained"
                sx={{ fontSize: { xs: "1rem", sm: "2rem" } }}>
                New Word
            </Button>

            {prevGuesses !== "" && (
                <Typography
                    sx={{ fontSize: { xs: "1rem", sm: "2rem" } }}
                    variant="h3">
                    Previous Guesses: {prevGuesses}
                </Typography>
            )}

            <Box>
                {alphabets.map((alphabet, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        sx={{
                            fontSize: { xs: "1rem", sm: "3rem" },
                            margin: { xs: 0.2, sm: 2 },
                        }}
                        disabled={gameOver || timeUp}
                        onClick={() => handleAlphabetClick(alphabet)}>
                        {alphabet}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default HangManPage;
