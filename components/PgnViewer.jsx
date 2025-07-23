import React from 'react';
import { NextChessground } from 'next-chessground';
import { useEqualHeight, usePgnViewer, useShapes } from '../hooks';
import PgnTree from './PgnTree';
import MoveArrows from './MoveArrows';
import MoveModal from './MoveModal';

const PgnViewer = ({ pgn, disabled, header }) => {
  const {
    current, // Current moment in the PGN
    tree, // PGN tree structure
    variations,
    goNextMoment,
    goPrevMoment,
    goToMoment,
    onVariationChoice,
    onVariationsCancel,
  } = usePgnViewer(pgn, { autoSelectMainline: true });

  const handleMoveClick = (moment) => {
    if (!disabled) {
      goToMoment(moment);
    }
  };

  const { shapes, refocusModal } = useShapes({ current, variations });
  const { sourceRef, targetRef } = useEqualHeight(current);

  return (
    <div className="pgn-wrapper">
      <div ref={sourceRef} className="chess-board">
        <NextChessground fen={current.fen} shapes={shapes} viewOnly={true} />
        <MoveArrows
          onPrevMove={goPrevMoment}
          onNextMove={goNextMoment}
          disabled={disabled}
        />
      </div>
      <div ref={targetRef} className="pgn-tree-section pgn-tree-light">
        {header && (
          <div className="pgn-tree-header">
            <p className="pgn-tree-header-title">{header}</p>
          </div>
        )}
        <div className="pgn-tree-container">
          <PgnTree
            tree={tree}
            current={current}
            onMoveClick={handleMoveClick}
          />
        </div>
        {variations && (
          <div className="move-modal-container">
            <MoveModal
              variations={variations}
              onChoice={onVariationChoice}
              onCancel={onVariationsCancel}
              onFocusChange={refocusModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PgnViewer;
