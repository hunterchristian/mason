const fs = require('fs');

const generateEntityAtPosition = require('./util/generateEntityAtPosition');

const readDxfPartial = partialName =>
  fs.readFileSync(`./dxf-partials/${ partialName }.dxf.partial`, { encoding: 'utf-8' });

const headerDxfPartial = readDxfPartial('header');
const classesDxfPartial = readDxfPartial('classes');
const tablesDxfPartial = readDxfPartial('tables');
const blocksDxfPartial = readDxfPartial('blocks');
const objectsDxfPartial = readDxfPartial('objects');
const eofDxfPartial = readDxfPartial('eof');

let completeDxfFile =
`${ headerDxfPartial }
${ classesDxfPartial }
${ tablesDxfPartial }
${ blocksDxfPartial }
${ generateEntityAtPosition('A', 3.0, 3.0) }
${ objectsDxfPartial }
${ eofDxfPartial }`;

fs.writeFileSync('./out.dxf', completeDxfFile, { encoding: 'utf-8' });

export {}