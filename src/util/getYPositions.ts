module.exports = function* (dxfEntity: string) {
  const Y_POSITION_CODE = ' 20\n';
  let nextIndex = dxfEntity.indexOf(Y_POSITION_CODE);
  while(nextIndex !== -1) {
    const startYPositionValue = nextIndex + Y_POSITION_CODE.length;
    const endYPositionValue = dxfEntity.indexOf('\n', startYPositionValue);

    nextIndex = dxfEntity.indexOf(Y_POSITION_CODE, nextIndex + 1);

    yield dxfEntity.substring(startYPositionValue, endYPositionValue);
  }
};