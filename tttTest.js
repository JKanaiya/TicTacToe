const createPlayer = function (initialName) {
  let wins = 0;
  let name = initialName;
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
    return name;
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
const player1 = createPlayer("a");
const player2 = createPlayer("b");
let player = player1;
const gameState = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  function checkWins() {
    // check vertical
    for (i = 0; i < 3; i++) {
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][0] === this.board[i][2] &&
        this.board[i][1] !== 0
      ) {
        // player.incrementWins();
        console.log("A winner");
        player.incrementWins();
        iCount = 1;
        break;
      }
      //   check horizontal
      if (
        this.board[0][i] === this.board[1][i] &&
        this.board[0][i] === this.board[2][i] &&
        this.board[0][i] !== 0
      ) {
        // player.incrementWins();
        console.log("A winner");
        player.incrementWins();
        iCount = 1;
        break;
      }
    }
    //  check diagonal
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2] &&
      this.board[1][1] !== 0
    ) {
      //   player.incrementWins();
      console.log("A winner");
      player.incrementWins();
      console.log(player.getName());
      console.log(player.getWins());
      endGame();
      iCount = 1;
    }
    if (
      this.board[2][0] == this.board[1][1] &&
      this.board[1][1] == this.board[0][2] &&
      this.board[1][1] !== 0
    ) {
      //   player.incrementWins();
      console.log("A winner");
      player.incrementWins();
      iCount = 1;
      console.log(gameState.board);
    }
  }
  function endGame() {
    console.log(player.getName());
    console.log("onlyne");
    gameState.board = gameState.board.map(() => gameState.board.map(() => 0));
    console.log(gameState.board);
    iCount = 1;
  }
  function incrementPlays() {
    iCount++;
    if (iCount > 10) {
      alert(`no player wins`);
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
  let i = 0;
  j = 0;
  player = player2;
  iCount = 1;
  function hasZero(board) {
    return gameState.board.some((row) => row.includes(0));
  }

  while (hasZero(board)) {
    player == player1 ? (player = player2) : (player = player1);
    let vals = prompt("input the locations in this format 1,2").split(",");
    let i = vals[0];
    let j = vals[1];
    if (player == player1) {
      gameState.board[i][j] = "X";
      gameState.incrementPlays();
      gameState.checkWins();
    }
    if (player == player2) {
      gameState.board[i][j] = "O";
      gameState.checkWins();
      gameState.incrementPlays();
    }
    if (iCount >= 5) {
      gameState.checkWins(player);
    }
  }
  return {
    iCount,
  };
})();
