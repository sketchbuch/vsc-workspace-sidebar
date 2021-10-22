(function () {
  const vscode = acquireVsCodeApi();

  const newWinIcons = Array.from(document.getElementsByClassName('list__buttons'));
  const searchForm = document.getElementById('searchWorkspacesForm');
  const searchInput = document.getElementById('searchWorkspaces');
  const viewLinks = Array.from(document.getElementsByClassName('view__link'));
  const wsElements = Array.from(document.getElementsByClassName('list__element--unselected'));
  const folderSaveBtn = document.getElementById('saveFolderAsWorkspace');
  let searchTerm = '';

  vscode;

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

  const handleIconClick = (event) => {
    event.stopPropagation();
    sendMessage('ICON_CLICK', event.currentTarget.dataset.file);
  };

  const handleSaveFolderClick = () => {
    sendMessage('SAVE_WS');
  };

  const handleSearchSubmit = (event) => {
    sendMessage('SEARCH', searchTerm);

    // Stop submit navigating: https://github.com/microsoft/vscode/issues/125485
    // Should be done after sending message otherwise the message is not dispatched
    if (event) {
      event.preventDefault();
    }
  };

  const handleSearchChange = (event) => {
    searchTerm = event.target.value;
  };

  const handleSearchKeyUp = (event) => {
    if (event.key === 'Escape') {
      searchTerm = '';
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
    newWinIcons.forEach((element) => {
      element.addEventListener('click', handleIconClick);
    });

    if (searchForm) {
      searchForm.addEventListener('submit', handleSearchSubmit);
    }

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

    if (searchForm) {
      searchForm.removeEventListener('submit', handleSearchSubmit);
    }

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

    if (folderSaveBtn) {
      folderSaveBtn.removeEventListener('click', handleSaveFolderClick);
    }
  });
})();
