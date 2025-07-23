import React from 'react';
import classnames from 'merge-class-names';

const Shape = ({ extraClass }) => (
  <span className={classnames('pgn-tree-shape', extraClass)}>
    <i className="fas fa-shapes"></i>
  </span>
);

export default Shape;
