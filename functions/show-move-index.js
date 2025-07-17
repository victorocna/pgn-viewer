/**
 * Show move index or not?
 *
 * always show move index for white's move
 * show move index for black's move only when the previous move does not have a comment
 */
const showMoveIndex = (moment, fen, depth) => {
  if (!moment || !moment.move) {
    return true;
  }

  const side = fen.split(' ')[1];
  if (side === 'b') {
    return true;
  }

  return !!moment.comment || moment.depth > depth;
};

export default showMoveIndex;
