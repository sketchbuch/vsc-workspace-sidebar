import { expect } from 'chai';
import { FS_WS_FILETYPE } from '../../../../constants/fs';
import { getPath } from '../../../../webviews/Workspace/helpers/getPath';

suite('Webviews > Workspace > getPath():', () => {
  const FILE_NAME = `create_React-APP`;
  const PATH = 'react';
  const OS_HOME = '/home/user';
  const CONFIG_FOLDER = `${OS_HOME}/dev`;
  const FILE = `${CONFIG_FOLDER}/${PATH}/${FILE_NAME}.${FS_WS_FILETYPE}`;

  test('Returns the path between the start folder and the file extension', () => {
    const result = getPath(FILE, 20, CONFIG_FOLDER, OS_HOME);
    expect(result).to.equal(PATH);
  });
});
