const fs = require('fs');

const generateEntityAtPosition = require('./util/generateEntityAtPosition/index');

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
  0
SECTION
  2
ENTITIES
${ generateEntityAtPosition('A', 0.2, 3.0) }
${ generateEntityAtPosition('A', 0.4, 3.0) }
  0
ENDSEC
${ objectsDxfPartial }
${ eofDxfPartial }`;

fs.writeFileSync('./out.dxf', completeDxfFile, { encoding: 'utf-8' });

export {}