import { expect } from 'chai';
import { convertWsFiles } from '../../../../webviews/Workspace/helpers/convertWsFiles';
import { Files } from '../../../../webviews/Workspace/WorkspaceViewProvider.interface';

suite('Webviews > Workspace > convertWsFiles():', () => {
  test('Returns an empty array if no files', () => {
    expect(convertWsFiles([], '')).to.eql([]);
  });

  test('Correctly converts the files', () => {
    const expected: Files = [
      {
        file: 'First Project.code-workspace',
        isSelected: false,
        label: 'First Project',
        path: '',
        showPath: true,
      },
      {
        file: 'Second_Work-Space.code-workspace',
        isSelected: false,
        label: 'Second Work Space',
        path: '',
        showPath: true,
      },
    ];
    expect(
      convertWsFiles(
        ['First Project.code-workspace', 'Wrong.ext', 'Second_Work-Space.code-workspace'],
        ''
      )
    ).to.eql(expected);
  });
});
