const board = Array(9).fill("");
const player = "X";
const ai = "O";
const boardEl = document.getElementById("gameBoard");

function createBoard() {
  boardEl.innerHTML = "";
  board.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("id", i);
    cell.addEventListener("click", () => handleTurn(i));
    boardEl.appendChild(cell);
  });
}

function handleTurn(index) {
  if (board[index] !== "") return;
  makeMove(index, player);
  if (!checkWinner(board, player) && !isFull(board)) {
    const aiMove = bestMove();
    makeMove(aiMove, ai);
  }
}

function makeMove(index, symbol) {
  board[index] = symbol;
  const cell = document.getElementById(index);
  cell.textContent = symbol;
  cell.classList.add("taken");

  if (checkWinner(board, symbol)) {
    setTimeout(() => alert(`${symbol} wins!`), 100);
  } else if (isFull(board)) {
    setTimeout(() => alert("It's a draw!"), 100);
  }
}

function isFull(board) {
  return board.every(cell => cell !== "");
}

function checkWinner(b, p) {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return combos.some(line => line.every(i => b[i] === p));
}

function bestMove() {
  return minimax(board, ai).index;
}

function minimax(newBoard, currentPlayer) {
  const emptyIndexes = newBoard
    .map((val, idx) => val === "" ? idx : null)
    .filter(idx => idx !== null);

  if (checkWinner(newBoard, player)) return { score: -10 };
  if (checkWinner(newBoard, ai)) return { score: 10 };
  if (emptyIndexes.length === 0) return { score: 0 };

  const moves = [];

  for (let i of emptyIndexes) {
    const move = {};
    move.index = i;
    newBoard[i] = currentPlayer;

    const result = minimax(newBoard, currentPlayer === ai ? player : ai);
    move.score = result.score;

    newBoard[i] = "";
    moves.push(move);
  }

  let best;
  if (currentPlayer === ai) {
    let max = -Infinity;
    for (let move of moves) {
      if (move.score > max) {
        max = move.score;
        best = move;
      }
    }
  } else {
    let min = Infinity;
    for (let move of moves) {
      if (move.score < min) {
        min = move.score;
        best = move;
      }
    }
  }

  return best;
}

function restartGame() {
  for (let i = 0; i < board.length; i++) board[i] = "";
  createBoard();
}

createBoard();
