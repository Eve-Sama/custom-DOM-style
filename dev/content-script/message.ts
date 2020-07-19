/** Messages between all pages */

// Use H5 send message
function sendCDSMessage(action: string, data: any): void {
  window.postMessage({ type: 'cds', data: { action, data } }, '*');
}

// Listen H5 message
window.addEventListener(
  'message',
  e => {
    const { type, data } = e.data;
    if (type !== 'cds') {
      return;
    }
    switch (data.action) {
      case 'hideDomSettingPanel':
        hideDomSettingPanel();
        break;
    }
  },
  false
);

// Listen message from popup or background;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { messageType, data } = request;
  switch (messageType) {
    case 'select-mode':
      const { action } = data;
      if (action === 'open') {
        openSelectMode();
      } else if (action === 'close') {
        closeSelectMode();
      }
      break;
  }
});
