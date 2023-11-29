import {
    AccessAlarm,
    Accessible,
    AcUnit,
    AddAlarm,
    AirlineSeatFlat,
    AirplanemodeActive,
    AlarmOff,
    Android,
    Announcement,
    Apartment,
} from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import BackHandIcon from "@mui/icons-material/BackHand";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import CampaignIcon from "@mui/icons-material/Campaign";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LuggageIcon from "@mui/icons-material/Luggage";
import StarsIcon from "@mui/icons-material/Stars";
import StyleIcon from "@mui/icons-material/Style";
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function MemoryGamePage() {
    const [imagesArray, setImagesArray] = useState([]);
    const [cardsChosen, setCardsChosen] = useState([]);
    const [cardsChosenIds, setCardsChosenIds] = useState([]);
    const [points, setPoints] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [openCards, setOpenCards] = useState([]);

    const images = [
        <FavoriteIcon fontSize="8rem" sx={{ color: "red" }} />,
        <StarsIcon fontSize="8rem" sx={{ color: "gold" }} />,
        <AccountBalanceWalletIcon fontSize="8rem" sx={{ color: "brown" }} />,
        <AddAPhotoIcon fontSize="8rem" sx={{ color: "darkmagenta" }} />,
        <BackHandIcon fontSize="8rem" sx={{ color: "green" }} />,
        <BatteryChargingFullIcon fontSize="8rem" sx={{ color: "blue" }} />,
        <CampaignIcon fontSize="8rem" sx={{ color: "cyan" }} />,
        <LuggageIcon fontSize="8rem" sx={{ color: "orange" }} />,
        <AcUnit fontSize="8rem" sx={{ color: "teal" }} />,
        <AccessAlarm fontSize="8rem" sx={{ color: "indigo" }} />,
        <Accessible fontSize="8rem" sx={{ color: "purple" }} />,
        <AddAlarm fontSize="8rem" sx={{ color: "pink" }} />,
        <AirlineSeatFlat fontSize="8rem" sx={{ color: "grey" }} />,
        <AirplanemodeActive fontSize="8rem" sx={{ color: "lime" }} />,
        <AlarmOff fontSize="8rem" sx={{ color: "deeppink" }} />,
        <Android fontSize="8rem" sx={{ color: "tomato" }} />,
        <Announcement fontSize="8rem" sx={{ color: "khaki" }} />,
        <Apartment fontSize="8rem" sx={{ color: "peru" }} />,
    ];

    useEffect(() => {
        if (imagesArray.length == openCards.length && openCards.length > 1) {
            setGameWon(true);
        }
    }, [openCards]);

    function createCardBoard() {
        const imagesGenerated = images?.concat(...images);
        const shuffledArray = shuffleArray(imagesGenerated);
        setImagesArray(shuffledArray);
        setOpenCards([]);
    }

    function flipImage(image, index) {
        // check if same card was clicked twice
        if (cardsChosenIds?.length === 1 && cardsChosenIds[0] === index) {
            return;
        }

        if (cardsChosen?.length < 2) {
            setCardsChosen((cardsChosen) => cardsChosen?.concat(image));
            setCardsChosenIds((cardsChosenIds) =>
                cardsChosenIds?.concat(index)
            );

            if (cardsChosen?.length === 1) {
                // Check if images are the same
                if (cardsChosen[0] === image) {
                    setPoints((points) => points + 2);
                    setOpenCards((openCards) =>
                        openCards?.concat([cardsChosen[0], image])
                    );
                }
                setTimeout(() => {
                    setCardsChosenIds([]);
                    setCardsChosen([]);
                }, 700);
            }
        }
    }

    function isCardChosen(image, index) {
        return cardsChosenIds?.includes(index) || openCards?.includes(image);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startOver() {
        setCardsChosenIds([]);
        setCardsChosen([]);
        setPoints(0);
        setOpenCards([]);
    }

    useEffect(() => {
        createCardBoard();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column-reverse", md: "row" },
                alignItems: "center",
                height: { xs: "fit-content", md: "100%" },
                justifyContent: { xs: "center", md: "space-around" },
                paddingY: 2,
            }}>
            <Grid
                container
                spacing={2}
                columns={6}
                alignContent="center"
                justifyContent="center"
                sx={{
                    width: { xs: "100%", sm: "75%", md: "65%", lg: "40%" },
                }}>
                {imagesArray?.map((Img, index) => {
                    return (
                        <Grid
                            key={index + "memoryKeys"}
                            item
                            xs={3}
                            sm={1}
                            md={1}>
                            <Card
                                sx={{
                                    aspectRatio: "1/1",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "5rem",
                                    transition: "transform 0.2s",
                                    "&:hover": {
                                        transform: "scale(1.2)",
                                    },
                                }}
                                key={index}
                                onClick={() => flipImage(Img, index)}>
                                {isCardChosen(Img, index) ? (
                                    Img
                                ) : (
                                    <StyleIcon fontSize="8rem" />
                                )}
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Box margin={2}>
                <Typography variant="h4">Points: {points}</Typography>
                <Button
                    variant="contained"
                    sx={{ fontSize: "1rem", marginTop: 2 }}
                    onClick={startOver}>
                    Start over
                </Button>
            </Box>

            <Dialog open={gameWon} onClose={() => setGameWon(false)}>
                <DialogTitle>You Won!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Great job, you matched all the cards!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            startOver();
                            setGameWon(false);
                        }}>
                        Play Again
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
