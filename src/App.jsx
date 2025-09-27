import "./App.css";
import Button from "@mui/material/Button";
import SplitText from "./SplitText";
import AnimatedContent from "./AnimatedContent";
import BlurText from "./BlurText";
import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [turn, setTurn] = useState("player 1's turn : X");
  const [buttons, setButtons] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
    { id: 5, value: "" },
    { id: 6, value: "" },
    { id: 7, value: "" },
    { id: 8, value: "" },
    { id: 9, value: "" },
  ]);
  const [players, setPlayers] = useState([
    { player1: true, statuswin1: false, moves: [] },
    { playes2: false, statuswin1: false, moves: [] },
  ]);

  // toutes les combinaisons gagnantes
  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const handlecheck = (e) => {
    const id = parseInt(e.currentTarget.getAttribute("customkey"));

    if (buttons[id - 1].value !== "" || players[0].statuswin1 || players[1].statuswin1) return;

    if (players[0].player1) {
      const newButtons = [...buttons];
      newButtons[id - 1].value = "X";
      const newMoves = [...players[0].moves, id];

      let win = false;
      winningCombinations.map((combination) => {
        let count = 0;
        combination.map((item) => {
          if (newMoves.includes(item)) count++;
        });
        if (count === 3) win = true;
      });

      setButtons(newButtons);
      setPlayers([
        { player1: false, statuswin1: win, moves: newMoves },
        { ...players[1], playes2: true },
      ]);
      setTurn("player 2's turn : O");
    } else {
      const newButtons = [...buttons];
      newButtons[id - 1].value = "O";
      const newMoves = [...players[1].moves, id];

      let win = false;
      winningCombinations.map((combination) => {
        let count = 0;
        combination.map((item) => {
          if (newMoves.includes(item)) count++;
        });
        if (count === 3) win = true;
      });

      setButtons(newButtons);
      setPlayers([
        { ...players[0], player1: true },
        { playes2: false, statuswin1: win, moves: newMoves },
      ]);
      setTurn("player 1's turn : X");
    }
  };

  // reset du jeu
  const resetGame = () => {
    setButtons([
      { id: 1, value: "" },
      { id: 2, value: "" },
      { id: 3, value: "" },
      { id: 4, value: "" },
      { id: 5, value: "" },
      { id: 6, value: "" },
      { id: 7, value: "" },
      { id: 8, value: "" },
      { id: 9, value: "" },
    ]);
    setPlayers([
      { player1: true, statuswin1: false, moves: [] },
      { playes2: false, statuswin1: false, moves: [] },
    ]);
    setTurn("player 1's turn : X");
  };

  return (
    <>
      <h1>
        <SplitText
          text="Tic Tac Toe Game"
          className="title"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </h1>

      {!players[0].statuswin1 && !players[1].statuswin1 && (
        <h5>
          <BlurText
            text={turn}
            className="title2"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </h5>
      )}

      <AnimatedContent
        distance={450}
        direction="horizontal"
        reverse={false}
        duration={1.0}
        ease="bounce.out"
        initialOpacity={0}
        animateOpacity
        scale={1.1}
        threshold={0.2}
        delay={0.3}
      >
        <div
          style={{
            backgroundColor: "rgb(204, 204, 204)",
            width: "90%",
            maxWidth: "400px",
            aspectRatio: "1",
            margin: "0 auto",
            top: "-100px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexFlow: "row wrap",
            borderRadius: "35px",
          }}
        >
          {buttons.map((btn) => (
            <Button
              key={btn.id}
              customkey={btn.id}
              onClick={handlecheck}
              disabled={players[0].statuswin1 || players[1].statuswin1}
              variant="contained"
              sx={{
                backgroundColor: "white",
                height: { xs: "80px", sm: "100px", md: "120px" },
                width: { xs: "80px", sm: "100px", md: "120px" },
                borderRadius: "50%",
                fontSize: { xs: "28px", sm: "36px", md: "50px" },
                fontWeight: "bold",
                color: btn.value === "X" ? "green" :"red" ,
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                },
              }}
            >
              {btn.value}
            </Button>
          ))}
        </div>
      </AnimatedContent>

      {players[0].statuswin1 && (
        <motion.h2
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          style={{
            color: "green",
            textAlign: "center",
            marginTop: "20px",
            textShadow: "0 0 15px rgba(0,255,0,0.7)",
          }}
        >
           Player 1 Wins! 
        </motion.h2>
      )}

      {players[1].statuswin1 && (
        <motion.h2
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          style={{
            color: "red",
            textAlign: "center",
            marginTop: "20px",
            textShadow: "0 0 15px rgba(255,0,0,0.7)",
          }}
        >
           Player 2 Wins! 
        </motion.h2>
      )}

      {(players[0].statuswin1 || players[1].statuswin1) && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            variant="contained"
            onClick={resetGame}
            sx={{
              padding: "10px 20px",
              fontSize: { xs: "14px", sm: "16px", md: "18px" },
              borderRadius: "12px",
              backgroundColor: "#1976d2",
              color: "white",
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor: "#125ca1",
                transform: "scale(1.05)",
              },
            }}
          >
             Play Again
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
