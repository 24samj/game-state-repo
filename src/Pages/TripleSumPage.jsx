import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";

function TripleSumPage() {
    const [selected, setSelected] = useState([]);
    const [target, setTarget] = useState(0);
    const [grid, setGrid] = useState([]);
    const [time, setTime] = useState(30);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [gameStatus, setGameStatus] = useState({
        isWon: false,
        msg: "",
        title: "",
    });

    useEffect(() => {
        prepareNewGridAndTarget();
    }, []);

    useEffect(() => {
        let timerId;
        if (time > 0 && isGameStarted) {
            timerId = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (time === 0 && isGameStarted) {
            setGameStatus({
                isWon: false,
                msg: "Time is up! Game over!",
                title: "You Lost!",
            });
            handleReset();
        }

        return () => clearTimeout(timerId);
    }, [time, isGameStarted]);

    const handleClick = (index) => {
        setIsGameStarted(true);
        if (selected.includes(index)) {
            setSelected(selected.filter((value) => value !== index));
        } else {
            setSelected([...selected, index]);
        }
    };

    const prepareNewGridAndTarget = () => {
        let newGrid = Array.from(
            { length: 16 },
            () => Math.floor(Math.random() * 10) + 1
        );
        setGrid(newGrid);
        setTarget(newTarget(newGrid));
    };

    const handleReset = () => {
        setIsGameStarted(false);
        setTime(30);
        setSelected([]);
        prepareNewGridAndTarget();
    };

    const checkSum = (arr, target) => {
        let selectedNums = selected.map((el) => arr[el]);
        return selectedNums.reduce((a, b) => a + b, 0) === target;
    };

    const handleSubmit = () => {
        if (checkSum(grid, target)) {
            setGameStatus({
                isWon: true,
                msg: "You guessed it right. You're a rockstar.",
                title: "You Won.",
            });
        } else {
            setGameStatus({
                isWon: false,
                msg: "Oops, thats quite not right. Please try again!",
                title: "You Lost.",
            });
        }
    };

    // Randomly chooses three numbers from the grid of numbers
    // and sets their sum as target
    function newTarget(arr) {
        let threeIndx = [];
        while (threeIndx.length < 3) {
            const x = Math.floor(Math.random() * 16);
            if (threeIndx.every((ind) => ind !== x)) {
                threeIndx.push(x);
            }
        }
        return threeIndx.map((el) => arr[el]).reduce((a, b) => a + b, 0);
    }

    return (
        <Box
            sx={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                marginX: 2,
            }}>
            <Typography variant="h6" marginBottom={4}>
                Choose three numbers from below that add up to the given target
                number.
            </Typography>
            <Grid container spacing={2}>
                {grid.length &&
                    grid.map((value, index) => (
                        <Grid item xs={3} key={index}>
                            <Button
                                style={{ fontSize: "16px" }}
                                variant={
                                    selected.includes(index)
                                        ? "contained"
                                        : "outlined"
                                }
                                onClick={() => handleClick(index)}
                                disabled={
                                    selected.length === 3 &&
                                    !selected.includes(index)
                                }
                                fullWidth>
                                {value}
                            </Button>
                        </Grid>
                    ))}
            </Grid>
            <div style={{ marginTop: "20px", fontSize: "24px" }}>
                Target: <strong>{target}</strong>
            </div>
            <div style={{ marginTop: "20px" }}>
                <Button
                    variant="contained"
                    onClick={handleReset}
                    style={{ marginLeft: "20px" }}>
                    Reset
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={selected.length !== 3}
                    style={{ marginLeft: "20px" }}>
                    Submit
                </Button>
                <div style={{ marginTop: "20px" }}>
                    {isGameStarted ? (
                        <strong>Time Left: </strong>
                    ) : (
                        <strong>Select a number to begin! </strong>
                    )}
                </div>
                {time} seconds
            </div>
            <Dialog
                open={gameStatus.msg.length > 0}
                onClose={() =>
                    setGameStatus({ isWon: false, msg: "", title: "" })
                }>
                <DialogTitle>{gameStatus.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{gameStatus.msg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setGameStatus({ isWon: false, msg: "", title: "" });
                            handleReset();
                        }}>
                        Play Again
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default TripleSumPage;
