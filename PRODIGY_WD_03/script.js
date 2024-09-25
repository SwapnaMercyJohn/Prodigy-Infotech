const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const messageDiv = document.getElementById('message');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

function handleClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (board[index] !== '' || !isGameActive) {
    return;
  }

  board[index] = currentPlayer;
  cell.innerText = currentPlayer;

  if (checkWinner()) {
    messageDiv.innerText = `${currentPlayer} Wins!`;
    isGameActive = false;
  } else if (board.every(cell => cell !== '')) {
    messageDiv.innerText = "It's a draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  cells.forEach(cell => cell.innerText = '');
  messageDiv.innerText = '';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
