# Workspace Sidebar

**(vsc-workspace-sidebar)**

Adds a sidebar to VSCode that lists Workspaces and lets you open them in the current window or a new window. The results are cached for 12 Hours but there is a refresh button that you can click to refind workspaces at any time. Workspaces can also be sorted ascending or descending and the currently loaded workspace is highlighted with a check mark.

![alt text](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/preview.gif 'Workspace Sidebar Preview')

## Settings

| Setting   | Description                                                                                                                                       | Default Value                        | Type       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------- |
| Folder    | The folder to look for workspace files in. If Folder is empty, your home folder will be used. **~/** will also be replaced with your home folder. | None (your home folder will be used) | String     |
| Depth     | The depth of subfolders to include in the search.                                                                                                 | 0                                    | Number 0-5 |
| Show Path | Show the path to the WS file in the sidebar.                                                                                                      | false                                | Boolean    |

## Translations

This extension is localised, if you want it in your language please send me a translated "package.nls.json" file which you can find in the root of this extension.

## Latest Version

#### [1.1.7](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.1.6...v1.1.7) (2020-11-25)

- Added setting to display path to workspace file in the sidebar (defaults to off)
