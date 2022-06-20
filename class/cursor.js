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

  up() {
    // Move cursor up
  }

  down() {
    // Move cursor down
  }

  left() {
    // Move cursor left
  }

  right() {
    // Move cursor right
  }

}


module.exports = Cursor;
