(function () {
  const vscode = acquireVsCodeApi();

  const folderSaveBtn = document.querySelector('#saveFolderAsWorkspace');
  const addToFolderRootsBtn = document.querySelector('#addToFolderRoots');
  const newWindowIconBtns = document.querySelectorAll('.list__button[data-type="new-window"]');
  const filemanagerIconBtns = document.querySelectorAll('.list__button[data-type="open-filemanager"]');
  const refreshIconBtns = document.querySelectorAll('.list__button[data-type="refetch-rootfolder"]');
  const searchOptions = document.querySelectorAll('.searchBox__options-button--toggle');
  const searchInput = document.querySelector('#searchWorkspaces');
  const viewLinks = document.querySelectorAll('.view__link');
  const wsElements = document.querySelectorAll('.list__styled-item--unselected');
  const wsFolders = document.querySelectorAll('.list__branch-list-item-folder--closable');
  const folderEvent = wbExpand && wbExpand === 'doubleClick' ? 'dblclick' : 'click';

  let searchTerm = '';

  const sendMessage = (action, payload) => {
    const message = { action };

    if (payload !== undefined) {
      message.payload = payload;
    }

    vscode.postMessage(message);
  };

  const handleAddToRootFoldersClick = () => {
    sendMessage('ADD_TO_ROOTS');
  };
  const handleElementClick = (event) => {
    event.stopPropagation();
    sendMessage('MAIN_CLICK', event.currentTarget.dataset.file);
  };

  const handleFolderClick = (event) => {
    event.stopPropagation();
    sendMessage('FOLDER_CLICK', JSON.stringify({ folder: event.currentTarget.dataset.folder, folderPath: event.currentTarget.dataset.folderpath }));
  };

  const handleIconClick = (event) => {
    event.stopPropagation();
    sendMessage('ICON_CLICK', event.currentTarget.dataset.file);
  };

  const handleFilemanagerIconClick = (event) => {
    event.stopPropagation();
    sendMessage('ICON_CLICK_FILEMANAGER', event.currentTarget.dataset.file);
  };

  const handleRefreshIconClick = (event) => {
    event.stopPropagation();
    sendMessage('ICON_CLICK_REFETCH', event.currentTarget.dataset.file);
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

  const handleViewLinkClick = (event) => {
    event.stopPropagation();
    sendMessage('VIEW_LINK', event.target.getAttribute('data-type'));
  };

  const handleSearchOptionClick = (event) => {
    event.stopPropagation();

    const button = event.target.closest('vscode-button')

    if (button === null) {
      sendMessage('ERROR_MSG', `vscode-button not found for "${event.target.getAttribute('data-btnname')}"`);
    } else {
      const name = button.getAttribute('name')
      const ariaPressed = button.getAttribute('aria-pressed') === 'true' ? true : false

      searchTerm = searchInput.value;
      handleSearchSubmit();

      if (ariaPressed) {
        sendMessage('SEARCH_CHECKBOX_DISABLE', name);
      } else {
        sendMessage('SEARCH_CHECKBOX_ENABLE', name);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    newWindowIconBtns.forEach((element) => {
      element.addEventListener('click', handleIconClick);
    });

    filemanagerIconBtns.forEach((element) => {
      element.addEventListener('click', handleFilemanagerIconClick);
    });

    refreshIconBtns.forEach((element) => {
      element.addEventListener('click', handleRefreshIconClick);
    });

    if (searchInput) {
      searchInput.addEventListener('change', handleSearchChange);
      searchInput.addEventListener('keyup', handleSearchKeyUp);

      searchTerm = searchInput.value;
    }

    searchOptions.forEach((element) => {
      element.addEventListener('click', handleSearchOptionClick);
    });

    viewLinks.forEach((element) => {
      element.addEventListener('click', handleViewLinkClick);
    });

    wsElements.forEach((element) => {
      element.addEventListener('click', handleElementClick);
    });

    wsFolders.forEach((element) => {
      element.addEventListener(folderEvent, handleFolderClick);
    });

    if (folderSaveBtn) {
      folderSaveBtn.addEventListener('click', handleSaveFolderClick);
    }

    if (addToFolderRootsBtn) {
      addToFolderRootsBtn.addEventListener('click', handleAddToRootFoldersClick);
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
    newWindowIconBtns.forEach((element) => {
      element.removeEventListener('click', handleIconClick);
    });

    filemanagerIconBtns.forEach((element) => {
      element.removeEventListener('click', handleFilemanagerIconClick);
    });

    refreshIconBtns.forEach((element) => {
      element.removeEventListener('click', handleRefreshIconClick);
    });

    if (searchInput) {
      searchInput.removeEventListener('change', handleSearchChange);
      searchInput.removeEventListener('keyup', handleSearchKeyUp);
    }

    searchOptions.forEach((element) => {
      element.removeEventListener('click', handleSearchOptionClick);
    });

    viewLinks.forEach((element) => {
      element.removeEventListener('click', handleViewLinkClick);
    });

    wsElements.forEach((element) => {
      element.removeEventListener('click', handleElementClick);
    });

    wsFolders.forEach((element) => {
      element.removeEventListener(folderEvent, handleFolderClick);
    });

    if (folderSaveBtn) {
      folderSaveBtn.removeEventListener('click', handleSaveFolderClick);
    }

    if (addToFolderRootsBtn) {
      addToFolderRootsBtn.removeEventListener('click', handleAddToRootFoldersClick);
    }
  });
})();
