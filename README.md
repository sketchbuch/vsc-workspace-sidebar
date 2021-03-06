# Workspace Sidebar

**(vsc-workspace-sidebar)**

Adds a sidebar to VSCode that lists Workspaces and lets you open them in the current window or a new window. The results are cached for 12 Hours but there is a refresh button that you can click to recollect workspaces at any time.

Workspaces can also be sorted ascending or descending and the currently loaded workspace is highlighted.

A search box is also available to allow you to look for a specific Workspace.

![alt text](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/preview.gif 'Workspace Sidebar Preview')

## Settings

| Setting        | Description                                                                                                                                                     | Default Value                        | Type          |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------- |
| Folder         | The folder to look for workspace files in. If Folder is empty, your home folder will be used. **~/** will also be replaced with your home folder.               | None (your home folder will be used) | String        |
| Depth          | The depth of subfolders to include in the search.                                                                                                               | 0                                    | Number 0-5    |
| Search minimum | The minimum number of workspaces required before the search box is displayed. 0 Will always display the search box.                                             | 15                                   | Number 0-100  |
| Show Paths     | Show the paths to the workspaces in the sidebar. Available options are: 'Always', 'Never', 'As needed' (will only display paths if there are duplicate labels). | As Needed                            | Dropdown List |

## Translations

This extension is localised, if you want it in your language please send me a translated "package.nls.json" file which you can find in the root of this extension.

## Latest Version

#### [1.2.8](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.2.7...1.2.8) (2021-06-08)

- Resolves [#26](https://github.com/sketchbuch/vsc-workspace-sidebar/issues/26) - Webview shows 404 due to navigation being caused by search form - navigation is not supported in webviews. See also: https://github.com/microsoft/vscode/issues/125485
