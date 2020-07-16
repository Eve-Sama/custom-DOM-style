// Inject script to page
$(document).ready(function () {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = chrome.extension.getURL('dist/core/dom-setting-panel.js');
  script.onload = function (event) {
    $(event.target).remove();
  };
  document.body.appendChild(script);
});
