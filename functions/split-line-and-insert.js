const splitLineAndInsert = (array, lineIndex, itemIndex) => {
  if (lineIndex < 0 || lineIndex >= array.length) {
    console.error(`Error: lineIndex ${lineIndex} is out of bounds.`);
    return array;
  }

  const lineToSplit = array[lineIndex];

  if (itemIndex < 0 || itemIndex >= lineToSplit.length) {
    console.error(
      `Error: itemIndex ${itemIndex} is out of bounds for the line at index ${lineIndex}.`
    );
    return array;
  }

  const firstPart = lineToSplit.slice(0, itemIndex + 1);
  const secondPart = lineToSplit.slice(itemIndex + 1);

  array.splice(lineIndex, 1, firstPart, secondPart);

  return array;
};

export default splitLineAndInsert;
