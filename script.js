const boardElem = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');
let board = Array(9).fill('');
const human = 'X', ai = 'O';

// Create the board
board.forEach((_, i) => {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.id = i;
  cell.addEventListener('click', () => humanTurn(i));
  boardElem.appendChild(cell);
});

function humanTurn(i) {
  if (board[i] === '') {
    makeMove(i, human);
    if (!checkWin(board, human) && !isTie(board)) {
      const aiMove = bestSpot();
      makeMove(aiMove, ai);
    }
  }
}

function makeMove(i, player) {
  board[i] = player;
  document.getElementById(i).innerText = player;
  document.getElementById(i).classList.add('disabled');
  if (checkWin(board, player)) {
    endGame(player === human ? "You win!" : "You lose.");
  } else if (isTie(board)) {
    endGame("Tie game!");
  }
}

function endGame(msg) {
  alert(msg);
  ubahBoardDisabled(true);
}

restartBtn.addEventListener('click', () => startGame());

function startGame() {
  board.fill('');
  Array.from(document.getElementsByClassName('cell')).forEach(c => {
    c.innerText = '';
    c.classList.remove('disabled');
  });
}

function checkWin(b, p) {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return combos.some(combo => combo.every(i => b[i] === p));
}

function isTie(b) {
  return b.every(s => s !== '');
}

function bestSpot() { return minimax(board, ai).index; }

function minimax(newBoard, player) {
  const avail = newBoard.map((s,i)=>s===''?i:null).filter(i=>i!==null);
  if (checkWin(newBoard, human)) return {score: -10};
  if (checkWin(newBoard, ai)) return {score: 10};
  if (avail.length === 0) return {score: 0};

  const moves = [];
  avail.forEach(i => {
    const move = {};
    move.index = i;
    newBoard[i] = player;
    const result = minimax(newBoard, player === ai ? human : ai);
    move.score = result.score;
    newBoard[i] = '';
    moves.push(move);
  });

  let bestMove;
  if (player === ai) {
    let bestScore = -Infinity;
    moves.forEach(m => {
      if (m.score > bestScore) { bestScore = m.score; bestMove = m; }
    });
  } else {
    let bestScore = Infinity;
    moves.forEach(m => {
      if (m.score < bestScore) { bestScore = m.score; bestMove = m; }
    });
  }
  return bestMove;
}
