const Big = require('big.js');

function insertTemplatesInPlaceOfXYPositions(rawDxfEntity: string, generator, minPosition: string, positionTag: string) {
  let dxfEntityWithTemplates = rawDxfEntity;
  let generatorVal = generator.next().value;
  let addedLength = 0;
  while (generatorVal !== undefined) {
    let {
      startPositionValue,
      endPositionValue,
      position
     } = generatorVal;
     let positionOffset;
    try {
      positionOffset = new Big(position).minus(minPosition);
    } catch (err) {
      console.log(`position: ${ position }`);
      console.log(`minPosition: ${ minPosition }`);
      throw err;
    }

    let startDxfStr = `${ dxfEntityWithTemplates.substring(0, startPositionValue + addedLength) }`;
    let middleDxtStr = `{{ ${ positionTag }:${ positionOffset } }}`;
    let endDxfStr = `${ dxfEntityWithTemplates.substring(endPositionValue + addedLength, dxfEntityWithTemplates.length) }`;
    
    dxfEntityWithTemplates = `${ startDxfStr }${ middleDxtStr }${ endDxfStr }`;
    
    generatorVal = generator.next().value;
    addedLength += middleDxtStr.length - position.length;
  }

  return dxfEntityWithTemplates;
}

module.exports = insertTemplatesInPlaceOfXYPositions;

export {}
