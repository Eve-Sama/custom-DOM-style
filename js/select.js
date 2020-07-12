function selectDOM() {
  $('body').mousemove(event => {
    //   let target = event.target;
    //   while (target.parentNode) {
    //     target = target.parentNode;
    //     console.log(target, `target`);
    //   }
    //   $('body')
    // .children().unbind();
    // Compatible with FireFox(only target) and Chrome(only path)
    const currentElement = $(event.target || event.path[0]);
    deleteSelectArea();
    hightLightArea(currentElement);
    // console.log(currentElement);
  });
}

function cancelSelectDOM() {
  $('body').children().unbind();
  deleteSelectArea();
}

function deleteSelectArea() {
  $('#cds-select-elem').remove();
}

// Get message from popup or background;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { messageType, data } = request;
  switch (messageType) {
    case 'select-DOM':
      const { action } = data;
      if (action === 'open') {
        selectDOM();
      } else if (action === 'close') {
        cancelSelectDOM();
      }
      break;
  }
});
/**
 * Highlight the area of the mouse's hover
 * @param {JQuery<HTMLElement>} dom A instance of DOM
 */
function hightLightArea(dom) {
  // #region Calculate basic attribute
  const top = dom.offset().top;
  const left = dom.offset().left;
  const width = dom.outerWidth(true);
  const height = dom.outerHeight(true);
  // #endregion
  // #region Set attribute for selected dom
  const exist = $('#cds-select-elem').length;
  let selectedElem;
  if (exist) {
    selectedElem = $('#cds-select-elem');
  } else {
    selectedElem = $(
      '<div id="cds-select-elem" style="position: absolute; background: #a0c5e8; opacity: 0.5; z-index: 999;"></div>'
    );
  }
  selectedElem.css({
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`,
    top: `${top}px`
  });
  if (!exist) {
    $('body').append(selectedElem);
  }
  // #endregion
}
