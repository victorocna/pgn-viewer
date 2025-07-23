import { Chess } from 'chess.js';

/**
 * Computes an arrow shape based on the current FEN and a move string.
 * Returns null if the move is invalid.
 */
const getMoveArrow = (fen, moveString) => {
  try {
    if (!fen || !moveString) return null;
    const chess = new Chess(fen);
    const move = chess.move(moveString, { sloppy: true });
    if (move) {
      return {
        orig: move.from,
        dest: move.to,
        brush: 'blue',
      };
    }
  } catch (error) {
    console.error('Error parsing move:', error);
  }
  return null;
};

export default getMoveArrow;
