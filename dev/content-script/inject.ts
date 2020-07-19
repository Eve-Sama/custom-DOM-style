/**
 * Scripts that should be injected in the web page
 * Idk the function whether will pollute origin web page
 */

function preview(): void {
  sendInjectMessage('preview-dom-style');
}

function save(): void {
  sendInjectMessage('save-dom-style');
}

function sendInjectMessage(action: string, info?: any): void {
  window.postMessage({ type: 'cds', data: { action, info } }, '*');
}
