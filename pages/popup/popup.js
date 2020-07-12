$('#setting-center').click(() => {
  window.open(chrome.extension.getURL('./pages/background/background.html'));
});

/**
 * Send message to『content-script』
 * @param {Object} request Data with JSON
 */
function sendMessage(request) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, request, null);
  });
}

$('#select-dom-open').click(() => {
  sendMessage({ messageType: 'select-DOM', data: { action: 'open' } });
});

$('#select-dom-close').click(() => {
  sendMessage({ messageType: 'select-DOM', data: { action: 'close' } });
});
