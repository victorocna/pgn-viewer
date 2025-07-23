/**
 * Checks if the current move is active by comparing it with a given moment.
 */
const isMoveActive = (current, moment) => {
  try {
    return (
      current.fen === moment.fen && // Compare FEN strings
      current.move === moment.move && // Compare moves
      current.depth === moment.depth // Compare depth
    );
  } catch (err) {
    return false;
  }
};

export default isMoveActive;
