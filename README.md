# Workspace Sidebar

**(vsc-workspace-sidebar)**

Adds a sidebar to VSCode that lists Workspaces and lets you open them in the current window or a new window.

Two display modes are available, a list view and a file tree view. The currently active workspace is highlighted, or in tree mode, any folder if closed that contains the active workspace. A search box is provided to allow you to search for a specific Workspace.

File theme icons can also be displayed. For more information see [File Icon Themes](./docs//File%20Icon%20Themes.md).

![alt text](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/preview.gif 'Workspace Sidebar Preview')

## Settings

| Setting            | Description                                                                                                                                                                                                    | Default Value                        | Type          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------- |
| Actions            | What is the default action for clicking on a workspace. By default, clicking opens the workspace in the current window and the icon click in a new window. You can use this setting to reverse this behaviour. | Current Window                       | Dropdown List |
| Clean Labels       | Should workspace labels be converted to Title Case? If not their filename will be used as-is.                                                                                                                  | True                                 | Boolean       |
| Condense File Tree | Reduce visual noise by removing sufolders with only one workspace in. These workspace files will then be shown in their parent folder.                                                                         | True                                 | Boolean       |
| Depth              | The depth of subfolders to include in the search.                                                                                                                                                              | 0                                    | Number 0-25   |
| Folder             | The folder to look for workspace files in. If Folder is empty, your home folder will be used. **~/** will also be replaced with your home folder.                                                              | None (your home folder will be used) | String        |
| Search minimum     | The minimum number of workspaces required before the search box is displayed. 0 Will always display the search box.                                                                                            | 15                                   | Number 0-100  |
| Show File Tree     | Display a tree of workspaces with collapsable folders instead of the default list.                                                                                                                             | False                                | Boolean       |
| Show Paths         | Show the paths to the workspaces in the sidebar. Available options are: 'Always', 'Never', 'As needed' (will only display paths if there are duplicate labels).                                                | As Needed                            | Dropdown List |

In addition to the above, the tree view also respects the explorer setting "Compact Folders".

## Translations

This extension is localised, if you want it in your language please send me a translated "package.nls.json" file which you can find in the root of this extension.

## Development

- Fork or clone the repo.
- Install dependencies
- Run tests or run a development version via the debugger launch panel.
  - Tests can't be run via the node script in package.json
  - Output of tests is found in the termial Debug Console tab
- Lint and typechecking commands exist
  - Typecheck will be run by the launch scripts before
    running tests
- You can package a test version of the extension as a vsix file using the command: vsce package

## Latest Version

### [1.5.1](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.5.0...v1.5.1) (2023-08-25)

- Fixes issues with links in changelog
- Fixes the view title when recollecting workspaces

## Theme Todos

- Fix notification in dark mode
- Package as NPM package and use that,
- See if the wbview can cache the css,
- See if the fileiconkeys created in render vars can be worked out and cached in the webview
