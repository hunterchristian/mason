const fs = require('fs');
const Big = require('big.js');

const POSITION_TEMPLATE_START_TAG = '{{ ';
const POSITION_TEMPLATE_END_TAG = ' }}';
const replaceXYPositionTemplates = (position: number, dxfPartial: string, positionType: string) => {
  let dxfPartialWithTemplatesReplaced = dxfPartial;
  const startTag = `${ POSITION_TEMPLATE_START_TAG }${ positionType }:`;
  const endTag = POSITION_TEMPLATE_END_TAG;
  let nextIndex = dxfPartialWithTemplatesReplaced.indexOf(startTag);

  while (nextIndex !== -1) {
    const offsetStart = nextIndex + startTag.length;
    const offsetEnd = dxfPartialWithTemplatesReplaced.indexOf(endTag, nextIndex);
    const offset = new Big(dxfPartialWithTemplatesReplaced.substring(offsetStart, offsetEnd)).plus(position);

    const regexes = {
      yPosition: /{{\syPosition:.*\s}}/,
      xPosition: /{{\sxPosition:.*\s}}/
    };

    dxfPartialWithTemplatesReplaced = dxfPartialWithTemplatesReplaced.replace(regexes[positionType], offset.toString());

    nextIndex = dxfPartialWithTemplatesReplaced.indexOf(startTag, nextIndex + 1);
  }

  return dxfPartialWithTemplatesReplaced;
};

const readDxfPartial = partialName =>
  fs.readFileSync(`./dxf-partials/${ partialName }.dxf.partial`, { encoding: 'utf-8' });

function generateEntityAtPosition(entityName: string, xPosition: number, yPosition: number, partialTemplate?: string) {
  const entityDxfPartialWithTemplates = partialTemplate || readDxfPartial(`entities/${ entityName }`);
  const entityDxfPartialWithYReplaced = replaceXYPositionTemplates(
    yPosition,
    entityDxfPartialWithTemplates,
    'yPosition'
  );
  const entityDxfPartialWithXYReplaced = replaceXYPositionTemplates(
    xPosition,
    entityDxfPartialWithYReplaced,
    'xPosition'
  );

  return entityDxfPartialWithXYReplaced;
}

module.exports = generateEntityAtPosition;

export {}
