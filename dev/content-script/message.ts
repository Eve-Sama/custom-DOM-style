/** Messages between all pages */

// Use H5 send message
function sendCDSMessage(action: string, info: any): void {
  window.postMessage({ type: 'cds', data: { action, info } }, '*');
}

// Listen H5 message
window.addEventListener('message', function (e) {
  const { type, data } = e.data;
  // filter other project H5 message
  if (type !== 'cds') {
    return;
  }
  const { action } = data;
  if (action === 'preview-dom-style') {
    const css = getCssSetting();
    applyDomSyle(dom, css);
  } else if (action === 'save-dom-style') {
    const css = getCssSetting();
    const path = getPath(dom);
    applyDomSyle(dom, css);
    saveDomStyle({ path, css });
    hideDomSettingPanel();
  } else if (action === 'cancelSelect') {
    closeSelectMode();
    hideSelectTip();
  } else if (action === 'cancelSetting') {
    hideDomSettingPanel();
  }
});

// Listen message from popup or background;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { type, data } = request;
  // really need to tell?
  if (type !== 'cds') {
    return;
  }
  const { action } = data;
  switch (action) {
    case 'select-mode':
      openSelectMode();
      break;
    case 'remove-cds-style':
      removeStyle();
      break;
  }
});
