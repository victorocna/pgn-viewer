const getPreviousVariationMoment = (
  tree,
  nextMoments,
  currentLineIndex,
  numSidelines
) => {
  for (let i = currentLineIndex + numSidelines; i >= currentLineIndex; i--) {
    if (tree[i].some((moment) => moment.depth === nextMoments[0].depth + 1)) {
      return tree[i][0];
    }
  }
  return null;
};

export default getPreviousVariationMoment;
