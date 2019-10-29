import * as fs from 'fs';
import generateEntityAtPosition from './generateEntityAtPosition';

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
${ generateEntityAtPosition('AA', 0.2, 3.0) }
  0
ENDSEC
${ objectsDxfPartial }
${ eofDxfPartial }`;

fs.writeFileSync('./generated.dxf', completeDxfFile, { encoding: 'utf-8' });
