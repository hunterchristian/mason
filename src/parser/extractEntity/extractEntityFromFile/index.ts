import * as fs from 'fs';

export default function (dxfFileAsStr) {
  const startEntityGroupPosition = dxfFileAsStr.indexOf('ENTITIES');
  if (startEntityGroupPosition === -1) {
    console.error('Start of entity group not found');
    process.exit(1);
  }
  const endEntityGroupPosition = dxfFileAsStr.indexOf('ENDSEC', startEntityGroupPosition);
  if (endEntityGroupPosition === -1) {
    console.error('End of entity group not found');
    process.exit(1);
  }
  
  const trimmed = dxfFileAsStr.substring(startEntityGroupPosition + 9, endEntityGroupPosition - 5).trim();
  return '  ' + trimmed;
}
