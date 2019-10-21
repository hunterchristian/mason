import { read } from "fs";

const fs = require('fs');

const Y_POSITION_TEMPLATE_START_TAG = '{{ ';
const Y_POSITION_TEMPLATE_END_TAG = ' }}';
const replaceYPositionTemplates = (yPosition: number, dxfPartial: string) => {
  let dxfPartialWithTemplatesReplaced = dxfPartial;
  let nextIndex = dxfPartialWithTemplatesReplaced.indexOf(Y_POSITION_TEMPLATE_START_TAG);
  while (nextIndex !== -1) {
    const yOffsetStart = nextIndex + Y_POSITION_TEMPLATE_START_TAG.length;
    const yOffsetEnd = dxfPartialWithTemplatesReplaced.indexOf(Y_POSITION_TEMPLATE_END_TAG, nextIndex);
    const yOffset = Number(dxfPartialWithTemplatesReplaced.substring(yOffsetStart, yOffsetEnd)) + yPosition;

    dxfPartialWithTemplatesReplaced = dxfPartialWithTemplatesReplaced.replace(/{{\s.*\s}}/g, yOffset.toString());

    nextIndex = dxfPartialWithTemplatesReplaced.indexOf(Y_POSITION_TEMPLATE_START_TAG, nextIndex + 1);
  }

  return dxfPartialWithTemplatesReplaced;
};

const readDxfPartial = partialName =>
  fs.readFileSync(`./dxf-partials/${ partialName }.dxf.partial`, { encoding: 'utf-8' });

const headerDxfPartial = readDxfPartial('header');
const classesDxfPartial = readDxfPartial('classes');
const tablesDxfPartial = readDxfPartial('tables');
const blocksDxfPartial = readDxfPartial('blocks');
const objectsDxfPartial = readDxfPartial('objects');
const eofDxfPartial = readDxfPartial('eof');

const aEntityDxfPartialWithTemplates = readDxfPartial('entities/A');
const yPosition = 3.0;
const aEntityDxfPartial = replaceYPositionTemplates(yPosition, aEntityDxfPartialWithTemplates);

let completeDxfFile =
  `${ headerDxfPartial }${ classesDxfPartial }${ tablesDxfPartial }${ blocksDxfPartial }${ aEntityDxfPartial }${ objectsDxfPartial }${ eofDxfPartial }`;

fs.writeFileSync('./out.dxf', completeDxfFile, { encoding: 'utf-8' });

export {}