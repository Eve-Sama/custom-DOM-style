/** Messages between all pages */

// Use H5 send message
function sendCDSMessage(data: any): void {
  window.postMessage(data, '*');
}

// Listen H5 message
window.addEventListener(
  'message',
  function (e) {
    const { data } = e;
    console.log(data, `data`);
    // toast(data);
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
