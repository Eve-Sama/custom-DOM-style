/** Messages between all pages */

interface Path {
  id: string;
  cls: string;
  index: number;
}

interface CssSetting {
  key: string;
  value: string;
}

interface StyleStore {
  host: string;
  path: Path[];
  css: CssSetting[];
}

// Use H5 send message
function sendCDSMessage(action: string, info: any): void {
  window.postMessage({ type: 'cds', data: { action, info } }, '*');
}

// Listen H5 message
window.addEventListener(
  'message',
  e => {
    const { type, data } = e.data;
    if (type !== 'cds') {
      return;
    }
    const { action } = data;
    if (action === 'preview-dom-style') {
      const css = getCssSetting();
      applyDomSyle(dom, css);
    } else if (action === 'save-dom-style') {
      const css = getCssSetting();
      const styleStore: StyleStore = { host, path, css };
      applyDomSyle(dom, css);
      saveDomStyle(styleStore);
      hideDomSettingPanel();
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
