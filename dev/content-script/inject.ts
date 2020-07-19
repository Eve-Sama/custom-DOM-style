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

function cancelSelect(): void {
  sendInjectMessage('cancelSelect');
}

function cancelSetting(): void {
  sendInjectMessage('cancelSetting');
}

function sendInjectMessage(action: string, info?: any): void {
  window.postMessage({ type: 'cds', data: { action, info } }, '*');
}

/**
 * Send message to『content-script』
 * @param {Object} request Data with JSON
 */
function sendInjectMessage2(message: any): void {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, message, null);
  });
}