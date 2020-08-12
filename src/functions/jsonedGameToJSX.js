export const jsonedGameToJSX = (jsonedGame) => {
  const JSXedGame = jsonedGame.map((item, index) => {
    let blackToMove = false;
    let needPuncte = false;
    if (
      index > 0 &&
      jsonedGame[index - 1].fen[jsonedGame[index - 1].fen.length - 1] ==
        jsonedGame[index].fen[jsonedGame[index].fen.length - 1] - 1
    ) {
      blackToMove = true;
      if (jsonedGame[index - 1].comment) {
        needPuncte = true;
      }
    }
    return [
      index > 0 && jsonedGame[index - 1].depth < jsonedGame[index].depth && (
        <span> (</span>
      ),
      index > 0 && jsonedGame[index - 1].depth > jsonedGame[index].depth && (
        <span>) </span>
      ),
      item.move &&
        item.fen &&
        index > 0 &&
        (item.depth === 1 ? (
          <b>
            {' '}
            {!blackToMove &&
              jsonedGame[index].fen[jsonedGame[index].fen.length - 1] + '. '}
            {needPuncte &&
              jsonedGame[index].fen[jsonedGame[index].fen.length - 1] -
                1 +
                '...'}
            {item.move + ' '}
          </b>
        ) : (
          <i>
            {' '}
            {!blackToMove &&
              jsonedGame[index].fen[jsonedGame[index].fen.length - 1] + '. '}
            {needPuncte &&
              jsonedGame[index].fen[jsonedGame[index].fen.length - 1] -
                1 +
                '...'}
            {item.move + ' '}
          </i>
        )),
      item.comment && <span>{item.comment}</span>,
    ];
  });
  return JSXedGame;
};
