const boardElem = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');
let board = Array(9).fill('');
const human = 'X';
const ai = 'O';

// Generate the board
function renderBoard() {
  boardElem.innerHTML = '';
  board.forEach((val, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = i;
    cell.textContent = val;
    if (val) cell.classList.add('disabled');
    cell.addEventListener('click', () => humanTurn(i));
    boardElem.appendChild(cell);
  });
}

function humanTurn(i) {
  if (board[i] === '') {
    makeMove(i, human);
    if (!checkWinner(board, human) && !isTie()) {
      const aiMove = bestSpot();
      makeMove(aiMove, ai);
    }
  }
}

function makeMove(i, player) {
  board[i] = player;
  renderBoard();
  if (checkWinner(board, player)) {
    setTimeout(() => alert(player === human ? 'You win! 🎉' : 'AI wins! 🤖'), 100);
  } else if (isTie()) {
    setTimeout(() => alert("It's a tie! ⚖️"), 100);
  }
}

function checkWinner(b, p) {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo => combo.every(i => b[i] === p));
}

function isTie() {
  return board.every(cell => cell !== '');
}

function bestSpot() {
  return minimax(board, ai).index;
}

function minimax(newBoard, player) {
  const avail = newBoard.map((val, i) => val === '' ? i : null).filter(i => i !== null);

  if (checkWinner(newBoard, human)) return { score: -10 };
  if (checkWinner(newBoard, ai)) return { score: 10 };
  if (avail.length === 0) return { score: 0 };

  const moves = [];
  for (const i of avail) {
    const move = {};
    move.index = i;
    newBoard[i] = player;

    const result = minimax(newBoard, player === ai ? human : ai);
    move.score = result.score;
    newBoard[i] = '';
    moves.push(move);
  }

  let bestMove;
  if (player === ai) {
    let maxScore = -Infinity;
    for (const m of moves) {
      if (m.score > maxScore) {
        maxScore = m.score;
        bestMove = m;
      }
    }
  } else {
    let minScore = Infinity;
    for (const m of moves) {
      if (m.score < minScore) {
        minScore = m.score;
        bestMove = m;
      }
    }
  }
  return bestMove;
}

restartBtn.addEventListener('click', () => {
  board = Array(9).fill('');
  renderBoard();
});

renderBoard();
