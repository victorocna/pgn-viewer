import React from 'react';
import { isEmpty, omit } from 'lodash';
import classnames from 'merge-class-names';
import { Fragment, useEffect, useRef } from 'react';
import Comment from './Comment';
import Move from './Move';
import Shape from './Shape';
import { getMoveNumber, isMoveActive } from '../functions';

const PgnTree = ({
  tree,
  current,
  onMoveClick,
  onRightClick,
  onExpandVariation,
}) => {
  const containerRef = useRef();
  const momentsDictionaryRef = useRef({});

  useEffect(() => {
    if (containerRef.current && current?.index) {
      const childEl = momentsDictionaryRef.current[current?.index];
      if (childEl) {
        childEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [current?.index]);

  const showMomentAsGrid = (moment, inBlockIndex, block) => {
    const { move, fen, index, shapes, comment, suffix } = moment;
    let { previous } = moment;
    if (!previous) {
      previous = block[inBlockIndex - 1];
    }
    const isActive = isMoveActive(current, moment);
    const isWhiteMove = fen?.split(' ')[1] === 'b';
    const shouldShowAddOn =
      (isWhiteMove && (comment || !block[inBlockIndex + 1])) ||
      (!isWhiteMove && (!previous?.move || previous?.comment));
    const shouldShowMoveNumber = move && (isWhiteMove || shouldShowAddOn);

    // Handle optional right-click event
    const handleRightClick = (event) => {
      if (typeof onRightClick === 'function') {
        onRightClick(event, moment);
      }
    };

    return (
      <Fragment key={`${move}-${fen}-${index}`}>
        {move && (
          <>
            {shouldShowMoveNumber && (
              <div className="pgn-tree-move-number">
                <p>{getMoveNumber(fen)}.</p>
              </div>
            )}
            {!isWhiteMove && shouldShowAddOn && (
              <div className="pgn-tree-placeholder-cell">
                <p>...</p>
              </div>
            )}
            <div
              ref={(el) => (momentsDictionaryRef.current[moment.index] = el)}
              className={classnames(
                'pgn-tree-move-cell',
                isActive && 'pgn-tree-move-cell-active'
              )}
              onClick={() => onMoveClick(moment)}
              onContextMenu={handleRightClick}
            >
              <span className="font-chess">{move}</span>
              {suffix && <span className="pgn-tree-move-suffix">{suffix}</span>}
              {shapes && <Shape />}
            </div>
            {isWhiteMove && shouldShowAddOn && (
              <div className="pgn-tree-placeholder-cell">
                <p>...</p>
              </div>
            )}
          </>
        )}
        {comment && (
          <div className="pgn-tree-comment-wrapper">
            {showMomentAsBlock(omit(moment, ['move']), inBlockIndex, block)}
          </div>
        )}
      </Fragment>
    );
  };

  const showMomentAsBlock = (moment, inBlockIndex, block) => {
    const { comment, move, fen, shapes, index, suffix } = moment;
    let { previous } = moment;
    if (!previous) {
      previous = block[inBlockIndex - 1];
    }
    const isActive = isMoveActive(current, moment);

    // Handle optional right-click event
    const handleRightClick = (event) => {
      if (typeof onRightClick === 'function') {
        onRightClick(event, moment);
      }
    };

    return (
      <Fragment key={`${move}-${fen}-${index}`}>
        {move && (
          <div
            ref={(el) => (momentsDictionaryRef.current[moment.index] = el)}
            className="pgn-tree-move-block"
            onClick={() => onMoveClick(moment)}
            onContextMenu={handleRightClick}
          >
            <Move
              isActive={isActive}
              previous={previous}
              suffix={suffix}
              {...moment}
            />
          </div>
        )}
        {shapes && <Shape />}
        {comment && <Comment comment={comment} />}
      </Fragment>
    );
  };

  const showPlusButton = (plusButtonData) => {
    const { variationId, originalBlock } = plusButtonData;
    const firstMove = originalBlock[0];
    const paddingLeft = `${(firstMove.depth - 1) * 0.75}rem`;

    // Handle optional click event for the plus button
    const handleClick = () => {
      if (typeof onExpandVariation === 'function') {
        onExpandVariation(variationId);
      }
    };

    return (
      <div
        key={variationId}
        className="pgn-tree-plus-button-wrapper"
        style={{ paddingLeft }}
      >
        <button
          onClick={handleClick}
          className="pgn-tree-plus-button"
          title="Expand variation"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    );
  };

  const showBlock = (block = [], index, array) => {
    if (isEmpty(block)) {
      return null;
    }

    // Check if this is a plus button
    if (block[0]?.isPlusButton) {
      return showPlusButton(block[0]);
    }
    // Do not show block if all moments don't have a move, a comment, or shapes
    const shouldShow = block.some((moment) => {
      return moment.move || moment.comment || moment.shapes;
    });
    if (!shouldShow) {
      return null;
    }

    if (index) {
      block[0].previous = array[index - 1][array[index - 1].length - 1];
    }
    const isLowestDepth = block[0].depth === 1;
    const paddingLeft = `${(block[0].depth - 1) * 0.75}rem`;

    return (
      <Fragment key={index}>
        {isLowestDepth ? (
          <div className="pgn-tree-grid-container">
            {block.map(showMomentAsGrid)}
          </div>
        ) : (
          <div
            key={index}
            className="pgn-tree-variation-wrapper"
            style={{ paddingLeft }}
          >
            {block.map(showMomentAsBlock)}
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <div ref={containerRef} className="pgn-tree">
      <div className="pgn-tree-inner">
        {isEmpty(tree) ? (
          <div className="pgn-tree-empty">
            <p>No moves to display yet</p>
          </div>
        ) : (
          tree.map(showBlock)
        )}
      </div>
    </div>
  );
};

export default PgnTree;
