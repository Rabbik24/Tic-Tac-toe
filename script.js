const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

let boardState = Array(9).fill(null);  // Array to store the state of the board

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    // If the cell is already filled or the game is over, return
    if (boardState[cellIndex] !== null || !gameActive) return;

    // Update board state and the UI
    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(`active-${currentPlayer}`); // Add animation class for 'X' or 'O'

    // Check if there's a winner or a draw
    if (checkWinner(currentPlayer)) {
        statusMessage.textContent = `Player ${currentPlayer} wins!`;
        highlightWinningCells(currentPlayer);
        gameActive = false;
    } else if (boardState.every(cell => cell !== null)) {
        statusMessage.textContent = "It's a draw!";
        gameActive = false;
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check if the current player has won
function checkWinner(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === player;
        });
    });
}

// Highlight the winning cells
function highlightWinningCells(player) {
    winningCombinations.forEach(combination => {
        if (combination.every(index => boardState[index] === player)) {
            combination.forEach(index => {
                cells[index].classList.add('win'); // Add winning animation
            });
        }
    });
}

// Function to restart the game
function restartGame() {
    boardState.fill(null);  // Reset the board state
    cells.forEach(cell => {
        cell.textContent = '';  // Clear the UI
        cell.classList.remove('active-X', 'active-O', 'win');  // Remove all added classes
    });
    currentPlayer = 'X';  // Reset to Player X
    gameActive = true;  // Re-activate the game
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;  // Reset status message
}

// Add event listeners to the cells and restart button
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

// Set initial message
statusMessage.textContent = `Player ${currentPlayer}'s turn`;
