const config = {
  rows: 6,
  cols: 7,
  lineSize: 4,
};

function checkLine(token, rowIndex, colIndex, board) {
  const checks = ['row', 'col', 'd/', 'd\\'];
  let line = [];
  let currentCheck, currentRow, currentCol;

  while (line.length < config.lineSize && checks.length > 0) {
    currentCheck = checks.shift();
    currentRow = rowIndex;
    currentCol = colIndex;
    switch (currentCheck) {
      case 'row':
        currentCol = 0;
        break;
      case 'col':
        currentRow = 0;
        break;
      case 'd/':
        while (currentRow > 0 && currentCol > 0) {
            currentRow--;
            currentCol--;
        }
        break;
      case 'd\\':
        while (currentRow > 0 && currentCol < (config.cols - 1)) {
            currentRow--;
            currentCol++;
        }
        break;        
      default:
    }
    line = [];
    while (line.length < config.lineSize
      && currentRow >= 0 && currentCol >= 0
      && currentRow < board.length && currentCol < board[0].length) {
        if (board[currentRow][currentCol] === token) {
          line.push({
            row: currentRow,
            col: currentCol    
          });
        } else {
          line = [];
        }
        switch (currentCheck) {
          case 'row':
            currentCol++;
            break;
          case 'col':
            currentRow++
            break;
          case 'd/':
            currentRow++;
            currentCol++;
            break;
          case 'd\\':
            currentRow++;
            currentCol--;
            break;            
          default:      
        }
    }
  }

  if (line.length >= config.lineSize) {
    return line;
  } else {
    return false;
  }
}

export const Connect4 = {
  setup: () => (
    {
      board: Array(config.rows).fill(
               Array(config.cols).fill(null)
             )
    }
  ),

    turn: {
        moveLimit: 1,
    },

    moves: {
        dropTokenOnColumn: (G, ctx, columnIndex) => {
            let targetRow = 0;
            while (targetRow < G.board.length && G.board[targetRow][columnIndex] !== null) {
                targetRow++;
            }

            if (targetRow === G.board.length) {
                throw new Error(`Column ${columnIndex} is full, player ${ctx.currentPlayer} can NOT drop token on this column!`);
            }

            G.board[targetRow][columnIndex] = ctx.currentPlayer;

            const line = checkLine(ctx.currentPlayer, targetRow, columnIndex, G.board);
            if (line !== false) {
                ctx.events.endGame(line);
            }
        },
    },
};