import * as vscode from 'vscode'
import { ThemeData } from '../ThemeProcessor.interface'

export interface CssProcessorInterface {
  /**
   * Get the CSS for use within a <style> tag
   *
   * @returns {string} The CSS.
   */
  getCss: () => string
}

export class CssProcessor implements CssProcessorInterface {
  constructor(private readonly _data: ThemeData, private readonly _webview: vscode.Webview) {}

  public getCss(): string {
    return ''
  }
}
