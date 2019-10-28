const fs = require('fs');

const POSITION_TEMPLATE_START_TAG = '{{ ';
const POSITION_TEMPLATE_END_TAG = ' }}';
const replaceXYPositionTemplates = (position: number, dxfPartial: string, positionType: string) => {
  let dxfPartialWithTemplatesReplaced = dxfPartial;
  let nextIndex = dxfPartialWithTemplatesReplaced.indexOf(`${ POSITION_TEMPLATE_START_TAG }${ positionType }:`);
  while (nextIndex !== -1) {
    const yOffsetStart = nextIndex + POSITION_TEMPLATE_START_TAG.length;
    const yOffsetEnd = dxfPartialWithTemplatesReplaced.indexOf(POSITION_TEMPLATE_END_TAG, nextIndex);
    const yOffset = Number(dxfPartialWithTemplatesReplaced.substring(yOffsetStart, yOffsetEnd)) + position;
    
    console.log(`yOffset: ${ yOffset.toString() }`);

    dxfPartialWithTemplatesReplaced = dxfPartialWithTemplatesReplaced.replace(/{{\s.*\s}}/, yOffset.toString());

    nextIndex = dxfPartialWithTemplatesReplaced.indexOf(POSITION_TEMPLATE_START_TAG, nextIndex + 1);
  }

  return dxfPartialWithTemplatesReplaced;
};

const readDxfPartial = partialName =>
  fs.readFileSync(`./dxf-partials/${ partialName }.dxf.partial`, { encoding: 'utf-8' });

function generateEntityAtPosition(entityName: string, xPosition: number, yPosition: number) {
  const entityDxfPartialWithTemplates = readDxfPartial(`entities/${ entityName }`);
  const entityDxfPartialWithYReplaced = replaceXYPositionTemplates(
    yPosition,
    entityDxfPartialWithTemplates,
    'yPosition'
  );
  const entityDxfPartialWithXYReplaced = replaceXYPositionTemplates(
    xPosition,
    entityDxfPartialWithTemplates,
    'xPosition'
  );

  return entityDxfPartialWithXYReplaced;
}

module.exports = generateEntityAtPosition;

export {}
