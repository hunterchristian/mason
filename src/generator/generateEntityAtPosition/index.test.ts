const generateEntityAtPosition = require('./index');
const {
  expectedXYPosEntity,
  expectedXYPosEntityReplacement
} = require('../../util/testEntities');

describe('generateEntityAtPosition', () => {
  test('should replace X and Y template values', () => {
    const actual = generateEntityAtPosition('A', 5, 8, expectedXYPosEntity);
    expect(actual).toBe(expectedXYPosEntityReplacement);
  });
});

export {}