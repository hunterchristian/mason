import generateEntityAtPosition from './index';
import {
  expectedXYPosEntity,
  expectedXYPosEntityReplacement
} from '../../util/testEntities';

describe('generateEntityAtPosition', () => {
  test('should replace X and Y template values', () => {
    const actual = generateEntityAtPosition('A', 5, 8, expectedXYPosEntity);
    expect(actual).toBe(expectedXYPosEntityReplacement);
  });
});
