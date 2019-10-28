function getPositionCodeForPosition(position: string) {
  const Y_POSITION_CODE = ' 20\n';
  const X_POSITION_CODE = ' 10\n';

  let positionCode = '';
  if (position === 'Y') {
    positionCode = Y_POSITION_CODE;
  } else if (position === 'X') {
    positionCode = X_POSITION_CODE;
  } else {
    console.error(`Unexpected value encountered for position: ${ position }`);
    process.exit(1);
  }

  return positionCode;
}

export default function* getXYPositions(dxfEntity: string, position: string) {
  const positionCode = getPositionCodeForPosition(position);
  let nextIndex = dxfEntity.indexOf(positionCode);
  while(nextIndex !== -1) {
    const startPositionValue = nextIndex + positionCode.length;
    const endPositionValue = dxfEntity.indexOf('\n', startPositionValue);

    nextIndex = dxfEntity.indexOf(positionCode, nextIndex + 1);

    yield {
      startPositionValue,
      endPositionValue,
      position: dxfEntity.substring(startPositionValue, endPositionValue),
    };
  }
};
