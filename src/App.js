import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
    AppBar,
    createTheme,
    CssBaseline,
    IconButton,
    ThemeProvider,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import GuessNumPage from "./Pages/GuessNumPage";
import HangManPage from "./Pages/HangManPage";
import HomePage from "./Pages/HomePage";
import MemoryGamePage from "./Pages/MemoryGamePage";
import TripleSumPage from "./Pages/TripleSumPage";
import TicTacToePage from "./Pages/TicTacToePage";
import SnakeGamePage from "./Pages/SnakeGame";

import "./App.css";

export default function App() {
    const [toggleDark, setToggleDark] = useState(false);
    const myTheme = createTheme({
        palette: {
            mode: toggleDark ? "dark" : "light",
        },
    });
    const urlPath = useLocation();
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={myTheme}>
            <CssBaseline />
            <div className="App">
                <AppBar position="sticky">
                    <Toolbar>
                        {urlPath.pathname == "/" || (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={() =>
                                    navigate("/", { replace: true })
                                }>
                                <HomeIcon />
                            </IconButton>
                        )}
                        <Typography
                            variant="h6"
                            component="div"
                            fontWeight="bold"
                            sx={{ flexGrow: 1 }}>
                            Games
                        </Typography>
                        <Tooltip
                            title={toggleDark ? "Light Mode" : "Dark Mode"}>
                            <IconButton
                                onClick={() => setToggleDark(!toggleDark)}
                                color="inherit">
                                {toggleDark ? (
                                    <LightModeIcon />
                                ) : (
                                    <DarkModeIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/tictactoe" element={<TicTacToePage />} />
                    <Route path="/hangman" element={<HangManPage />} />
                    <Route path="/guessnumber" element={<GuessNumPage />} />
                    <Route path="/memorygame" element={<MemoryGamePage />} />
                    <Route path="/triplesum" element={<TripleSumPage />} />
                    <Route path="/snake" element={<SnakeGamePage />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}
