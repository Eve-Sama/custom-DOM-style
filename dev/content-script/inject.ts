/**
 * Scripts that should be injected in the web page
 * Idk the function whether will pollute origin web page
 */

let dom: JQuery<HTMLElement>;

function setDomStyle(): void {
  const cssCode = ($('.cds-element #css-code').val() as String)
    .replace(/\ +/g, '')
    .replace(/[\r\n]/g, '');
  const cssArr = cssCode.split(';');
  applyDomSyle(cssArr);
}

function saveDomStyle(
  cssArr: string[],
  path: {
    id: string;
    cls: string;
    index: number;
  }
): void {
  // chrome.storage.sync.set({ cssArr, path });
  window.postMessage(
    { type: 'cds', data: { action: 'hideDomSettingPanel' } },
    '*'
  );
}

function applyDomSyle(cssArr: string[]): void {
  cssArr
    .filter(v => v)
    .forEach(v => {
      const css = v.split(':');
      const cssKey = css[0];
      const cssValue = css[1];
      const style = dom.attr('style') || '';
      dom.attr(
        'style',
        `${style}; \r\n ${cssKey}: ${cssValue} !important \r\n`
      );
    });
}

window.addEventListener(
  'message',
  e => {
    const { type, data } = e.data;
    if (type !== 'cds') {
      return;
    }
    switch (data.action) {
      case 'setDomStyle':
        console.log(data.data, `data.data 原始数据`);
        const path = data.data as {
          id: string;
          cls: string;
          index: number;
        }[];
        dom = getDom(path);
        console.log(dom, `dom`);
        break;
    }
  },
  false
);

function getDom(
  path: {
    id: string;
    cls: string;
    index: number;
  }[]
): JQuery<HTMLElement> {
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
  return dom;
}
