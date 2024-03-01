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

    return { isFile, isFolder }
  } catch (error) {
    return { isFile: false, isFolder: false }
  }
}
