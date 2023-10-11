# File Icon Themes

> **EXPERIMENTAL FEATURE**

It is now possible to display file icon theme icons in both the list view and tree view. The idea is to display a matching language icon next to workspaces, i.e. flutter workspaces show the flutter icon next to the workspace label.

There is no in-built API way to show file icons in VSCode Webviews, only in VSCode Treeviews. To make this possible, a custom NPM package was created which you can also use in your own webview extensions.

To match icons, substrings will be matched against the absolute file path to each workspace.

Matches are made in the followig order:

1. Code workspace name. Names are split on space, underscore, hyphen, and dots and each element is then checked for a matching icon
2. Folders to the workspaces files are split and checked for a matching icon. Priority is given to deeper folders first.
3. If no match is found, an icon for workspaces will be used if the theme contains one
4. If no workspace icon is found, a generic file icon will be used if the theme contains one
5. If all the above fail to find a match, the default icon that has always beeen displayed will be used instead.

## Configuration

As Workspace Sidebar just displays workspaces, I couldn't match file ext to specific icons. I also did not want to provide a configuration for each workspace. Rather, a configuration option is provided to aid in matching substrings to icons.

This is required because file themes in vscode don't have to support the same icons, a designer can provide only the icons that they want to. This means some themes have file extension icons, some themes have language icons, some have file name icons.

Also the exact icons each provides are not set, so one theme may have an icon for the typescript language, and another may not, even though both may have defined icons for languages.

The configuration is an object with a key to a language/extension and each key has an array of matches. An example that I use for my current workspaces is:

```json
  "workspaceSidebar.showFileIconsConfig": {
    "dart": ["flutter"],
    "java": ["ea"],
    "javascript": ["js", "gnome"],
    "js": ["gnome"],
    "markdown": ["obsidian", "review", "sketchbuch"],
    "md": ["obsidian", "review", "sketchbuch"],
    "react": ["rjs"],
    "ts": ["deadfire", "vsc", "vscode", "electron", "todo"],
    "typescript": ["deadfire", "ts", "vsc", "vscode"],
    "typescriptreact": ["electron", "todo"],
    "yaml": ["ansible"],
    "yml": ["ansible"],
  }
```

You can see some necessary duplication, "ts" contains strings that should match to the icon for the file extension ".ts", and the language "typescript" matches similar terms for themes that have a typescript language icon but no .ts icon. The same can be seen for js and yml for example.

Unless you are changing file icon themes every hour or constantly creating different file trees for your workspaces, this should not be too difficult to maintain and the above configuration doesn't need changing any more, and works with all themes that I tried.

### Issues

I don't use the file icons (a user requested this feature) or tree view much, so if you have any issues with the file icon themes I'm unlikely to run across it myself, so please [report any issues](https://github.com/sketchbuch/vsc-workspace-sidebar/issues) that you find.

Also I don't change themes (colour or file icon) in VSCode, so if you find issues with themes please let me know as well, but I think most issues can be fixed via the above config. Also, keep in mind that not all themes have the same icons, so if you see a generic file icon from the theme you are using instead of a specific langauge/extension icon even though you have configuration for that langauge/extension it means there is no matching icon in that theme.

### Examples

![Emoji in Tree View](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/treeview%20emoji.png 'Emoji in Tree View')
![Material in Tree View](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/treeview%20material.png 'Material in Tree View')
![Seti Theme in Tree View](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/treeview%20seti.png 'Seti Theme in Tree View')
![Seti Theme in List View](https://raw.githubusercontent.com/sketchbuch/vsc-workspace-sidebar/master/docs/images/listview%20seti.png 'Seti Theme in List View')
