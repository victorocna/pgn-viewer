// When the user inserts a new move at the end of a variation, we create the moment and push it at the end of the variation
const pushUserMoveToVariation = (tree, currentMoment, nextFen, userMove) => {
  const newTree = [...tree];

  const newMoment = {
    fen: nextFen,
    move: userMove.san,
    from: userMove.from,
    to: userMove.to,
    depth: currentMoment.depth,
    index: currentMoment.index + 1,
  };

  // find the current line where we need to push the new moment, by using moments' index as comparison method
  const currentLineIndex = tree.findIndex((line) =>
    line.some((moment) => moment.index === currentMoment.index)
  );

  newTree[currentLineIndex].push(newMoment);

  // Update index for all subsequent moments. Increment by one, as we only add one moment, the user's move.
  for (let i = currentLineIndex + 1; i < newTree.length; i++) {
    for (const moment of newTree[i]) {
      moment.index += 1;
    }
  }

  return { newMoment, newTree };
};

export default pushUserMoveToVariation;
