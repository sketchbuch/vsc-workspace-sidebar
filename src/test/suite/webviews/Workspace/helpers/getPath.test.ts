import { expect } from 'chai'
import * as path from 'path'
import { FS_WS_FILETYPE } from '../../../../../constants/fs'
import { getPath } from '../../../../../webviews/Workspace/helpers/getPath'

suite('Webviews > Workspace > Helpers > getPath():', () => {
  const FILE_NAME = `create_React-APP`
  const PATH = 'react'
  const OS_HOME = path.join('home', 'user')
  const CONFIG_FOLDER = path.join(OS_HOME, 'dev')
  const FILE = path.join(CONFIG_FOLDER, PATH, `${FILE_NAME}.${FS_WS_FILETYPE}`)

  test('Returns the path between the start folder and the file extension', () => {
    const result = getPath(FILE, CONFIG_FOLDER, OS_HOME)
    expect(result).to.equal(PATH)
  })
})
