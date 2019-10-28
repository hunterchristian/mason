const getXYPositions = require('./index');
const { testEntity } = require('../../util/testEntities');

describe('getXYPositions', () => {
  test('should return Y positions', () => {
    const yPositionGenerator = getXYPositions(testEntity, 'Y');
    const expectedValue = {
      startPositionValue: 298,
      endPositionValue: 315,
      position: '3.276840068884148'
    };
    const actualValue = yPositionGenerator.next().value;

    expect(actualValue.startPositionValue).toBe(expectedValue.startPositionValue);
    expect(actualValue.endPositionValue).toBe(expectedValue.endPositionValue);
    expect(actualValue.position).toBe(expectedValue.position);
  });
  
  test('should return X positions', () => {
    const xPositionGenerator = getXYPositions(testEntity, 'X');
    const expectedValue = {
      startPositionValue: 285,
      endPositionValue: 293,
      position: '0.433416'
    };
    const actualValue = xPositionGenerator.next().value;
    
    expect(actualValue.startPositionValue).toBe(expectedValue.startPositionValue);
    expect(actualValue.endPositionValue).toBe(expectedValue.endPositionValue);
    expect(actualValue.position).toBe(expectedValue.position);
  });
});

export {}
