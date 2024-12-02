let gameState = {
    board: Array(9).fill(""),
    turn: "X",
    winner: null,
};

function checkWhoHasTheSeries(cells) {
    const [a, b, c] = cells;
    const values = [gameState.board[a], gameState.board[b], gameState.board[c]];
    if (values.every(val => val === "X")) return "X";
    if (values.every(val => val === "O")) return "O";
    return null;
}

function whoIsWinner() {
    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal (top-left to bottom-right)
        [2, 4, 6], // Diagonal (top-right to bottom-left)
    ];

    for (const combination of winningCombinations) {
        const winner = checkWhoHasTheSeries(combination);
        if (winner) return winner;
    }

    return gameState.board.includes("") ? null : "Draw";
}

function resetGame() {
    gameState.board = Array(9).fill("");
    gameState.turn = "X";
    gameState.winner = null;
    renderBoard();
}

function handleCellClick(index) {
    if (gameState.winner || gameState.board[index]) return;

    gameState.board[index] = gameState.turn;
    gameState.winner = whoIsWinner();
    if (!gameState.winner) {
        gameState.turn = gameState.turn === "X" ? "O" : "X";
    }
    renderBoard();
}

function renderBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";

    gameState.board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");

        if (gameState.winner) {
            // If the game is over, hide unchosen cells
            if (!cell) {
                cellElement.textContent = "";
            } else {
                cellElement.classList.add(cell); // Add 'X' or 'O' styling
                cellElement.textContent = cell;
            }
        } else if (cell) {
            // If cell is chosen, show the choice
            cellElement.classList.add(cell);
            cellElement.textContent = cell;
        } else {
            // Add button for unchosen cells
            const button = document.createElement("button");
            button.textContent = gameState.turn;
            button.onclick = () => handleCellClick(index);
            cellElement.appendChild(button);
        }

        boardElement.appendChild(cellElement);
    });

    const messageElement = document.getElementById("message");
    if (gameState.winner) {
        messageElement.textContent =
            gameState.winner === "Draw"
                ? "It's a Draw!"
                : `The winner is ${gameState.winner}!`;
    } else {
        messageElement.textContent = `Turn: ${gameState.turn}`;
    }
}

document.getElementById("reset").onclick = resetGame;

// Initial render
resetGame();
