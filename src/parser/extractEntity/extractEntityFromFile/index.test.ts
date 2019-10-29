import extractEntityFromFile from './index';
import { expectedGeneratedDXFFile } from '../../../util/testEntities/expectedGeneratedDXFFile';
import { expectedExtractedEntity } from '../../../util/testEntities/expectedExtractedEntity';

describe('extractEntityFromFile', () => {
  test('should extract entity section of a DXF file', () => {
    const actual = extractEntityFromFile(expectedGeneratedDXFFile);
    expect(actual).toBe(expectedExtractedEntity);
  });
});
