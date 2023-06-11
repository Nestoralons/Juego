import { Square } from "./Square";
export const Winner = ({ winner, handleReset }) => {
  if (winner === null) return null;
  const WinnerText = winner === false ? "Empate" : "Ganó:";
  return (
    <section className="winner">
      <div className="text">
        <h2>{WinnerText}</h2>
        <header className="win">{winner && <Square>{winner}</Square>}</header>
        <footer>
          <button onClick={handleReset}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
};
