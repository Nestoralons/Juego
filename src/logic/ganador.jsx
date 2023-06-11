export const checkwinner = (boardToChek) => {
  let n = 0;
  while (n < 9) {
    if (
      n % 3 == false &&
      boardToChek[n] &&
      boardToChek[n] === boardToChek[n + 1] &&
      boardToChek[n] === boardToChek[n + 2]
    ) {
      return boardToChek[n];
    } else if (
      n < 3 &&
      boardToChek[n] &&
      boardToChek[n] === boardToChek[n + 3] &&
      boardToChek[n] === boardToChek[n + 6]
    ) {
      return boardToChek[n];
    } else if (
      n === 0 &&
      boardToChek[n] &&
      boardToChek[n] === boardToChek[n + 4] &&
      boardToChek[n] === boardToChek[n + 8]
    ) {
      return boardToChek[n];
    } else if (
      n === 2 &&
      boardToChek[n] &&
      boardToChek[n] === boardToChek[n + 2] &&
      boardToChek[n] === boardToChek[n + 4]
    ) {
      return boardToChek[n];
    }
    n++;
  }
  return null;
};
export const checkEndGame = (newBoard) => {
  return !newBoard.includes(null);
};
