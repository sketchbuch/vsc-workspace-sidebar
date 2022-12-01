# Workspace Sidebar

**(vsc-workspace-sidebar)**

Adds a sidebar to VSCode that lists Workspaces and lets you open them in the current window or a new window. The results are cached for 12 Hours but there is a refresh button that you can click to recollect workspaces at any time.

Two display modes are available:

1. List - Can be sorted asc/desc
2. File Tree - A representation of the file tree to all workspaces. Can be collapsed/expanded.

The currently active workspace is highlighted, or in tree mode, any folder if closed that contains the active workspace

A search box is provided to allow you to search for a specific Workspace.

![alt text](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/preview.gif 'Workspace Sidebar Preview')

## Settings

| Setting            | Description                                                                                                                                                                                                    | Default Value                        | Type          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------- |
| Actions            | What is the default action for clicking on a workspace. By default, clicking opens the workspace in the current window and the icon click in a new window. You can use this setting to reverse this behaviour. | Current Window                       | Dropdown List |
| Clean Labels       | Should workspace labels be converted to Title Case? If not their filename will be used as-is.                                                                                                                  | True                                 | Boolean       |
| Condense File Tree | Reduce visual noise by removing sufolders with only one workspace in. These workspace files will then be shown in their parent folder.                                                                          | True                                 | Boolean       |
| Depth              | The depth of subfolders to include in the search.                                                                                                                                                              | 0                                    | Number 0-25   |
| Folder             | The folder to look for workspace files in. If Folder is empty, your home folder will be used. **~/** will also be replaced with your home folder.                                                              | None (your home folder will be used) | String        |
| Search minimum     | The minimum number of workspaces required before the search box is displayed. 0 Will always display the search box.                                                                                            | 15                                   | Number 0-100  |
| Show File Tree     | Display a tree of workspaces with collapsable folders instead of the default list.                                                                                                                             | False                                | Boolean       |
| Show Paths         | Show the paths to the workspaces in the sidebar. Available options are: 'Always', 'Never', 'As needed' (will only display paths if there are duplicate labels).                                                | As Needed                            | Dropdown List |

## Translations

This extension is localised, if you want it in your language please send me a translated "package.nls.json" file which you can find in the root of this extension.

## Latest Version

#### [1.4.2](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.4.1...1.4.2) (2022-12-01)

- Fixes workspaces with dots in the file names being displayed
- Added option to compact folders if the explorer compact option is true (tree view)
- Updated tests
