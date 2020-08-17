import { areConsecutiveColorAndMove } from './areConsecutiveColorAndMove';

export const goNextMove = (jsonedGame, currentIndex) => {
  if (currentIndex > jsonedGame.length) {
    throw new Error();
  }

  let possibleMoves = [];

  if (currentIndex === jsonedGame.length - 1) {
    return null;
  } else if (currentIndex + 2 === jsonedGame.length) {
    if (
      jsonedGame[jsonedGame.length - 1].depth === jsonedGame[currentIndex].depth
    ) {
      possibleMoves.push({
        item: jsonedGame[currentIndex + 1],
        index: currentIndex + 1,
      });
    } else {
      return null;
    }
  } else if (currentIndex + 2 <= jsonedGame.length) {
    let mainlineIndex;
    if (
      jsonedGame[currentIndex + 1].depth - 1 ===
      jsonedGame[currentIndex].depth
    ) {
      for (let i = currentIndex + 2; i < jsonedGame.length; i++) {
        if (jsonedGame[i].depth !== jsonedGame[currentIndex].depth) {
          continue;
        } else {
          possibleMoves.push({ item: jsonedGame[i], index: i });
          mainlineIndex = i;
          break;
        }
      }
    } else if (
      jsonedGame[currentIndex + 1].depth === jsonedGame[currentIndex].depth
    ) {
      if (
        areConsecutiveColorAndMove(
          jsonedGame[currentIndex].fen,
          jsonedGame[currentIndex + 1].fen
        )
      ) {
        possibleMoves.push({
          item: jsonedGame[currentIndex + 1],
          index: currentIndex + 1,
        });
        mainlineIndex = currentIndex + 1;
      } else {
        return null;
      }
    }
    if (
      jsonedGame[mainlineIndex + 1].depth === jsonedGame[currentIndex].depth
    ) {
      return possibleMoves[0];
    } else if (
      jsonedGame[mainlineIndex + 1].depth - 1 ===
      jsonedGame[currentIndex].depth
    ) {
      for (
        let i = mainlineIndex + 1;
        jsonedGame[i].depth !== jsonedGame[currentIndex].depth &&
        i < jsonedGame.length;
        i++
      ) {
        if (jsonedGame[i].depth - 1 !== jsonedGame[currentIndex].depth) {
          continue;
        } else {
          if (
            areConsecutiveColorAndMove(
              jsonedGame[currentIndex].fen,
              jsonedGame[i].fen
            )
          ) {
            possibleMoves.push({ item: jsonedGame[i], index: i });
          }
        }
      }
    }
  }

  console.log(possibleMoves);

  return possibleMoves.length > 0
    ? possibleMoves[0]
    : { item: jsonedGame[currentIndex], index: currentIndex };
};