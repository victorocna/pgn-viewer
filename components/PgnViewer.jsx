import React from 'react';
import { NextChessground } from 'next-chessground';
import { usePgnViewer } from '../hooks';
import PgnTree from './PgnTree';
import Button from './Button';

const PgnViewer = ({ pgn, disabled }) => {
  const {
    current, // Current moment in the PGN
    tree, // PGN tree structure
    goNextMoment,
    goPrevMoment,
    goToMoment,
  } = usePgnViewer(pgn, { autoSelectMainline: true });

  const handleMoveClick = (moment) => {
    if (!disabled) {
      goToMoment(moment);
    }
  };

  /* TODO: IMPLEMENT SHAPES LOGIC */

  return (
    <div className="pgn-viewer-container">
      <div className="pgn-viewer-board-section">
        <div className="pgn-viewer-board-wrapper">
          <NextChessground fen={current.fen} viewOnly={true} />
        </div>
        <div className="pgn-viewer-controls">
          <Button
            className="button text-lg"
            onClick={goPrevMoment}
            disabled={disabled}
          >
            ‹
          </Button>
          <Button
            className="button text-lg"
            onClick={goNextMoment}
            disabled={disabled}
          >
            ›
          </Button>
        </div>
      </div>
      <div className="pgn-viewer-tree-section">
        <h1>TEXT</h1>
        <PgnTree tree={tree} current={current} onMoveClick={handleMoveClick} />
      </div>
    </div>
  );
};

export default PgnViewer;
