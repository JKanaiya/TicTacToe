const createPlayer = function (initialName) {
  let name = initialName;
  let wins = 0;
  function incrementWins() {
    wins++;
    if (wins === 5) {
      console.log(`${name} wins`);
    }
  }
  function resetWins() {
    wins = 0;
  }
  function getName() {
    return initialName;
  }
  function getWins() {
    return wins;
  }
  return {
    getName,
    getWins,
    incrementWins,
    resetWins,
  };
};
const player1 = createPlayer(document.getElementById("player1").value);
const player2 = createPlayer(document.getElementById("player2").value);
let player = player1;
let gameActive = true;
const gameState = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let iCount = 0,
    j = 0;
  function checkWins() {
    // check horizon/vert
    for (i = 0; i < 3; i++) {
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][0] === this.board[i][2] &&
        this.board[i][1] !== 0
      ) {
        // player.incrementWins();
        for (j = 0; j < 3; j++) {
          document.getElementById(i + "," + j).style.backgroundColor =
            "#AAFAC8";
        }
        player.incrementWins();
        iCount = 1;
        gameActive = false;
        break;
      }
      //   check horizontal
      if (
        this.board[0][i] === this.board[1][i] &&
        this.board[0][i] === this.board[2][i] &&
        this.board[0][i] !== 0
      ) {
        // player.incrementWins();
        player.incrementWins();
        for (j = 0; j < 3; j++) {
          document.getElementById(j + "," + i).style.backgroundColor =
            "#AAFAC8";
        }
        iCount = 1;
        gameActive = false;
        break;
      }
    }
    //  check diagonal
    if (
      (this.board[0][0] === this.board[1][1] &&
        this.board[1][1] === this.board[2][2] &&
        this.board[1][1] !== 0) ||
      (this.board[2][0] == this.board[1][1] &&
        this.board[1][1] == this.board[0][2] &&
        this.board[1][1] !== 0)
    ) {
      //   player.incrementWins();
      if (this.board[0][0] == this.board[1][1]) {
        for (j = 0; j < 3; j++) {
          document.getElementById(j + "," + j).style.backgroundColor =
            "#AAFAC8";
        }
      } else {
        i = 2;
        for (j = 0; j < 3; j++) {
          document.getElementById(i + "," + j).style.backgroundColor =
            "#AAFAC8";
          i--;
        }
      }
      player.incrementWins();
      console.log(player.getWins());
      gameActive = false;
      iCount = 1;
    }
  }
  function endGame() {
    gameState.board = board.map(() => board.map(() => 0));
    Display.clearDisplay();
    iCount = 1;
    gameActive = true;
    console.log(player1.getName());
    document.getElementById(
      "Score1"
    ).textContent = `${player1.getName()} : ${player1.getWins()}`;
    document.getElementById(
      "Score2"
    ).textContent = `${player2.getName()} : ${player2.getWins()}`;
  }
  function incrementPlays() {
    ++iCount;
    console.log(iCount);
    if (iCount == 9) {
      alert(`no player wins`);
      endGame();
    }
  }
  return {
    board,
    incrementPlays,
    checkWins,
    endGame,
  };
})();
const play = (function () {
  let iCount = 1,
    i = 0,
    j = 0;
  player = player2;
  board.addEventListener("click", (event) => pastel(event));
  function pastel(event) {
    let target = event.target;
    let values = target.id.split(",");
    let i = parseInt(values[0]);
    let j = parseInt(values[1]);
    if (gameState.board[i][j] == 0 && gameActive == true) {
      player = player === player1 ? player2 : player1;
      if (player == player1) {
        document.getElementById(values).innerHTML = "X";
        gameState.board[i][j] = "X";
        console.log("special");
        gameState.incrementPlays();
        gameState.checkWins();
      } else {
        document.getElementById(values).innerHTML = "O";
        gameState.board[i][j] = "O";
        console.log("days");
        gameState.checkWins();
        gameState.incrementPlays();
      }
    }
    if (iCount >= 5) {
      gameState.checkWins(player);
    }
  }
  function initBoard() {
    iCount = 1;
    let board = document.getElementById("board");
  }
  return {
    pastel,
    initBoard,
    iCount,
  };
})();
const Display = (function () {
  function populate() {
    let parent = document.getElementById("board");
    gameState.board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        let b = document.createElement("div");
        b.setAttribute("id", rowIndex + "," + colIndex);
        parent.appendChild(b);
      });
    });
  }
  function clearDisplay() {
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        let values = i + "," + j;
        document.getElementById(values).innerHTML = "";
        document.getElementById(values).style.backgroundColor = "#9C7178";
      }
    }
    player = player2;
  }
  return {
    populate,
    clearDisplay,
  };
})();
Display.populate();
play.initBoard();
