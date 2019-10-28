const getXYPositions = require('../getXYPositions');
const insertTemplatesInPlaceOfXYPositions = require('./index');
const {
  testEntity,
  expectedYPosEntity,
  expectedXPosEntity,
  expectedXYPosEntity
} = require('../testEntities');

describe('insertTemplatesInPlaceOfXYPositions', () => {
  test('should insert template for Y positions', () => {
    let MIN_Y_POSITION = 3.0;
    const yPositionGenerator = getXYPositions(testEntity, 'Y');
    let dxfEntityWithYTemplates = insertTemplatesInPlaceOfXYPositions(
      testEntity,
      yPositionGenerator,
      MIN_Y_POSITION,
      'yPosition'
    );

    expect(dxfEntityWithYTemplates).toBe(expectedYPosEntity);
  });
  test('should insert template for X positions', () => {
    let MIN_X_POSITION = 0.0;
    const xPositionGenerator = getXYPositions(testEntity, 'X');
    let dxfEntityWithXTemplates = insertTemplatesInPlaceOfXYPositions(
      testEntity,
      xPositionGenerator,
      MIN_X_POSITION,
      'xPosition'
    );

    expect(dxfEntityWithXTemplates).toBe(expectedXPosEntity);
  });
  test('should insert templates for X and Y positions', () => {
    let MIN_X_POSITION = 0.0;
    const xPositionGenerator = getXYPositions(testEntity, 'X');
    let dxfEntityWithXTemplates = insertTemplatesInPlaceOfXYPositions(
      testEntity,
      xPositionGenerator,
      MIN_X_POSITION,
      'xPosition'
    );
    let MIN_Y_POSITION = 3.0;
    const yPositionGenerator = getXYPositions(dxfEntityWithXTemplates, 'Y');
    let dxfEntityWithXYTemplates = insertTemplatesInPlaceOfXYPositions(
      dxfEntityWithXTemplates,
      yPositionGenerator,
      MIN_Y_POSITION,
      'yPosition'
    );

    expect(dxfEntityWithXYTemplates).toBe(expectedXYPosEntity);
  });
});
