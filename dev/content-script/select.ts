/** Select DOM logic */

let onSelect = false;
function openSelectMode(): void {
  if (onSelect) {
    return;
  }
  onSelect = true;

  $('body')
    .children()
    .mousemove(event => hightLightArea($(event.target)));

  showSelectTip();

  $(document).click(event => clickDom($(event.target)));
}

function clickDom(dom: JQuery<Document>): void {
  const from = dom.attr('data-from');
  switch (from) {
    case 'cds-cancel':
      closeSelectMode();
      hideSelectTip();
      break;
    case 'cds':
      toast('想造反啊?!!!', 'warning');
      break;
    default:
      settingDomStyle(dom);
      break;
  }
}

function settingDomStyle(dom: JQuery<Document>): void {
  closeSelectMode();
  hideSelectTip();
  const id = dom.attr('id');
  const cls = dom.attr('class');
}

function closeSelectMode(): void {
  $('body').children().unbind('mousemove');
  $('#cds-select-elem').remove();
  $(document).unbind('click');
  onSelect = false;
}

function hideSelectTip(): void {
  const template = $('.cds-element #cds-dom-setting-panel');
  // settingPanel.remove();
  template.addClass('cds-out-right');
  setTimeout(() => {
    template.remove();
  }, 400);
}

// Send DOM info to background after user select DOM
// chrome.runtime.sendMessage({ data: targetElem.attr('id') }, null);

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
