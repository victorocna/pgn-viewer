import React from 'react';

const MoveArrows = ({ onPrevMove, onNextMove, disabled }) => {
  return (
    <div className="chess-board-controls">
      <button
        type="button"
        className="button nav-light"
        onClick={onPrevMove}
        disabled={disabled}
      >
        <i className="chevron-left" />
      </button>
      <button
        type="button"
        className="button nav-light"
        onClick={onNextMove}
        disabled={disabled}
      >
        <i className="chevron-right" />
      </button>
    </div>
  );
};

export default MoveArrows;
