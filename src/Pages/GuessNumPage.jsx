import { PlayArrow, Replay } from "@mui/icons-material";
import {
    Box,
    Container,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

const MAX_NUMBER = 9999;
export default function GuessNumPage() {
    const [guess, setGuess] = useState("");
    // const [randomNumber, setRandomNumber] = useState(5);
    const [randomNumber, setRandomNumber] = useState(getRandom(MAX_NUMBER));
    const [msg, setMsg] = useState("Can you guess the number?");
    const [count, setCount] = useState(0);
    const [prevGuesses, setPrevGuesses] = useState("");
    const [gameOver, setGameOver] = useState(false);

    const getMessage = (guess, randomNum) => {
        const guessNo = Number(guess);
        if (guessNo < randomNum) return "Too low!";
        if (guessNo > randomNum) return "Too high!";
        if (guessNo === randomNum) {
            setGameOver(true);
            return "Congratulations! You guessed the number.";
        }
    };

    const checkGuess = (event) => {
        event.preventDefault();
        setMsg(getMessage(guess, randomNumber));
        setCount(count + 1);
        if (prevGuesses === "") {
            setPrevGuesses(prevGuesses + " " + guess);
        } else {
            setPrevGuesses(prevGuesses + ", " + guess);
        }

        guess !== randomNumber && setGuess("");
    };

    const restart = () => {
        setRandomNumber(getRandom(MAX_NUMBER));
        setCount(0);
        setMsg("Can you guess the number?");
        setGuess("");
        setGameOver(false);
        setPrevGuesses("");
    };

    return (
        <Container sx={{ height: "100vh" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}>
                <Typography variant="h4" gutterBottom>
                    Guess the number between 0 and 9999.
                </Typography>
                <Paper sx={{ padding: 2 }}>
                    <form onSubmit={(e) => checkGuess(e)}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12}>
                                <TextField
                                    id="guess"
                                    label="Enter your guess"
                                    variant="outlined"
                                    type="number"
                                    inputProps={{ min: 0, max: MAX_NUMBER }}
                                    fullWidth
                                    autoFocus
                                    value={guess}
                                    onChange={(e) => setGuess(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {gameOver ? (
                                    "Press to play again"
                                ) : (
                                    <IconButton
                                        type="submit"
                                        aria-label="check guess">
                                        <PlayArrow fontSize="large" />
                                    </IconButton>
                                )}
                                <IconButton
                                    type="button"
                                    aria-label="start new game"
                                    onClick={restart}>
                                    <Replay fontSize="large" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                <Typography variant="h5" sx={{ marginTop: 4 }}>
                    {msg}
                </Typography>
                {msg !== "Can you guess the number?" && (
                    <>
                        <Typography
                            variant="subtitle1"
                            sx={{ marginTop: 2 }}
                            fontSize={"24px"}>
                            Number of guesses: {count}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{ marginTop: 2 }}
                            fontSize={"20px"}>
                            Previous Guesses: {prevGuesses}
                        </Typography>
                    </>
                )}
            </Box>
        </Container>
    );
}
