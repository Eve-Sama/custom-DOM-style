/** select DOM logic */

let onSelect = false;
function openSelectMode(): void {
  if (onSelect) {
    return;
  }
  onSelect = true;

  $('body')
    .children()
    .mousemove(e => hightLightArea($(e.target)));

  showSelectTip();

  $(document).click(e => clickDom($(e.target)));
}

function clickDom(dom: JQuery<Document>): void {
  const from = dom.attr('data-from');
  switch (from) {
    case 'cds-cancel':
      closeSelectMode();
      hideSelectTip();
      break;
    case 'cds':
      toastImage();
      break;
    default:
      closeSelectMode();
      hideSelectTip();
      showDomSettingPanel();
      this.dom = dom;
      break;
  }
}

function closeSelectMode(): void {
  $('body').children().unbind('mousemove');
  $('#cds-select-elem').remove();
  $(document).unbind('click');
  onSelect = false;
}

function hideSelectTip(): void {
  fadeOut($('.cds-element #select-tip-panel'), 'right');
}

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
    selectedElem = $(`
      <div
        id="cds-select-elem"
        style="position: absolute; background: #a0c5e8; opacity: 0.5; z-index: 999; pointer-events: none;"></div>
    `);
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
