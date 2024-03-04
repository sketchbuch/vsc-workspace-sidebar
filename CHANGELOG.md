![Workspace Sidebar Preview](docs/images/logo/logo.png)

# Change Log

[Back to Readme](README.md)

## [2.0.0](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.7.1...v2.0.0) (2024-03-??)
- Mutiple root folders
- Better invalid folder handling
- Removed sorting of workspaces in list view
- Updated documentation

## [1.7.1](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.7.0...v1.7.1) (2023-10-12)

- Closes [#89](https://github.com/sketchbuch/vsc-workspace-sidebar/issues/89)
- Fixed rendering of file icons on windows

## [1.7.0](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.6.1...v1.7.0) (2023-10-11)

- Closes [#87](https://github.com/sketchbuch/vsc-workspace-sidebar/issues/87)
- Removed cache duration. Cache will persist until manually refreshing or until certain config values are changed (see readme)
- Added search options to config
- Added excluded folders to config to allow additional folders to be specified
- Clean Labels no only requires a rerender rather than dumping the cache.
- Update documentation
- File icon matching updates

## [1.6.1](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.6.0...v1.6.1) (2023-09-23)

- Closes #85 - Sometimes the match only works if the first segment is matched
- Update documentation

## [1.6.0](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.5.1...v1.6.0) (2023-09-23)

- Closes #81 - Support file icon themes

## [1.5.1](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.5.0...v1.5.1) (2023-08-25)

- Fixes issues with links in changelog
- Fixes the view title when recollecting workspaces

## [1.5.0](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.4.2...v1.5.0) (2023-08-25)

- Fixed #71 - Search term must be lowercase.
  - Search now has two options: search from beginning of label, and case insensitive.
  - Also substrings matching the search terms are now shown
- Fixed #68 - Error message displays folder path is not a directory
  - Added handling for different issues when collecting workspaces: not a folder, no workspaces found, no workspaces found with depth 0, and any other errror
- Restyled the open folder display
- Added an "open in file manager" icon to items and folders
- Updated tests
- Changed linting
- Fixed issues with running tests

## [1.4.2](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.4.1...v1.4.2) (2022-12-01)

- Fixes workspaces with dots in the file names being displayed
- Added option to compact folders if the explorer compact option is true (tree view)
- Updated tests

## [1.4.1](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.4.0...v1.4.1) (2022-03-24)

- Fixes an issue that workspaces in the root directory were not displayed in tree view. Resolves [#47](https://github.com/sketchbuch/vsc-workspace-sidebar/issues/47)
- Tree generation has been changed so that sorting of sub folders and files is possible. In 1.4.0 folders always came before workspaces.
- A config setting has been added to decide if the tree should be condensed or not (default is true). Condensing removes subfolders if they are no further subfolders and there is only one workspace file within it. The Workspace is then displayed in their parent folder to reduce visual noise if you only ever have one workspace per folder.
- Added more tests, refactored tests and improved file/file tree mocks

## [1.4.0](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.2.8...v1.4.0) (2022-03-21)

- Workspaces can now be displayed as a file tree that can be collapsed/expanded instead of the default list of workspaces. Resolves [#23](https://github.com/sketchbuch/vsc-workspace-sidebar/issues/23)
- A new option has been added to clean labels (convert to title case) or leave them as-is (like the filename). Resolves [#42](https://github.com/sketchbuch/vsc-workspace-sidebar/issues/42)
- If no workspace is open, any folder(s) that you open will be displayed in the sidebar and you can also save them as a new workspace. Resolves [#30](https://github.com/sketchbuch/vsc-workspace-sidebar/issues/30)
- Refactor/restructure of code
- Additional unit tests
- @vscode/webview-ui-toolkit is now used for buttons. Search box still needs converting.
- @vscode/codicons is now used for icons, where possible.
- Icons updated
- Fixed tooltips for the icon an dthe workspace if you make new window the default click action.

## [1.2.8](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.2.7...v1.2.8) (2021-06-08)

- Resolves [#26](https://github.com/sketchbuch/vsc-workspace-sidebar/issues/26) - Webview shows 404 due to navigation being caused by search form - navigation is not supported in webviews. See also: https://github.com/microsoft/vscode/issues/125485

## [1.2.7](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.2.6...v1.2.7) (2021-06-01)

- Resolves [#21](https://github.com/sketchbuch/vsc-workspace-sidebar/issues/21) - Search box is focused. Also a keyboard shortcut is provided to focus the search box.

## [1.2.6](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.2.5...v1.2.6) (2021-05-30)

- Fixed [#22](https://github.com/sketchbuch/vsc-workspace-sidebar/issues/22) - First char from paths in the sidebar was always cropped even if not a slash

## [1.2.5](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.2.4...v1.2.5) (2021-02-25)

- Fixed an issue where workspaces were not found in .vscode
- Fixed an issue on Windows wih highlighting the active Workspace due to inconsistent drive letter case.

## [1.2.4](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.2.2...v1.2.4) (2021-02-11)

- Fixed a bug with the configuration due to translations
- Optimised getting visible files

## [1.2.2](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.1.9...v1.2.2) (2021-02-11)

- Switched from TreeView to WebView to allow for more customisation of the UI and to facilitate future feature changes
- Added better highlighting of the selected Workspace
- Added a search field
- Show paths has a new option: "As needed" and is a dropdown rather than a checkbox. "As needed" will only show the paths when there are duplicate Workspace labels and this is now the default show paths option.
- Bundled extension with Parcel
- Added unit tests
- Updated docs
- Fixed isues on Windows
- Updated some translations

## [1.1.9](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.1.8...v1.1.9) (2020-12-03)

- Update tree items icon path

## [1.1.8](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.1.7...v1.1.8) (2020-12-02)

- Detect .code-workspace file creation and recollect worksapce files
- Enabling the setting to display paths no longer dumps the cache and recollects workspace files, instead the UI is just updated
- Displayed paths now have the Folder in settings replaced with ellipsis (…)

## [1.1.7](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.1.6...v1.1.7) (2020-11-25)

- Added setting to display path to workspace file in the sidebar (defaults to off)

## [1.1.6](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.1.4...v1.1.6) (2020-08-11)

- Replaced localisation code with "vscode-ext-localisation"

## [1.1.4](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.1.3...v1.1.4) (2020-06-14)

- Finding workspaces is now faster

## [1.1.3](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.1.2...v1.1.3) (2020-06-12)

- Added sorting option

## [1.1.2](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.1.1...v1.1.2) (2020-06-10)

- The active workspace is now indicated by an icon

## [1.1.1](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.0.9...v1.1.1) (2020-06-10)

- Added cache to store data for 12 hours
- Added refresh button to view that will clear the cache and rescan for workspaces

## [1.0.9](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.0.6...v1.0.9) (2020-06-06)

- Tweak of translation loading

## [1.0.6](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.0.3...v1.0.6) (2020-06-06)

- New icon

## [1.0.3](https://github.com/sketchbuch/vsc-workspace-sidebar/compare/v1.0.0...v1.0.3) (2020-06-06)

- Updated readme

## [1.0.0](2020-06-05)

- Initial release
