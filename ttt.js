const player1 = (function () {
  let wins = 0;
  let name = document.getElementById("player1").value;
  function incrementWins() {
    wins++;
  }
  function resetWins() {
    wins = 0;
  }
  return {
    name,
    wins,
    incrementWins,
    resetWins,
  };
})();
const player2 = (function () {
  let wins = 0;
  let name = document.getElementById("player2").value;
  function incrementWins() {
    wins++;
  }
  function resetWins() {
    wins = 0;
  }
  return {
    wins,
    name,
    incrementWins,
    resetWins,
  };
})();
const gameState = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  function checkWins(player) {
    // check vertical
    for (i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2] &&
        board[i][1] !== 0
      ) {
        player.incrementWins();
        endGame();
        break;
      }
      //   check horizontal
      if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i] &&
        board[0][i] !== 0
      ) {
        player.incrementWins();
        endGame();
        break;
      }
    }
    //  check diagonal
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[1][1] !== 0
    ) {
      player.incrementWins();
      endGame();
    }
    if (
      board[2][0] == board[1][1] &&
      board[1][1] == board[0][2] &&
      board[1][1] !== 0
    ) {
      player.incrementWins();
      endGame();
    }
  }
  function endGame() {
    // reset board
    iCount = 0;
    if (player1.wins > player2.wins && play.iCount > 5) {
      Display.stateWinner(player1);
    } else {
      Display.stateWinner(player2);
    }
    Display.clearDisplay();
    player1.resetWins();
    player2.resetWins();
    player = player1;
    iCount = 1;
  }
  return {
    board,
    checkWins,
    endGame,
  };
})();
const play = (function () {
  let iCount = 1,
    i = 0;
  j = 0;
  let player = player2;
  function initBoard() {
    iCount = 1;
    let board = document.getElementById("board");
    board.addEventListener("click", (event) => {
      let target = event.target;
      let values = target.id.split(",");
      let i = parseInt(values[0]);
      let j = parseInt(values[1]);
      if (gameState.board[i][j] == 0) {
        player == player1 ? (player = player2) : (player = player1);
        incrementPlays();
        if (player == player1) {
          document.getElementById(values).innerHTML = "X";
          gameState.board[i][j] = "X";
        }
        if (player == player2) {
          document.getElementById(values).innerHTML = "O";
          gameState.board[i][j] = "O";
        }
        if (iCount >= 5) {
          gameState.checkWins(player);
        }
      }
    });
  }
  function incrementPlays() {
    iCount++;
    if (iCount > 10) {
      alert(`no player wins`);
      Display.clearDisplay();
    }
  }
  return {
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
        document.getElementById(values).remove();
      }
    }
    gameState.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    play.initBoard();
    populate();
  }
  function stateWinner(player) {
    let name = player.name;
    console.log(name);
    alert(`${player.name} is the Winner`);
    console.log(gameState.board);
    clearDisplay();
    console.log(gameState.board);
  }
  return {
    populate,
    clearDisplay,
    stateWinner,
  };
})();
Display.populate();
play.initBoard();
