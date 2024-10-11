![Workspace Sidebar Preview](../docs/images/logo/logo.png)

# Configuration

[Back to Readme](../README.md)

More information about certain configuration options that don't fit into the table on the readme.

## Compact Folders

Tree view respects the explorer setting "Compact Folders".
This will combine empty folders in the tree into one folder:

| Without Compact                                       | With Compact                                             |
| ----------------------------------------------------- | -------------------------------------------------------- |
| ![List View](../docs/images/configuration/normal.png) | ![List View](../docs/images/configuration/compacted.png) |

This is an explorer setting and not part of this extension's settings.

## Condense Folders

Condense will render workspaces in their parent folder if there is only one workspace in a folder:

| Without Condense                                           | With Condense                                            |
| ---------------------------------------------------------- | -------------------------------------------------------- |
| ![List View](../docs/images/configuration/uncondensed.png) | ![List View](../docs/images/configuration/condensed.png) |

# Root Folders

v2.0.0 allows multiple root folders. These are specified in an array of objects like this:

**Linux / Mac**

```json
{
  "workspaceSidebar.rootFolders": [
    { "path": "/home/user/apps", "excludeHiddenFolders": false}
    { "path": "~/projects", "depth": 2} // "~" will be replaced with "/home/user"
    { "path": "/home/user/dev"}
  ]
}
```

**Windows**

```json
{
  "workspaceSidebar.rootFolders": [
    { "path": "C:\\Users\\User\\Apps", "excludeHiddenFolders": false}
    { "path": "C:\\Users\\User\\Projects", "depth": 2}
    { "path": "Z:\\VM Dev\\vsc"}
  ]
}
```

### Root Folder

- **path** _string_ (required)

  - The absolute path to a folder
  - There is no variable substitution, but "~/" can be used on Mac/Linux instead of "/home/user/"

- **depth** _int_

  - The depth of subfolders to search. This overrides `workspaceSidebar.depth`
  - The integers can range from 0-25

- **excludeHiddenFolders** _bool_

  - Should hidden folders be skipped when searching for Workspaces? This overrides `workspaceSidebar.excludeHiddenFolders`
  - Searching hidden folders can slow down the search.

### Paths

In addition to normal folders, some other kinds of folders work too:

- **Windows**:
  - Junctions/SymLinks can be used
  - _Shortcuts don't work_
  - _Hard Links not tested_
- **Mac**:
  - SymLinks can be used
  - _Aliases don't work_
  - _Hard Links not tested_
- **Linux**
  - SymLinks can be used
  - _Hard Links not tested_

## Show File Icons Config

File icons are displayed based on substring matches against the file path to Workspaces.

Keys are languages or file types and each kay can match a number of strings.

```json
  "workspaceSidebar.showFileIconsConfig": {
    "language": ["keyword", "keyword"],
    "filetype": ["keyword"],
  }
```

Some examples might look like:

```json
  "workspaceSidebar.showFileIconsConfig": {
    "react": ["redux"],
    "ts": ["vsc", "electron"],
  }
```

And these would match as follows:

```javascript
  // Displays react icon as "redux" matches
  /home/users/Dev/react/redux/counter/counter.code-workspace

  // Displays ts icon as "vsc" matches
  /home/users/Dev/vsc/extension.code-workspace

  // Displays ts icon as "electron" matches due to deeper folders being checked first.
  /home/users/Dev/react/redux/electron/nextjs-app/na.code-workspace

  // Displays react icon as "redux" in name matches
  /home/users/Dev/vsc/redux.code-workspace
```

[More information about file icons](./File%20Icon%20Themes.md)
