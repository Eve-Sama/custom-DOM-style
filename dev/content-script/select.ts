/** Select DOM logic */

interface CssSetting {
  key: string;
  value: string;
}

interface Path {
  id: string;
  cls: string;
  index: number;
}

interface StyleStore {
  host: string;
  path: Path[];
  css: CssSetting[];
}

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

function getCssSetting(): CssSetting[] {
  const cssCode = ($('.cds-element #css-code').val() as String).replace(/\ +/g, '').replace(/[\r\n]/g, '');
  const cssArr = cssCode.split(';');
  const result: CssSetting[] = [];
  cssArr
    .filter(v => v)
    .forEach(v => {
      const css = v.split(':');
      const key = css[0];
      const value = css[1];
      result.push({ key, value });
    });

  return result;
}

function applyDomSyle(dom: JQuery<HTMLElement>, css: CssSetting[]): void {
  css.forEach(v => {
    {
      const { key, value } = v;
      const style = dom.attr('style') || '';
      dom.attr('style', `${style}; \r\n ${key}: ${value} !important \r\n`);
    }
  });
}

function getDom(path: Path[]): JQuery<HTMLElement> {
  let dom = $('body');
  path.forEach(v => {
    let query = '';
    if (v.id) {
      query = `#${v.id}`;
    }
    if (v.cls) {
      const classes = v.cls.split(' ');
      let clsSelector = '';
      classes.forEach(_cls => (clsSelector += `.${_cls}`));
      query += clsSelector;
    }
    query = `${query}:nth-child(${v.index})`;
    dom = dom.find(`${query}`);
  });
  console.log(dom, `target`);
  return dom;
}

function getPath(dom: JQuery<HTMLElement>): Path[] {
  const nodes = dom.toArray().concat(dom.parents().toArray());
  const path: {
    id: string;
    cls: string;
    index: number;
  }[] = [];
  nodes.forEach(v => {
    const elem = $(v);
    if (['BODY', 'HTML'].includes(elem.prop('tagName'))) {
      return;
    }
    const id = (elem.attr('id') || '').trim();
    const cls = (elem.attr('class') || '').trim();
    const index = elem.index() + 1;
    path.push({ id, cls, index });
  });
  path.reverse();
  return path;
}

function saveDomStyle(styleStore: StyleStore): void {
  chrome.storage.sync.set({ cdsStyleStore: [styleStore] });
}
