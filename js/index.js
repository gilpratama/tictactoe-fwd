document.addEventListener("DOMContentLoaded", function () {
  let boardSize;
  let currentPlayer = "X";
  let moves = 0;
  let gameBoard = [];

  const gameBoardElement = document.getElementById("game-board");
  const resultElement = document.getElementById("result");
  const restartButton = document.createElement("button");

  function initializeGame() {
    // Clear previous game board
    gameBoardElement.innerHTML = "";
    gameBoard = Array.from({ length: boardSize * boardSize }, () => "");

    // Create the game board
    gameBoardElement.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;
    for (let i = 0; i < boardSize * boardSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", handleCellClick);
      gameBoardElement.appendChild(cell);
    }

    // Create the restart button
    restartButton.textContent = "Restart";
    restartButton.addEventListener("click", restartGame);
  }

  function promptForBoardSize() {
    let input = prompt("Enter the size of the board (a number):");
    input = parseInt(input);

    if (!isNaN(input) && input > 0) {
      boardSize = input;
      moves = 0;
      resultElement.textContent = "";
      initializeGame();
    } else {
      alert("Please enter a valid number greater than 0.");
      promptForBoardSize();
    }
  }

  function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.dataset.index);

    if (gameBoard[cellIndex] === "" && !resultElement.textContent) {
      gameBoard[cellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
      moves++;

      if (checkWinner()) {
        resultElement.appendChild(document.createElement("br"));
        resultElement.textContent = `${currentPlayer} wins!`;
        resultElement.appendChild(document.createElement("br"));
        resultElement.appendChild(restartButton);
      } else if (moves === boardSize * boardSize) {
        resultElement.appendChild(document.createElement("br"));
        resultElement.textContent = "It's a draw!";
        resultElement.appendChild(document.createElement("br"));
        resultElement.appendChild(restartButton);
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  // Rest of the code...

  function checkWinner() {
    const winningCombinations = getWinningCombinations();

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        return true;
      }
    }

    return false;
  }

  function getWinningCombinations() {
    const combinations = [];

    // Rows
    for (let i = 0; i < boardSize * boardSize; i += boardSize) {
      for (let j = i; j < i + boardSize; j++) {
        combinations.push([j, j + 1, j + 2]);
      }
    }

    // Columns
    for (let i = 0; i < boardSize; i++) {
      for (let j = i; j < boardSize * boardSize; j += boardSize) {
        combinations.push([j, j + boardSize, j + 2 * boardSize]);
      }
    }

    // Diagonals
    combinations.push([0, boardSize + 1, 2 * boardSize + 2]);
    combinations.push([2, boardSize + 1, 2 * boardSize]);

    return combinations;
  }

  function restartGame() {
    resultElement.textContent = "";
    promptForBoardSize();
  }

  // Initial prompt for board size
  promptForBoardSize();
});
