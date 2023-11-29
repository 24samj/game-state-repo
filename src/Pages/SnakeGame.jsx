import { useState } from "react";
import "./SnakeGame.css";

const SnakeGamePage = () => {
    const [score, setScore] = useState(0);
    const [foodRow, setFoodRow] = useState(2);
    const [foodCol, setFoodCol] = useState(2);
    const [foodCollected, setFoodCollected] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const initialBoard = [];
    for (let i = 0; i < 10; i++) {
        initialBoard[i] = [];
        for (let j = 0; j < 10; j++) {
            initialBoard[i][j] = "";
        }
    }
    // Place the snake in its starting position
    initialBoard[5][5] = "snake";
    initialBoard[5][6] = "snake";
    initialBoard[5][7] = "snake";
    initialBoard[5][8] = "snake";
    initialBoard[5][9] = "snake";
    // Place the food in its starting position
    initialBoard[2][2] = "food";
    // Set the initial state of the game board
    const [board, setBoard] = useState(initialBoard);
    // Set the initial state of the snake
    const [snake, setSnake] = useState([
        [5, 5],
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
    ]);
    // Set the initial direction of the snake
    const [direction, setDirection] = useState("right");

    const updateBoard = (newDirection) => {
        if (gameOver) {
            return;
        }

        const newBoard = [];
        for (let i = 0; i < 10; i++) {
            newBoard[i] = [];
            for (let j = 0; j < 10; j++) {
                newBoard[i][j] = "";
            }
        }

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
            alert("game over");
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
        // Place the snake on the board
        for (let segment of newSnake) {
            newBoard[segment[0]][segment[1]] = "snake";
        }
        // Update the state
        setBoard(newBoard);
        setSnake(newSnake);
    };

    const resetHandler = () => {
        window.location.reload();
    };

    return (
        <>
            {gameOver ? (
                ""
            ) : (
                <div className="gameBoard d-flex justify-content-center align-items-center">
                    <div className="grid mt-5">
                        {board.map((row, i) => (
                            <div key={i} className="row">
                                {row.map((cell, j) => (
                                    <div
                                        key={j}
                                        className={`cell ${
                                            cell === "snake"
                                                ? "snake"
                                                : cell === "food"
                                                ? "food"
                                                : ""
                                        }`}>
                                        {cell}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {gameOver ? (
                <button onClick={resetHandler}>Reset</button>
            ) : (
                <div className="controls d-flex justify-content-center mt-3">
                    <button
                        onClick={() => {
                            if (direction !== "down") {
                                setDirection("up");
                                updateBoard("up");
                            }
                        }}>
                        Up
                    </button>
                    <button
                        onClick={() => {
                            if (direction !== "up") {
                                setDirection("down");
                                updateBoard("down");
                            }
                        }}>
                        Down
                    </button>
                    <button
                        onClick={() => {
                            if (direction !== "right") {
                                setDirection("left");
                                updateBoard("left");
                            }
                        }}>
                        Left
                    </button>
                    <button
                        onClick={() => {
                            if (direction !== "left") {
                                setDirection("right");
                                updateBoard("right");
                            }
                        }}>
                        Right
                    </button>
                </div>
            )}
            <h2 className="scorecard d-flex justify-content-center mt-3">
                {score}
            </h2>
        </>
    );
};

export default SnakeGamePage;
