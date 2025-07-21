import getPreviousVariationMoment from './get-previous-variation-moment';
import splitLineAndInsert from './split-line-and-insert';

// When the user inserts a new alternative move, we create a new variation and insert it into the tree
const insertUserMoveToTree = (
  tree,
  replacedMoment,
  nextFen,
  userMove,
  numSidelines = 0,
  nextMoments = []
) => {
  const currentLineIndex = tree.findIndex((line) =>
    line.some((moment) => moment.index === replacedMoment.index)
  );
  const currentMoveIndex = tree[currentLineIndex].findIndex(
    (moment) => moment.index === replacedMoment.index
  );

  // If only mainline move as alternative move
  if (!numSidelines) {
    // Split the current line at the index of the currentMoment
    const newTree = splitLineAndInsert(
      tree,
      currentLineIndex,
      currentMoveIndex
    );
    // Insert the variation between the split lines from above, building it with a variation moment and a move moment
    const newVariationMoment = {
      fen: newTree[currentLineIndex][currentMoveIndex - 1].fen,
      depth: replacedMoment.depth + 1,
      index: newTree[currentLineIndex][currentMoveIndex].index + 1,
      previous: replacedMoment,
    };

    const newMoveMoment = {
      fen: nextFen,
      move: userMove.san,
      from: userMove.from,
      to: userMove.to,
      depth: replacedMoment.depth + 1,
      index: newTree[currentLineIndex][currentMoveIndex].index + 2,
    };

    newTree.splice(currentLineIndex + 1, 0, [
      newVariationMoment,
      newMoveMoment,
    ]);

    // Insert a variation moment at the beginning of the split line
    const oldVariationMoment = {
      fen: nextFen,
      depth: replacedMoment.depth,
      index: newTree[currentLineIndex][currentMoveIndex].index + 3,
      previous: {
        fen: nextFen,
        depth: replacedMoment.depth + 1,
        move: userMove.san,
        from: userMove.from,
        to: userMove.to,
        index: newTree[currentLineIndex][currentMoveIndex].index + 2,
      },
    };
    newTree[currentLineIndex + 2].unshift(oldVariationMoment);

    // Update index for all subsequent moments. Increment by 3, as we add exactly three moments, two variation moments and the user's move.
    for (let i = 1; i < newTree[currentLineIndex + 2].length; i++) {
      newTree[currentLineIndex + 2][i].index += 3;
    }
    for (let j = currentLineIndex + 3; j < newTree.length; j++) {
      for (const moment of newTree[j]) {
        moment.index += 3;
      }
    }

    return { newTree, newMoment: newMoveMoment };
  }

  // If sidelines already exist, the split is already there, so we just insert the new variation
  const newTree = [...tree];
  // compute the last index, to keep track of new moments index
  const lastIndex =
    newTree[currentLineIndex + numSidelines][
      newTree[currentLineIndex + numSidelines].length - 1
    ].index;

  const variationMoment = getPreviousVariationMoment(
    tree,
    nextMoments,
    currentLineIndex,
    numSidelines
  );

  const moveMoment = {
    fen: nextFen,
    depth: variationMoment.depth,
    move: userMove.san,
    from: userMove.from,
    to: userMove.to,
    index: lastIndex + 2,
  };
  // Insert the new variation with the variation moment and the move moment
  newTree.splice(currentLineIndex + numSidelines + 1, 0, [
    {
      ...variationMoment,
      index: lastIndex + 1,
    },
    moveMoment,
  ]);

  // Update index for all subsequent moments. Increment by 2, as we add exactly two moments, the variation moment and  the user's move.
  for (let i = currentLineIndex + numSidelines + 2; i < newTree.length; i++) {
    for (const moment of newTree[i]) {
      moment.index += 2;
    }
  }

  return { newMoment: moveMoment, newTree };
};

export default insertUserMoveToTree;
