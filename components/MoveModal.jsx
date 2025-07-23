import classnames from 'merge-class-names';
import { useEffect, useRef, useState } from 'react';
import { getMoveSuffix } from '../functions';

const MoveModal = ({ variations = [], onChoice, onCancel, onFocusChange }) => {
  const ref = useRef(null);
  const [focus, setFocus] = useState(0);

  // Set focus on the container when mounted
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  // Notify parent component when focus changes so it can update the arrow
  useEffect(() => {
    if (onFocusChange) {
      onFocusChange(focus);
    }
  }, [focus, onFocusChange]);

  // Handle keyboard events to change focus or choose a variation
  const onKeyDown = (event) => {
    event.preventDefault();

    if (event.key === 'ArrowDown') {
      setFocus((prev) => (prev + 1) % variations.length);
    }
    if (event.key === 'ArrowUp') {
      setFocus((prev) => (prev - 1 + variations.length) % variations.length);
    }
    if (event.key === 'ArrowLeft') {
      onCancel();
    }
    if (event.key === 'ArrowRight') {
      onChoice(variations[focus].index);
    }
  };

  // Render each variation button with hover support to update focus
  const showVariations = (variation, index) => {
    return (
      <button
        key={variation.index}
        className={classnames(
          'move-modal-variation-button',
          focus === index && 'move-modal-variation-focused'
        )}
        onClick={() => onChoice(variation.index)}
        onMouseEnter={() => setFocus(index)}
      >
        <span>{getMoveSuffix(variation.fen)}</span>
        <p className="move-modal-variation-move">
          <span className="chess-font">{variation.move}</span>
        </p>
      </button>
    );
  };

  return (
    <div className="move-modal-dialog">
      <div className="move-modal-header">
        <div className="move-modal-header-content">
          <i className="fa-solid fa-chess"></i>
          <p>Choose variation</p>
        </div>
        <button
          className="move-modal-close-button"
          onClick={() => onCancel && onCancel()}
        >
          <i className="fa-solid fa-x move-modal-close-icon" />
        </button>
      </div>
      <div
        ref={ref}
        onKeyDown={onKeyDown}
        tabIndex={0}
        className="move-modal-variations-container"
      >
        {variations.map(showVariations)}
      </div>
    </div>
  );
};

export default MoveModal;
