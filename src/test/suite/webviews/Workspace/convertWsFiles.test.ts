import { expect } from 'chai';
import { convertWsFiles } from '../../../../webviews/Workspace/helpers/convertWsFiles';

suite('Webviews > Workspace > convertWsFiles():', () => {
  test('Returns an empty array if no files', () => {
    expect(convertWsFiles([], '')).to.eql([]);
  });

  test('Correctly converts the files', () => {
    expect(
      convertWsFiles(
        ['First Project.code-workspace', 'Wrong.ext', 'Second_Work-Space.code-workspace'],
        ''
      )
    ).to.eql([
      {
        file: 'First Project.code-workspace',
        isSelected: false,
        label: 'First Project',
        path: '',
      },
      {
        file: 'Second_Work-Space.code-workspace',
        isSelected: false,
        label: 'Second Work Space',
        path: '',
      },
    ]);
  });
});
