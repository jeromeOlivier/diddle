import * as i from './interface.js';
import * as e from './events.js';

export function start() {
  i.drawOneRowOfSquares();
  i.drawOnScreenKeyboard();
  e.initiateRowOfSquaresEventListener();
  e.initiateOnScreenKeyboardEventListener();
  e.initiatePhysicalKeyboardEventListener();
}
