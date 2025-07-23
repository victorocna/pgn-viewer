import React from 'react';
import Button from './Button';

const MoveArrows = ({ onPrevMove, onNextMove, disabled }) => {
  return (
    <div className="chess-board-controls">
      <Button
        className="button nav-light"
        onClick={onPrevMove}
        disabled={disabled}
      >
        <i className="chevron-left" />
      </Button>
      <Button
        className="button nav-light"
        onClick={onNextMove}
        disabled={disabled}
      >
        <i className="chevron-right" />
      </Button>
    </div>
  );
};

export default MoveArrows;
