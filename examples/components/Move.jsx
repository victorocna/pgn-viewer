import React from 'react';
import { getMoveSuffix, showMoveIndex } from '../functions';
import classnames from 'merge-class-names';

const Move = ({ move, fen, depth, previous, isActive, onClick }) => {
  const classes = classnames(
    'pgn-tree-move',
    depth === 1 && 'pgn-tree-move-main-line',
    depth > 1 && !isActive && 'pgn-tree-move-variation',
    isActive && 'pgn-tree-move-active'
  );

  return (
    <span className={classes} onClick={onClick}>
      {showMoveIndex(previous, fen, depth) && (
        <span className="pgn-tree-move-number-inline">
          {getMoveSuffix(fen)}
        </span>
      )}
      <span className="font-chess">{move}</span>
    </span>
  );
};

export default Move;
