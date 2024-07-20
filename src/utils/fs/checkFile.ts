import * as fs from 'fs'

export interface CheckFile {
  isFile: boolean
  isFolder: boolean
}

export const checkFile = (file: string): CheckFile => {
  try {
    const fileStats = fs.statSync(file)
    const isFolder = fileStats.isDirectory()
    const isFile = fileStats.isFile()

    console.log('### success', isFolder, isFile)

    return { isFile, isFolder }
  } catch (error) {
    console.log('### error', fs.statSync(file))

    return { isFile: false, isFolder: false }
  }
}
