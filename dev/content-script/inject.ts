/**
 * Scripts that should be injected in the web page
 * Idk the function whether will pollute origin web page
 */

let dom: JQuery<HTMLElement>;

function setDomStyle(): void {
  console.log('showInfo');
}

window.addEventListener(
  'message',
  function (e) {
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
        const dom = getDom(path);
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
