(function () {
  const vscode = acquireVsCodeApi();
  const newWinIcons = Array.from(document.getElementsByClassName('list__icon'));
  const wsElements = Array.from(document.getElementsByClassName('list__element'));

  if (newWinIcons && newWinIcons.length > 0) {
    const handleIconClick = (event) => {
      const { file } = event.currentTarget.dataset;

      if (file) {
        vscode.postMessage({
          action: 'OPEN_NEW_WINDOW',
          payload: { file },
        });
      }
    };

    document.addEventListener('DOMContentLoaded', () => {
      newWinIcons.forEach((element) => {
        element.addEventListener('click', handleIconClick);
      });
    });

    window.addEventListener('unload', () => {
      newWinIcons.forEach((element) => {
        element.removeEventListener('click', handleIconClick);
      });
    });
  }

  if (wsElements && wsElements.length > 0) {
    const handleElementClick = (event) => {
      const { file } = event.currentTarget.dataset;

      if (file) {
        vscode.postMessage({
          action: 'OPEN_CUR_WINDOW',
          payload: { file },
        });
      }
    };

    document.addEventListener('DOMContentLoaded', () => {
      wsElements.forEach((element) => {
        element.addEventListener('click', handleElementClick);
      });
    });

    window.addEventListener('unload', () => {
      wsElements.forEach((element) => {
        element.removeEventListener('click', handleElementClick);
      });
    });
  }
})();
