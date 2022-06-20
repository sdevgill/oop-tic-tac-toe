const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  // Create a method to reset the Screen after moving the cursor
  resetScreen = (r, c) => {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
    this.row += r;
    this.col += c;
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
    Screen.render();
  }

  up = () => {
    // Move cursor up
    if (this.row > 0 && this.row < this.numRows) {
      this.resetScreen(-1, 0);
    }
  }

  down = () => {
    // Move cursor down
    if (this.row >= 0 && this.row < (this.numRows - 1)) {
      this.resetScreen(1, 0);
    }
  }

  left = () => {
    // Move cursor left
    if (this.col > 0 && this.col < this.numCols) {
      this.resetScreen(0, -1);
    }
  }

  right = () => {
    // Move cursor right
    if (this.col >= 0 && this.col < (this.numCols - 1)) {
      this.resetScreen(0, 1);
    }
  }

}


module.exports = Cursor;
