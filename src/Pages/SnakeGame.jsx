import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";
import snakeFood from "../Images/snakeFood.png";
import "./SnakeGame.css";

const SnakeGamePage = () => {
    const [score, setScore] = useState(0);
    const [foodRow, setFoodRow] = useState(2);
    const [foodCol, setFoodCol] = useState(2);
    const [foodCollected, setFoodCollected] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const initialBoard = Array.from({ length: 10 }, () => Array(10).fill(""));
    initialBoard[5][5] = "snake";
    initialBoard[5][6] = "snake";
    initialBoard[5][7] = "snake";
    initialBoard[5][8] = "snake";
    initialBoard[5][9] = "snake";
    initialBoard[2][2] = "food";

    const [board, setBoard] = useState(initialBoard);
    const [snake, setSnake] = useState([
        [5, 5],
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
    ]);
    const [direction, setDirection] = useState("right");

    const updateBoard = (newDirection) => {
        if (gameOver) {
            return;
        }

        const newBoard = Array.from({ length: 10 }, () => Array(10).fill(""));

        if (!foodCollected) {
            newBoard[foodRow][foodCol] = "food";
        }

        let newSnake = [...snake];
        let head = newSnake[newSnake.length - 1];
        if (newDirection === "right") {
            head = [head[0], head[1] + 1];
        } else if (newDirection === "left") {
            head = [head[0], head[1] - 1];
        } else if (newDirection === "up") {
            head = [head[0] - 1, head[1]];
        } else if (newDirection === "down") {
            head = [head[0] + 1, head[1]];
        }

        for (let segment of newSnake) {
            if (segment[0] === head[0] && segment[1] === head[1]) {
                setGameOver(true);
                return;
            }
        }

        if (head[0] < 0 || head[0] >= 10 || head[1] < 0 || head[1] >= 10) {
            setGameOver(true);
            return;
        }

        if (head[0] === foodRow && head[1] === foodCol) {
            setScore(score + 1);
            setFoodCollected(true);

            let newFoodRow, newFoodCol;
            do {
                newFoodRow = Math.floor(Math.random() * 10);
                newFoodCol = Math.floor(Math.random() * 10);
            } while (
                newBoard[newFoodRow][newFoodCol] === "snake" ||
                (newFoodRow === foodRow && newFoodCol === foodCol)
            );
            setFoodRow(newFoodRow);
            setFoodCol(newFoodCol);

            newBoard[newFoodRow][newFoodCol] = "food";
            setFoodCollected(false);
        } else {
            newSnake.shift();
        }
        newSnake.push(head);

        for (let segment of newSnake) {
            newBoard[segment[0]][segment[1]] = "snake";
        }

        setBoard(newBoard);
        setSnake(newSnake);
    };

    const resetHandler = () => {
        setGameOver(false);
        setFoodRow(2);
        setFoodCol(2);
        setBoard(initialBoard);
        setSnake([
            [5, 5],
            [5, 6],
            [5, 7],
            [5, 8],
            [5, 9],
        ]);
        setScore(0);
    };

    return (
        <>
            <Box
                className="gameBoard"
                sx={{ flexDirection: "row", marginTop: "5vh" }}>
                {!gameOver && (
                    <Typography variant="h6" className="gameInfo">
                        Collect the food!
                    </Typography>
                )}
                <Box className="grid ">
                    {board.map((row, i) => (
                        <Box key={i} className="row">
                            {row.map((cell, j) => (
                                <Box
                                    key={j}
                                    className={`cell ${
                                        cell === "snake"
                                            ? j ===
                                                  snake[snake.length - 1][1] &&
                                              i === snake[snake.length - 1][0]
                                                ? "snake-head"
                                                : "snake"
                                            : cell === "food"
                                            ? "food"
                                            : ""
                                    }`}>
                                    {cell === "food" && (
                                        <img
                                            src={snakeFood}
                                            alt="food"
                                            className="food-image"
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
                {!gameOver && (
                    <Typography variant="h6" className="gameInfo">
                        Don't hit the walls!
                    </Typography>
                )}
            </Box>

            {!gameOver && (
                <Box className="controls" sx={{ marginTop: "3vh" }}>
                    <Button
                        variant="contained"
                        className="controlBtn"
                        onClick={() => {
                            if (direction !== "down") {
                                setDirection("up");
                                updateBoard("up");
                            }
                        }}>
                        Up
                    </Button>
                    <Button
                        variant="contained"
                        className="controlBtn"
                        onClick={() => {
                            if (direction !== "up") {
                                setDirection("down");
                                updateBoard("down");
                            }
                        }}>
                        Down
                    </Button>
                    <Button
                        variant="contained"
                        className="controlBtn"
                        onClick={() => {
                            if (direction !== "right") {
                                setDirection("left");
                                updateBoard("left");
                            }
                        }}>
                        Left
                    </Button>
                    <Button
                        variant="contained"
                        className="controlBtn"
                        onClick={() => {
                            if (direction !== "left") {
                                setDirection("right");
                                updateBoard("right");
                            }
                        }}>
                        Right
                    </Button>
                </Box>
            )}
            {!gameOver && (
                <Typography
                    variant="h6"
                    className="scorecard"
                    sx={{ marginTop: "3vh" }}>
                    Points: {score}
                </Typography>
            )}
            <Dialog open={gameOver} onClose={() => resetHandler}>
                <DialogTitle>Game Over!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your score was {score}.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            resetHandler();
                        }}>
                        Play Again
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SnakeGamePage;
