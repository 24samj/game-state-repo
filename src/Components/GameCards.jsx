import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function GameCards({ name, icon }) {
    const navigate = useNavigate();
    function handleNavigation(name) {
        switch (name) {
            case "Tic Tac Toe":
                navigate("/tictactoe");
                break;
            case "Hangman":
                navigate("/hangman");
                break;
            case "Number Guesser":
                navigate("/guessnumber");
                break;
            case "Memory Game":
                navigate("/memorygame");
                break;
            case "Triple Sum":
                navigate("/triplesum");
                break;
            case "Snake":
                navigate("/snake");
                break;
            default:
                alert("Invalid route!");
        }
    }
    return (
        <Card
            onClick={() => handleNavigation(name)}
            sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: { xs: 150, sm: 300 },
                width: { xs: 100, sm: "min-content" },
                margin: 2,
                "&:hover": {
                    transform: "scale(1.2)",
                    boxShadow: 3,
                },
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: 2,
                padding: 1,
            }}>
            <CardMedia
                component={"img"}
                image={icon}
                sx={{ height: "fit-content", width: { xs: 50, sm: 150 } }}
            />
            <CardActionArea>
                <CardContent>
                    <Typography
                        fontSize={{ xs: "1rem", sm: "2rem" }}
                        variant="h3"
                        lineHeight={1}
                        marginBottom={2}
                        textAlign={"center"}
                        fontWeight={"semiBold"}>
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default GameCards;
