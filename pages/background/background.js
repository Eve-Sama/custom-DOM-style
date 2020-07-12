data = 1;

console.log('background.js');
function showData() {
  const selectedElem = $(
    `<div>${data}</div>`
  );
  $('body').append(selectedElem);
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log(req);
  showData()
});
