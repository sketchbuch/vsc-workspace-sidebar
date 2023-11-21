# Workspace Sidebar

Adds a sidebar to VSCode that lists Workspaces and lets you open them in the current window or a new window.

![Workspace Sidebar Preview](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/preview.gif)

Two display modes are available, a list view and a file tree view.

The currently active workspace is highlighted, or in tree mode, any folder if closed that contains the active workspace.

A search box is provided to allow you to search for a specific Workspace.

## Example Screen Shots

![List View](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/listview.png 'List View')
![Tree View](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/treeview.png 'Tree View')
![Searching](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/search.png 'Searching')
![Seti Theme in Tree View](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/treeview%20seti.png 'Seti Theme in Tree View')

File theme icons can also be displayed. For more information see the [File Icon Themes](./docs//File%20Icon%20Themes.md) documentation.

## Settings

### General

| Setting                | Description                                                                                                                                                                                             | Default Value  | Type          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------- |
| Actions                | The default action when clicking on a workspace. By default, clicking opens the workspace in the current window and the icon click in a new window. You can use this setting to reverse this behaviour. | Current Window | Dropdown List |
| Clean Labels           | Should workspace labels be converted to Title Case? If not their filename will be used as-is.                                                                                                           | True           | Boolean       |
| Depth                  | The depth of subfolders to include in the search.                                                                                                                                                       | 0              | Number 0-25   |
| Show File Icons        | Show icons from the active file icon theme.                                                                                                                                                             | true           | Boolean       |
| Show File Icons Config | Config for file icon matching. See [File Icon Themes](./docs//File%20Icon%20Themes.md) documentation for more information.                                                                              | {}             | Object        |

### Folders

| Setting      | Description                                                                                                                     | Default Value                                        | Type                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------- |
| Excluded     | Folders to exclude when searching for workspace files                                                                           | [ "node_modules", "build", "dist", "out", "public" ] | Array of folder names              |
| Root Folders | The folders to look for workspace files in. **~/** will also be replaced with your home folder in all folders within the array. | []                                                   | Array of absolute paths to folders |

### List View

| Setting    | Description                                                                                                                                                                     | Default Value | Type          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------- |
| Show Paths | Show the paths to the workspaces in the sidebar. Available options are: 'Always', 'Never', 'As needed' (will only display paths if there are duplicate labels). List View only. | As Needed     | Dropdown List |

### Search

| Setting          | Description                                                                                                                                | Default Value | Type         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ------------ |
| Case Insensitive | Should searching be case insensitive?                                                                                                      | False         | Boolean      |
| Match Start      | Should searching start from the beginning of the workspace label? False means matches will be looked for anywhere within workspace labels. | False         | Boolean      |
| Search minimum   | The minimum number of workspaces required before the search box is displayed. 0 Will always display the search box.                        | 15            | Number 0-100 |

### Tree View

| Setting               | Description                                                                                                                                            | Default Value | Type    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ------- |
| Condense File Tree    | Reduce visual noise by removing sufolders with only one workspace in. These workspace files will then be shown in their parent folder. Tree View only. | True          | Boolean |
| Show Folder Hierarchy | Display a file tree of workspaces with collapsable folders instead of the default list.                                                                | False         | Boolean |
| Show Root Folder      | Show the root folder when rendering a file tree.                                                                                                       | False         | Boolean |

In addition to the above, the tree view also respects the explorer setting "Compact Folders".

## Workspace Cache

The collected workspaces are cached. You can clear the cache and recollect workspaces by clicking on the refresh icon.

A change in the config values: Depth, Excluded Folders, and Folder will automatically dump the cache and cause workspaces to be recollected.

The cache will also be dumped if any workspaces are created in the folders in the current workspace.

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

### [1.7.1](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.7.0...v1.7.1) (2023-10-12)

- Closes [#89](https://github.com/sketchbuch/vsc-workspace-sidebar/issues/89)
- Fixed rendering of file icons on windows

## Multiroot Todo

- Update doc images inc. preview
- Folder needs rendering if showing root folder error message
