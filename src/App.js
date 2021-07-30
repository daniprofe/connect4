import { Client } from 'boardgame.io/react';
import { Connect4 } from './Game';
import { Board } from './Board';

const App = Client(
  {
    game: Connect4,
    board: Board,
  }
);

export default App;
