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
        <NextChessground fen={current.fen} viewOnly={true} />
        <div className="pgn-viewer-controls">
          <Button
            className="button mini tertiary text-xl"
            onClick={goPrevMoment}
            disabled={disabled}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </Button>
          <Button
            className="button mini tertiary text-xl"
            onClick={goNextMoment}
            disabled={disabled}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </Button>
        </div>
      </div>
      <div className="pgn-viewer-tree-section">
        <PgnTree tree={tree} current={current} onMoveClick={handleMoveClick} />
      </div>
    </div>
  );
};

export default PgnViewer;
