import React, { useRef, useState } from "react";
import { Grid, Button, Typography, Box } from "@mui/material";
import "./TicTacToePage.css";

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);
    const statusRef = useRef();

    const handleSquareClick = (index) => {
        if (!winner && statusRef.current.innerText !== "Match tied") {
            const newBoard = [...board];
            if (newBoard[index] === "X" || newBoard[index] === "O") {
                return;
            }
            newBoard[index] = xIsNext ? "X" : "O";
            setBoard(newBoard);

            const newWinner = calculateWinner(newBoard);
            if (newWinner) {
                setWinner(newWinner);
                if (newWinner === "X") {
                    setXScore(xScore + 1);
                } else {
                    setOScore(oScore + 1);
                }
            }

            setXIsNext(!xIsNext);
        }
    };

    const handlePlayAgainClick = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setWinner(null);
    };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                squares[a] = <s>{squares[a]}</s>;
                squares[b] = <s>{squares[b]}</s>;
                squares[c] = <s>{squares[c]}</s>;
                return squares[a].props.children;
            }
        }
        return null;
    };

    const renderStatus = () => {
        if (winner) {
            return `Winner: ${winner}`;
        } else if (board.every((square) => square !== null)) {
            return "Match tied";
        } else {
            return `Next player: ${xIsNext ? "X" : "O"}`;
        }
    };

    function renderSquare(index) {
        return (
            <Box
                sx={{
                    width: { sm: "10rem", xs: "5rem" },
                    height: { sm: "10rem", xs: "5rem" },
                    fontSize: { sm: "8rem", xs: "3rem" },
                }}
                className="square"
                onClick={() => handleSquareClick(index)}>
                {board[index]}
            </Box>
        );
    }

    return (
        <Grid
            container
            alignItems="center"
            justifyContent={"center"}
            spacing={4}
            height={"100%"}
            gap={4}
            sx={{ overflowY: "auto" }}>
            <Grid item>
                <Typography variant="h4" ref={statusRef}>
                    {renderStatus()}
                </Typography>
            </Grid>
            <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                gap={20}
                sx={{ marginTop: "-5rem" }}>
                <Grid item>
                    <Typography variant="h6">X Score: {xScore}</Typography>
                </Grid>
                <Box position={"relative"}>
                    <Box className="board-row">
                        {renderSquare(0)}
                        {renderSquare(1)}
                        {renderSquare(2)}
                    </Box>
                    <Box className="board-row">
                        {renderSquare(3)}
                        {renderSquare(4)}
                        {renderSquare(5)}
                    </Box>
                    <Box className="board-row">
                        {renderSquare(6)}
                        {renderSquare(7)}
                        {renderSquare(8)}
                    </Box>
                </Box>
                <Grid item>
                    <Typography variant="h6">O Score: {oScore}</Typography>
                </Grid>
            </Grid>
            <Grid
                item
                container
                justifyContent="center"
                sx={{ marginTop: "-5rem" }}>
                <Button
                    variant="contained"
                    onClick={handlePlayAgainClick}
                    disabled={
                        !winner && !board.every((square) => square !== null)
                    }>
                    Play Again
                </Button>
            </Grid>
        </Grid>
    );
};

export default TicTacToe;
