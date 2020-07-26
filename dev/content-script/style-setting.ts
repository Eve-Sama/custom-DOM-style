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

function removeStyle(): void {
  $('html > style[data-from="cds-style"]').remove();
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

function saveDomStyle(value: StyleStore): void {
  if (styleStore) {
    styleStore.push(value);
  } else {
    styleStore = [value];
  }
  chrome.storage.sync.set({ cdsStyleStore: styleStore });
}
