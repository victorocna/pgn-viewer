const isMoveNumber = (current, moment) => {
  try {
    return current.fen === moment.fen && current.move === moment.move;
  } catch (err) {
    return false;
  }
};

export default isMoveNumber;
