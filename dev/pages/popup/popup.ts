$('#setting-center').click(() => {
  window.open(chrome.extension.getURL('dist/pages/background/background.html'));
});

/**
 * Send message to『content-script』
 * @param {Object} request Data with JSON
 */
function sendMessage(message: any): void {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, message, null);
  });
}

$('#select-dom-open').click(() => {
  sendMessage({ messageType: 'select-mode', data: { action: 'open' } });
  window.close();
});

$('#select-dom-close').click(() => {
  sendMessage({ messageType: 'select-mode', data: { action: 'close' } });
});

$('#send-message-to-background').click(() => {
  console.log('mes');
  chrome.runtime.sendMessage(
    { messageType: 'add-elem', data: { url: 'baidu.com', selector: '#title' } },
    null
  );
  /**
   * 向 background 发送消息有两种方式, 一种是通过 chrome.runtime.sendMessage
   * 这种方式会向所有的 content-scripts 以及 background 发送消息
   * 另外种是 chrome.extension.getBackgroundPage, 这种方式仅限于 popup 和 background交互, 也就是说 content-scripts 是不可以使用的
   * 网上有两种方式的比较并且明确表示与 background 交互就应该使用 getBackgroundPage. 具体链接如下
   * https://stackoverflow.com/questions/21146457/chrome-extension-getbackgroundpage-function-example
   * 但目前并没有感知到 chrome.runtime.sendMessage 的弊端, 先用这种吧, 比较简单直爽.
   */
  // const backgroundPage = chrome.extension.getBackgroundPage();
  // backgroundPage.showData();
  // backgroundPage.data = 2;
  // backgroundPage.showData();
});
