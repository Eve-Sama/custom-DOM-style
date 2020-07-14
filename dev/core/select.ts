// Inject script to page
$(document).ready(function(){
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = chrome.extension.getURL('dist/core/dom-setting-panel.js');
  script.onload = function (event) {
    $(event.target).remove();
  };
  document.body.appendChild(script);
});


let onSelect = false;
function selectMode(): void {
  if (onSelect) {
    return;
  }
  onSelect = true;
  $('body')
    .children()
    .mousemove(event => {
      const currentElement = $(event.target);
      hightLightArea(currentElement);
    });

  showSelectTip();

  $(document).click(event => {
    console.log(event.target);
    this.closeSelectMode();
    // $('#id_').hide();
  });
}

function closeSelectMode(): void {
  $('body').children().unbind('mousemove');
  $('#cds-select-elem').remove();
  $(document).unbind('click');
  onSelect = false;
}

/** Show some tips when user is selecting DOM */
function showSelectTip(): void {
  const settingPanel = $(`
  <div id="cds-dom-setting-panel">
    <div class="content-text">
      点击左键可以选中需要自定义的内容<br/>
      <a href="javascript:showInfo()">点击此处取消选择</a>
    </div>
  </div>
  `);
  $('body').append(settingPanel);
}

// Send DOM info to background after user select DOM
// chrome.runtime.sendMessage({ data: targetElem.attr('id') }, null);

// Listen message from popup or background;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { messageType, data } = request;
  switch (messageType) {
    case 'select-mode':
      const { action } = data;
      if (action === 'open') {
        selectMode();
      } else if (action === 'close') {
        closeSelectMode();
      }
      break;
  }
});

/**
 * Highlight the area of the mouse's hover
 * @param dom A instance of DOM
 */
function hightLightArea(dom: JQuery<HTMLElement>) {
  // #region Calculate basic attribute
  const top = dom.offset().top;
  const left = dom.offset().left;
  const width = dom.outerWidth(true);
  const height = dom.outerHeight(true);
  // #endregion
  // #region Set attribute for selected dom
  const exist = $('#cds-select-elem').length;
  let selectedElem: JQuery<HTMLElement>;
  if (exist) {
    selectedElem = $('#cds-select-elem');
  } else {
    selectedElem = $(
      '<div id="cds-select-elem" style="position: absolute; background: #a0c5e8; opacity: 0.5; z-index: 999; pointer-events: none;"></div>'
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

// #region Try to set 4 walls
// const exist = $('#cds-select-elem-top').length;
// let selectedElemTop: JQuery<HTMLElement>;
// let selectedElemRight: JQuery<HTMLElement>;
// let selectedElemBottom: JQuery<HTMLElement>;
// let selectedElemLeft: JQuery<HTMLElement>;
// if (exist) {
//   selectedElemTop = $('#cds-select-elem-top');
//   selectedElemRight = $('#cds-select-elem-right');
//   selectedElemBottom = $('#cds-select-elem-bottom');
//   selectedElemLeft = $('#cds-select-elem-left');
// } else {
//   selectedElemTop = $(
//     '<div id="cds-select-elem-top" style="position: absolute; background: #a0c5e8; opacity: 0.5; z-index: 999;"></div>'
//   );
//   selectedElemRight = $(
//     '<div id="cds-select-elem-right" style="position: absolute; background: #a0c5e8; opacity: 0.5; z-index: 999;"></div>'
//   );
//   selectedElemBottom = $(
//     '<div id="cds-select-elem-bottom" style="position: absolute; background: #a0c5e8; opacity: 0.5; z-index: 999;"></div>'
//   );
//   selectedElemLeft = $(
//     '<div id="cds-select-elem-left" style="position: absolute; background: #a0c5e8; opacity: 0.5; z-index: 999;"></div>'
//   );
// }
// const thickness = 5;
// selectedElemTop.css({
//   width: `${width}px`,
//   height: `${thickness}px`,
//   left: `${left}px`,
//   top: `${top}px`
// });
// selectedElemRight.css({
//   width: `5px`,
//   height: `${height}px`,
//   left: `${left + width}px`,
//   top: `${top}px`
// });
// selectedElemBottom.css({
//   width: `${width}px`,
//   height: `5px`,
//   left: `${left + 10}px`,
//   top: `${top + height}px`
// });
// selectedElemLeft.css({
//   width: `5px`,
//   height: `${height + 5}px`,
//   left: `${left}px`,
//   top: `${top}px`
// });
// if (!exist) {
//   $('body').append(
//     selectedElemTop,
//     selectedElemRight,
//     selectedElemBottom,
//     selectedElemLeft
//   );
// }
// #endregion
