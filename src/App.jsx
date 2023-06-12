import "./index.css";
import { useState } from "react";
import { checkwinner, checkEndGame } from "./logic/ganador";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { Winner } from "./components/Winner";
import { VscGithub } from "react-icons/vsc";
import { GrLinkedin } from "react-icons/gr";

function App() {
  const [board, setBoard] = useState(() => {
    const BoardFromStorage = window.localStorage.getItem("board");
    return BoardFromStorage
      ? JSON.parse(BoardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const TurnFromStorage = window.localStorage.getItem("turn");
    return TurnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const updateBoard = (index) => {
    // Comprobamos si ya esta posicion esta tomada

    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //guardamos la partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    const newWinner = checkwinner(newBoard);
    console.log(newWinner);
    if (newWinner) {
      setWinner(newWinner);
      //confetti();
      confetti({
        particleCount: 150,
        spread: 180,
      });
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };
  return (
    <main className="board">
      <h1>3 EN RAYA</h1>
      <button onClick={handleReset}>Empezar de nuevo</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <section className="info">
        <a
          href="https://github.com/Nestoralons"
          target="_blank"
          rel="noopener noreferrer"
        >
          <VscGithub size={{ size: "70px" }} />
        </a>
        <a
          href="https://www.linkedin.com/in/nestoralons/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GrLinkedin size={{ size: "70px" }} />
        </a>
      </section>
      <Winner winner={winner} handleReset={handleReset} />
    </main>
  );
}

export default App;
