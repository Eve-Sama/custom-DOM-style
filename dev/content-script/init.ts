/** Actions that should be done in the first of all */

interface StyleStore {
  host: string;
  path: Path[];
  css: CssSetting[];
}

// #region Global variable
let dom: JQuery<HTMLElement>;
const host = window.location.host;
// #endregion

let styleStore: StyleStore[];

// Inject script to page
window.onload = function () {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = chrome.extension.getURL('dist/content-script/inject.js');
  script.onload = e => $(e.target).remove();
  document.body.appendChild(script);
};

chrome.storage.sync.get('cdsStyleStore', e => {
  // console.log(e, `e`);
  const styleStore = e.cdsStyleStore as StyleStore[];
  if (styleStore) {
    const domainSetting = styleStore.find(v => v.host === host);
    if (domainSetting) {
      const { path, css } = domainSetting;
      console.log(path, `path`);
      console.log(css, `css`);
      // const dom = getDom(path);
      // applyDomSyle(dom, css);
      let query = '';
      path.forEach(v => {
        if (v.id) {
          query += `#${v.id}`;
        }
        if (v.cls) {
          const classes = v.cls.split(' ');
          let clsSelector = '';
          classes.forEach(_cls => (clsSelector += `.${_cls}`));
          query += clsSelector;
        }
        query += `:nth-child(${v.index}) `;
      });
      let cssText = '';
      css.forEach(v => (cssText += `${v.key}:${v.value} !important;`));
      console.log(query, `query`);
      const el = document.createElement('style');
      el.textContent = `${query}{ ${cssText} }`;
      document.documentElement.appendChild(el);
    }
  }
});
