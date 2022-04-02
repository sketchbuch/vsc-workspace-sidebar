(function () {
  const vscode = acquireVsCodeApi();

  let folderSaveBtn = null;
  let newWinIcons = null;
  let searchInput = null;
  let searchTerm = '';
  let viewLinks = null;
  let wsElements = null;
  let wsFolders = null;

  const sendMessage = (action, payload) => {
    const message = { action };

    if (payload !== undefined) {
      message.payload = payload;
    }

    vscode.postMessage(message);
  };

  const handleElementClick = (event) => {
    event.stopPropagation();
    sendMessage('MAIN_CLICK', event.currentTarget.dataset.file);
  };

  const handleFolderClick = (event) => {
    event.stopPropagation();
    sendMessage('FOLDER_CLICK', event.currentTarget.dataset.folder);
  };

  const handleIconClick = (event) => {
    event.stopPropagation();
    sendMessage('ICON_CLICK', event.currentTarget.dataset.file);
  };

  const handleSaveFolderClick = () => {
    sendMessage('SAVE_WS');
  };

  const handleSearchChange = (event) => {
    searchTerm = event.target.value;
  };

  const handleSearchSubmit = () => {
    sendMessage('SEARCH', searchTerm);
  };

  const handleSearchKeyUp = (event) => {
    if (event.key === 'Escape') {
      searchTerm = '';
      handleSearchSubmit();
    } else if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleSearch = (event) => {
    if (event.target.value === '') {
      searchTerm = '';
      handleSearchSubmit();
    }
  };

  const handleViewLInkClick = (event) => {
    event.stopPropagation();
    sendMessage('SHOW_SETTINGS');
  };

  document.addEventListener('DOMContentLoaded', () => {
    const searchInputShadow = document.querySelector('#searchWorkspaces').shadowRoot;

    folderSaveBtn = document.querySelector('#saveFolderAsWorkspace');
    newWinIcons = document.querySelectorAll('.list__buttons');
    viewLinks = document.querySelectorAll('.view__link');
    wsElements = document.querySelectorAll('.list__styled-item--unselected');
    wsFolders = document.querySelectorAll('.list__branch-list-item-folder-closable');

    if (searchInputShadow) {
      searchInput = searchInputShadow.querySelector('input');
    }

    newWinIcons.forEach((element) => {
      element.addEventListener('click', handleIconClick);
    });

    if (searchInput) {
      searchInput.addEventListener('change', handleSearchChange);
      searchInput.addEventListener('keyup', handleSearchKeyUp);
      searchInput.addEventListener('search', handleSearch);
    }

    viewLinks.forEach((element) => {
      element.addEventListener('click', handleViewLInkClick);
    });

    wsElements.forEach((element) => {
      element.addEventListener('click', handleElementClick);
    });

    wsFolders.forEach((element) => {
      element.addEventListener('click', handleFolderClick);
    });

    if (folderSaveBtn) {
      folderSaveBtn.addEventListener('click', handleSaveFolderClick);
    }

    if (searchInput && document.activeElement.id !== 'searchWorkspaces') {
      searchInput.focus();
    }
  });

  window.addEventListener('message', event => {
    const message = event.data;

    switch (message.action) {
      case 'FOCUS_SEARCH':
        if (searchInput && document.activeElement.id !== 'searchWorkspaces') {
          searchInput.focus();
        }
        break;

      default:
        break;
    }
  });

  window.addEventListener('unload', () => {
    newWinIcons.forEach((element) => {
      element.removeEventListener('click', handleIconClick);
    });

    if (searchInput) {
      searchInput.removeEventListener('change', handleSearchChange);
      searchInput.removeEventListener('keyup', handleSearchKeyUp);
      searchInput.removeEventListener('search', handleSearch);
    }

    viewLinks.forEach((element) => {
      element.removeEventListener('click', handleViewLInkClick);
    });

    wsElements.forEach((element) => {
      element.removeEventListener('click', handleElementClick);
    });

    wsFolders.forEach((element) => {
      element.removeEventListener('click', handleFolderClick);
    });

    if (folderSaveBtn) {
      folderSaveBtn.removeEventListener('click', handleSaveFolderClick);
    }
  });
})();
