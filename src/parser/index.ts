const fs = require('fs');
const getXYPositions = require('./getXYPositions');
const insertTemplatesInPlaceOfXYPositions = require('./insertTemplatesInPlaceOfXYPositions');

let dxfEntity: string = fs.readFileSync('./dxf-partials/entities/A.dxf.partial', { encoding: 'utf-8' });

let MIN_X_POSITION = 0.0;
const xPositionGenerator = getXYPositions(dxfEntity, 'X');
let dxfEntityWithXTemplates = insertTemplatesInPlaceOfXYPositions(
  dxfEntity,
  xPositionGenerator,
  MIN_X_POSITION,
  'xPosition'
);
let MIN_Y_POSITION = 3.0;
const yPositionGenerator = getXYPositions(dxfEntityWithXTemplates, 'Y');
let dxfEntityWithXYTemplates = insertTemplatesInPlaceOfXYPositions(
  dxfEntityWithXTemplates,
  yPositionGenerator,
  MIN_Y_POSITION,
  'yPosition'
);

fs.writeFileSync('./dxf-partials/entities/A.dxf.partial', dxfEntityWithXYTemplates, { encoding: 'utf-8' });

export {}
