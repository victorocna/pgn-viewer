const countSidelines = (treeState, currentMoment, nextMoments) => {
  const arrayIndex = treeState.findIndex((branch) =>
    branch.some((moment) => moment.index === currentMoment.index)
  );
  let numSidelines = 0;
  if (!treeState[arrayIndex + 1]) {
    return 0;
  }

  for (let i = arrayIndex + 1; i < treeState.length; i++) {
    if (treeState[i].some((moment) => moment.depth > currentMoment.depth)) {
      numSidelines++;
    } else {
      break;
    }
  }
  return numSidelines;
};

export default countSidelines;
