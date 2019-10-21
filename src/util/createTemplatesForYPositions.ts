const fs = require('fs');
const getYPositions = require('./util/getYPositions');

let MIN_Y_POSITION = 3.264396068884146;

let dxfEntity: string = fs.readFileSync('./dxf-partials/entities/A.dxf.partial', { encoding: 'utf-8' });
const yPositionGenerator = getYPositions(dxfEntity);
let yPosition = yPositionGenerator.next().value;

while (yPosition !== undefined) {
  dxfEntity = dxfEntity.replace(yPosition, `{{ ${ Number(yPosition) - MIN_Y_POSITION } }}`);
  yPosition = yPositionGenerator.next().value;
}

fs.writeFileSync('./dxf-partials/entities/A.dxf.partial', dxfEntity, { encoding: 'utf-8' });