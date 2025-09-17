// Tic Tac Toe >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// let cells = document.querySelectorAll(".cell");
// let Status = document.querySelector(".status");
// let reset = document.querySelector(".reset");
// Game1();
// function Game1() {
//   let Human = "X";
//   let AI = "O";
//   let currPlayer = Human;
//   let running = true;
//   let foundWinner = false;

//   let winningPatterns = [
//     [0, 1, 2], //left to right
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6], //top to bottom
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8], // left diagolog
//     [2, 4, 6], //right diagolog
//   ];

//   cells.forEach((cell) => {
//     cell.addEventListener("click", () => {
//       if (running && currPlayer === Human && cell.innerText === "") {
//         cell.innerText = currPlayer;
//         cell.disabled = true;
//         currPlayer = AI;
//         Status.innerText = `PLAYER ${currPlayer} YOUR TURN`;
//         checkWinner();

//         setTimeout(() => {
//           AImove();
//         }, 500);
//       }
//     });
//   });

//   function AImove() {
//     if (running === true && foundWinner === false) {
//       let emptycells = [...cells].filter((c) => c.innerText === "");
//       let randomCells =
//         emptycells[Math.floor(Math.random() * emptycells.length)];
//       if (emptycells.length > 0) {
//         randomCells.innerText = currPlayer;
//         randomCells.disabled = true;
//       }
//       currPlayer = Human;
//       Status.innerText = `PLAYER ${currPlayer} YOUR TURN`;
//       checkWinner();
//     }
//   }

//   function checkWinner() {
//     winningPatterns.forEach((p) => {
//       let pos1 = cells[p[0]].innerText;
//       let pos2 = cells[p[1]].innerText;
//       let pos3 = cells[p[2]].innerText;
//       if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
//         running = false;
//         foundWinner = true;
//         cells.forEach((cell) => {
//           cell.disabled = true;
//         });
//         if (currPlayer === AI) {
//           Status.innerText = `PLAYER X WON`;
//         } else if (currPlayer === Human) {
//           Status.innerText = `PLAYER O WON`;
//         }
//       } else {
//         if (
//           [...cells].every((c) => c.innerText !== "") &&
//           foundWinner !== true
//         ) {
//           Status.innerText = "Game Ended With A Draw";
//         }
//       }
//     });
//   }
//   reset.addEventListener("click", () => {
//     currPlayer = Human;
//     running = true;
//     foundWinner = false;
//     cells.forEach((c) => {
//       c.disabled = false;
//       c.innerText = "";
//     });
//     Status.innerText = "";
//   });
// }

// ai made games
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.querySelector(".status");
const restartButton = document.querySelector(".restart-btn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Main function to start and restart the game
function startGame() {
  isGameActive = true;
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.textContent = "Player X's Turn";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "win");
  });
}

// Function to handle a player's move
function handleCellPlayed(cell, index) {
  if (board[index] !== "" || !isGameActive) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  checkGameResult();

  if (isGameActive) {
    changePlayerTurn();
    if (currentPlayer === "O") {
      setTimeout(aiMove, 500);
    }
  }
}

// Function to check if the game has a winner or a draw
function checkGameResult() {
  let roundWon = false;
  let winningLine = [];

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = board[winCondition[0]];
    let b = board[winCondition[1]];
    let c = board[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      winningLine = winCondition;
      break;
    }
  }

  if (roundWon) {
    if (currentPlayer === "O") {
      statusDisplay.textContent = ` Aya Maza Har Ke 🤣`;
    } else {
      statusDisplay.textContent = `You Won`;
    }
    isGameActive = false;
    highlightWinningCells(winningLine);
    return;
  }

  if (!board.includes("")) {
    statusDisplay.textContent = ` Ab Dikha Geet Ke 💀 `;
    isGameActive = false;
  }
}

// Helper function to visually highlight winning cells
function highlightWinningCells(winningLine) {
  winningLine.forEach((index) => {
    cells[index].classList.add("win");
  });
}

// Function to switch player turns
function changePlayerTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

// --- Minimax AI Logic ---
const aiPlayer = "O";
const humanPlayer = "X";

function aiMove() {
  const bestMove = findBestMove(board);
  if (bestMove !== -1) {
    handleCellPlayed(cells[bestMove], bestMove);
  }
}

function findBestMove(currentBoard) {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < currentBoard.length; i++) {
    if (currentBoard[i] === "") {
      currentBoard[i] = aiPlayer;
      let score = minimax(currentBoard, 0, false);
      currentBoard[i] = ""; // Reset the board
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(currentBoard, depth, isMaximizing) {
  let result = checkWinner(currentBoard);
  if (result !== null) {
    if (result === "O") return 10 - depth;
    if (result === "X") return depth - 10;
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === "") {
        currentBoard[i] = aiPlayer;
        let score = minimax(currentBoard, depth + 1, false);
        currentBoard[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === "") {
        currentBoard[i] = humanPlayer;
        let score = minimax(currentBoard, depth + 1, true);
        currentBoard[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Helper function for minimax to check for winner
function checkWinner(boardState) {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      boardState[a] === boardState[b] &&
      boardState[b] === boardState[c] &&
      boardState[a] !== ""
    ) {
      return boardState[a];
    }
  }
  if (!boardState.includes("")) {
    return "draw";
  }
  return null;
}

// Event listeners
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const cellIndex = parseInt(cell.getAttribute("data-cell-index"));
    handleCellPlayed(cell, cellIndex);
  });
});
restartButton.addEventListener("click", startGame);

// Initial game start
startGame();
