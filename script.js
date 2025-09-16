// Tic Tac Toe >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let cells = document.querySelectorAll(".cell");
let Status = document.querySelector(".status");
let reset = document.querySelector(".reset");
Game1();
function Game1() {
  let Human = "X";
  let AI = "O";
  let currPlayer = Human;
  let running = true;
  let foundWinner = false;

  let winningPatterns = [
    [0, 1, 2], //left to right
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], //top to bottom
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // left diagolog
    [2, 4, 6], //right diagolog
  ];

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (running && currPlayer === Human && cell.innerText === "") {
        cell.innerText = currPlayer;
        cell.disabled = true;
        currPlayer = AI;
        Status.innerText = `PLAYER ${currPlayer} YOUR TURN`;
        checkWinner();

        setTimeout(() => {
          AImove();
        }, 500);
      }
    });
  });

  function AImove() {
    if (running === true && foundWinner === false) {
      let emptycells = [...cells].filter((c) => c.innerText === "");
      let randomCells =
        emptycells[Math.floor(Math.random() * emptycells.length)];

      if (emptycells.length > 0) {
        randomCells.innerText = currPlayer;
        randomCells.disabled = true;
      }
      currPlayer = Human;
      Status.innerText = `PLAYER ${currPlayer} YOUR TURN`;
      checkWinner();
    }
  }

  function checkWinner() {
    winningPatterns.forEach((p) => {
      let pos1 = cells[p[0]].innerText;
      let pos2 = cells[p[1]].innerText;
      let pos3 = cells[p[2]].innerText;
      if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
        running = false;
        foundWinner = true;
        cells.forEach((cell) => {
          cell.disabled = true;
        });
        if (currPlayer === AI) {
          Status.innerText = `PLAYER X WON`;
        } else if (currPlayer === Human) {
          Status.innerText = `PLAYER O WON`;
        }
      } else {
        if (
          [...cells].every((c) => c.innerText !== "") &&
          foundWinner !== true
        ) {
          Status.innerText = "Game Ended With A Draw";
        }
      }
    });
  }
  reset.addEventListener("click", () => {
    currPlayer = Human;
    running = true;
    foundWinner = false;
    cells.forEach((c) => {
      c.disabled = false;
      c.innerText = "";
    });
    Status.innerText = "";
  });
}
