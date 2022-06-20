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

    // Create commands for cursor movement and help/reset
    Screen.addCommand('h', 'show commands', Screen.printCommands);
    Screen.addCommand('r', 'reset the game', TTT.reset);
    Screen.addCommand('up', 'move up', this.cursor.up);
    Screen.addCommand('down', 'move down', this.cursor.down);
    Screen.addCommand('left', 'move left', this.cursor.left);
    Screen.addCommand('right', 'move right', this.cursor.right);
    // Place a move
    Screen.addCommand('return', 'make move', this.makeMove);

    Screen.setMessage(`Welcome! \nPress "h" for help. \nPlayer ${this.playerTurn}, make your move.`);

    Screen.setBackgroundColor(this.cursor.row, this.cursor.col, this.cursor.cursorColor);

    Screen.render();
  }

  // Method to check for wins after each move
  makeMove = () => {
    let player = this.playerTurn;

    // Check if the cursor is on a blank space
    if (Screen.grid[this.cursor.row][this.cursor.col] === " ") {
      // Place the player's symbol on the grid
      Screen.setGrid(this.cursor.row, this.cursor.col, player);

      // Check for a win
      let winner = TTT.checkWin(Screen.grid);
      if (winner !== false) {
        TTT.endGame(winner);
      }

      // Switch player
      if (player === "X") {
        this.playerTurn = "O";
      } else {
        this.playerTurn = "X";
      }

      Screen.setMessage(`Player ${this.playerTurn}, make your move.`);

    } else {
      Screen.setMessage(`Invalid move. Space already taken. \nPlayer ${this.playerTurn}, make your move.`);
    }

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

    // Check for horizontal wins
    grid.forEach(row => winningCombos.push(row));

    // Check for vertical wins
    for (let i = 0; i < grid[0].length; i++) {
      let col = [];
      grid.forEach(row => col.push(row[i]));
      winningCombos.push(col);
    }

    // Check for diagonal wins
    // Brute forced
    // winningCombos.push([grid[0][0], grid[1][1], grid[2][2]]);
    // winningCombos.push([grid[0][2], grid[1][1], grid[2][0]]);

    // Check with algorithm
    let leftToRight = [];
    let rightToLeft = [];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid.length; col++) {

        if (row === col) {
          leftToRight.push(grid[row][col]);
        }

        if (row + col === grid.length - 1) {
          rightToLeft.push(grid[row][col]);
        }

      }
    }

    winningCombos.push(leftToRight);
    winningCombos.push(rightToLeft);

    // Check for winner
    winningCombos.forEach(checkPlayerWin);

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
