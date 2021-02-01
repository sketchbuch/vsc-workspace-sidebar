(function () {
  const vscode = acquireVsCodeApi();
  const newWinIcons = Array.from(document.getElementsByClassName('list__icon'));
  const wsElements = Array.from(document.getElementsByClassName('list__element'));

  const sendMessage = (action, file) => {
    if (file) {
      vscode.postMessage({
        action,
        payload: { file },
      });
    }
  };

  const handleIconClick = (event) => {
    sendMessage('OPEN_NEW_WINDOW', event.currentTarget.dataset.file);
  };

  const handleElementClick = (event) => {
    sendMessage('OPEN_CUR_WINDOW', event.currentTarget.dataset.file);
  };

  document.addEventListener('DOMContentLoaded', () => {
    newWinIcons.forEach((element) => {
      element.addEventListener('click', handleIconClick);
    });

    wsElements.forEach((element) => {
      element.addEventListener('click', handleElementClick);
    });
  });

  window.addEventListener('unload', () => {
    newWinIcons.forEach((element) => {
      element.removeEventListener('click', handleIconClick);
    });

    wsElements.forEach((element) => {
      element.removeEventListener('click', handleElementClick);
    });
  });
})();
