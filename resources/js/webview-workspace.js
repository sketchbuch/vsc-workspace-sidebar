(function () {
  const vscode = acquireVsCodeApi();
  const wsElements = document.getElementsByClassName('list__element');

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
      Array.from(wsElements).forEach((element) => {
        element.addEventListener('click', handleElementClick);
      });
    });

    window.addEventListener('unload', () => {
      Array.from(wsElements).forEach((element) => {
        element.removeEventListener('click', handleElementClick);
      });
    });
  }
})();
