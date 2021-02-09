(function () {
  const vscode = acquireVsCodeApi();

  const newWinIcons = Array.from(document.getElementsByClassName('list__buttons'));
  const searchForm = document.getElementById('searchWorkspacesForm');
  const searchInput = document.getElementById('searchWorkspaces');
  const viewLinks = Array.from(document.getElementsByClassName('view__link'));
  const wsElements = Array.from(document.getElementsByClassName('list__element--unselected'));
  let searchTerm = '';


  const sendMessage = (action, payload) => {
    const message = { action };

    if (payload !== undefined) {
      message.payload = payload;
    }

    vscode.postMessage(message);
  };

  const handleIconClick = (event) => {
    event.stopPropagation();
    sendMessage('OPEN_NEW_WINDOW', event.currentTarget.dataset.file);
  };

  const handleElementClick = (event) => {
    event.stopPropagation();
    sendMessage('OPEN_CUR_WINDOW', event.currentTarget.dataset.file);
  };

  const handleViewLInkClick = (event) => {
    event.stopPropagation();
    sendMessage('SHOW_SETTINGS');
  };

  const handleSearchSubmit = () => {
    sendMessage('SEARCH', searchTerm);
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
  });
})();
