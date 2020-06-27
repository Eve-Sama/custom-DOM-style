$('body').mousemove(event => {
  // Compatible with FireFox(only target) and Chrome(only path)
  const currentElement = $(event.target || event.path[0]);
  if (!hasCreate) {
    hightLightArea(currentElement);
  }
});
hasCreate = false;

/**
 * Highlight the area of the mouse's hover
 * @param {JQuery<HTMLElement>} dom A instance of DOM
 */
function hightLightArea(dom) {
  hasCreate = true;
  // #region Calculate basic attribute
  const top = dom.offset().top;
  const left = dom.offset().left;
  const width = dom.outerWidth(true);
  const height = dom.outerHeight(true);
  // #endregion
  // #region Set attribute for selected dom
  const selectedElem = $(
    '<div id="cds-select-elem" style="position: absolute; background: #a0c5e8; opacity: 0.5; z-index: 999;"></div>'
  );
  selectedElem.css({
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`,
    top: `${top}px`
  });
  // #endregion
  $('body').append(selectedElem);
}
