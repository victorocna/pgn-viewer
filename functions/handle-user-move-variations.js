import countSidelines from './count-sidelines';
import insertUserMoveToTree from './insert-user-move-to-tree';
import pushUserMoveToVariation from './push-user-move-to-variation';

/**
 * Handles user moves as variations
 * @param {Object} params - Parameters object
 * @param {Object} params.treeState - Current tree state
 * @param {Object} params.currentMoment - Current moment in the game
 * @param {Array} params.nextMoments - Array of next possible moments
 * @param {string} params.nextFen - FEN after the user's move
 * @param {string} params.userMove - User's move
 * @returns {Object} Object containing newTree and newMoment
 */
const handleUserMoveVariations = ({
  treeState,
  currentMoment,
  nextMoments,
  nextFen,
  userMove,
}) => {
  const replacedMoment = nextMoments?.[0]; // the current variation's expected move

  // If it is actually the last move on the current variation, so the user's move is a new move
  if (!replacedMoment) {
    // push the user move to the current variation
    const { newMoment, newTree } = pushUserMoveToVariation(
      treeState,
      currentMoment,
      nextFen,
      userMove
    );

    return { newTree, newMoment };
  }

  // If the user move should be added as a new variation
  const numSidelines = countSidelines(treeState, currentMoment, nextMoments); // count how many existing sidelines are there, to insert the new one as the last one
  // Insert the user move into the tree, as a new variation
  const { newTree, newMoment } = insertUserMoveToTree(
    treeState,
    replacedMoment,
    nextFen,
    userMove,
    numSidelines,
    nextMoments
  );

  return { newTree, newMoment };
};

export default handleUserMoveVariations;
