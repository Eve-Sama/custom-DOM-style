function selectMode() {
  $('body')
    .children()
    .mousemove(event => {
      const currentElement = $(event.target);
      hightLightArea(currentElement);
    });

  $(document).click(event => {
    console.log(event);
    // $('#id_').hide();
  });
}

function cancelSelectMode() {
  $('body').children().unbind();
  $('#cds-select-elem').remove();
}

// Send DOM info to background after user select DOM
// chrome.runtime.sendMessage({ data: targetElem.attr('id') }, null);

// Listen message from popup or background;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('select');
  const { messageType, data } = request;
  switch (messageType) {
    case 'select-mode':
      const { action } = data;
      if (action === 'open') {
        selectMode();
      } else if (action === 'close') {
        cancelSelectMode();
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

// get path
// let target = event.target;
// while (target.parentNode) {
//   target = target.parentNode;
//   console.log(target, `target`);
// }
