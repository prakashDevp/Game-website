    document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = Array.from(document.getElementsByClassName('cell'));
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    const playerX = 'X';
    const playerO = 'O';
    let currentPlayer = playerX;
    let boardState = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (boardState[index] || checkWinner()) return;

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
        } else if (boardState.every(cell => cell)) {
            statusText.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === playerX ? playerO : playerX;
            statusText.textContent = `Player ${currentPlayer}s turn`;
        }
    };

    const checkWinner = () => {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    };

    const restartGame = () => {
        boardState.fill(null);
        cells.forEach(cell => (cell.textContent = ''));
        currentPlayer = playerX;
        statusText.textContent = `Player ${currentPlayer}s turn`;
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    statusText.textContent = `Player ${currentPlayer}s turn`;
});