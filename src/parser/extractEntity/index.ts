import * as fs from 'fs';
import extractEntityFromFile from './extractEntityFromFile';

const args = process.argv.slice(2);
const dxfFileToProcess = args[0];
if (!dxfFileToProcess) {
  console.error('Must specify DXF file to be parsed as the first argument');
  process.exit(1);
}
const entityName = args[1];
if (!entityName) {
  console.error('Must specify name of entity as the second argument');
  process.exit(1);
}

let dxfFileAsStr;
try {
  dxfFileAsStr = fs.readFileSync(dxfFileToProcess, { encoding: 'utf-8'});
} catch (err) {
  console.error(err);
  process.exit(1);
}
const entity = extractEntityFromFile(dxfFileAsStr);

try {
  fs.writeFileSync(
    `./dxf-partials/entities/${ entityName }.dxf.partial`,
    entity,
    { encoding: 'utf-8' }
  );
} catch (err) {
  console.error(err);
  process.exit(1);
}
