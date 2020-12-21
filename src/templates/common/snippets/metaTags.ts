export const metaTags = (nonce: string, cspSource: string): string => {
  return `
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" 
      content="default-src ${cspSource} vscode-resource: 'nonce-${nonce}';
      img-src ${cspSource} vscode-resource: data: 'nonce-${nonce}';
      script-src ${cspSource} vscode-resource: 'nonce-${nonce}';
      style-src ${cspSource} vscode-resource: 'nonce-${nonce}'";
    >
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  `;
};
