const board = document.getElementById('board');
const restartBtn = document.getElementById('restartBtn');
let grid = Array(9).fill("");
const player = "X", ai = "O";

// Create 9 cells dynamically
function setupBoard() {
  board.innerHTML = "";
  grid.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = i;
    cell.addEventListener('click', () => makeMove(i));
    board.appendChild(cell);
  });
}

// Basic gameplay logic (optional AI logic to be added)
function makeMove(i) {
  if (grid[i] === "") {
    grid[i] = player;
    document.getElementById(i).textContent = player;
    document.getElementById(i).classList.add('disabled');
    // Add your AI or win-check logic here
  }
}

restartBtn.addEventListener("click", () => {
  grid = Array(9).fill("");
  setupBoard();
});

setupBoard();
