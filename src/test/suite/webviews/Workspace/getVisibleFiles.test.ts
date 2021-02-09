import { expect } from 'chai';
import { FS_WS_FILETYPE } from '../../../../constants';
import { getVisibleFiles } from '../../../../webviews/Workspace/helpers/getVisibleFiles';

suite('Webviews > Workspace > getVisibleFiles():', () => {
  test('Returns file array sorted ascended', () => {
    const files = [`file-2.${FS_WS_FILETYPE}`, `file-1.${FS_WS_FILETYPE}`];
    const expectedFiles = [
      {
        file: `file-1.${FS_WS_FILETYPE}`,
        isSelected: false,
        label: 'File 1',
        path: '',
      },
      {
        file: `file-2.${FS_WS_FILETYPE}`,
        isSelected: false,
        label: 'File 2',
        path: '',
      },
    ];
    const result = getVisibleFiles(files, '', '', 'ascending');

    expect(result).to.eql(expectedFiles);
  });

  test('Returns file array sorted descended', () => {
    const files = [`file-1.${FS_WS_FILETYPE}`, `file-2.${FS_WS_FILETYPE}`];
    const expectedFiles = [
      {
        file: `file-2.${FS_WS_FILETYPE}`,
        isSelected: false,
        label: 'File 2',
        path: '',
      },
      {
        file: `file-1.${FS_WS_FILETYPE}`,
        isSelected: false,
        label: 'File 1',
        path: '',
      },
    ];
    const result = getVisibleFiles(files, '', '', 'descending');

    expect(result).to.eql(expectedFiles);
  });

  test('Returns file array with matching search results', () => {
    const files = [`file-2.${FS_WS_FILETYPE}`, `file-1.${FS_WS_FILETYPE}`];
    const expectedFiles = [
      {
        file: `file-1.${FS_WS_FILETYPE}`,
        isSelected: false,
        label: 'File 1',
        path: '',
      },
    ];
    const result = getVisibleFiles(files, '', 'file 1', 'ascending');

    expect(result).to.eql(expectedFiles);
  });
});
