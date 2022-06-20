const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', TTT.testCommand);

    Screen.render();
  }

  static checkWin(grid) {
    // Return false if the game has not ended
    let winner = false;

    // Array to store the winning combinations
    const winningCombos = [];

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    const checkPlayerWin = (arr) => {
      if (arr.every((el) => el === "X")) {
        winner = "X";
      } else if (arr.every((el) => el === "O")) {
        winner = "O";
      }
    }

    // Return 'T' if the game is a tie
    const checkTie = () => {
      let blankSpaces = winningCombos.flat().filter((el) => el === " ").length;

      if (blankSpaces === 0 && winner === false) {
        winner = "T";
      }
    }

    checkTie();

    return winner;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
