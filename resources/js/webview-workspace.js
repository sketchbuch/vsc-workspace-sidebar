(function () {
  const vscode = acquireVsCodeApi();
  const newWinIcons = Array.from(document.getElementsByClassName('list__icon'));
  const viewLinks = Array.from(document.getElementsByClassName('view__link'));
  const wsElements = Array.from(document.getElementsByClassName('list__element--unselected'));


  const sendMessage = (action, payload) => {
    if (payload) {
      vscode.postMessage({
        action,
        payload,
      });
    }
  };

  const handleIconClick = (event) => {
    sendMessage('OPEN_NEW_WINDOW', event.currentTarget.dataset.file);
  };

  const handleElementClick = (event) => {
    sendMessage('OPEN_CUR_WINDOW', event.currentTarget.dataset.file);
  };

  const handleViewLInkClick = () => {
    vscode.postMessage({ action: 'SHOW_SETTINGS' });
  };

  document.addEventListener('DOMContentLoaded', () => {
    newWinIcons.forEach((element) => {
      element.addEventListener('click', handleIconClick);
    });

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

    viewLinks.forEach((element) => {
      element.removeEventListener('click', handleViewLInkClick);
    });

    wsElements.forEach((element) => {
      element.removeEventListener('click', handleElementClick);
    });
  });
})();
