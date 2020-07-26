/** Actions that should be done in the first of all */

// #region Global variable
let dom: JQuery<HTMLElement>;
const host = window.location.host;
// #endregion

// Inject script to page
window.onload = function () {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = chrome.extension.getURL('dist/content-script/inject.js');
  script.onload = e => $(e.target).remove();
  document.body.appendChild(script);
};

let styleStore: StyleStore[];
chrome.storage.sync.get('cdsStyleStore', e => {
  // console.log(e, `e`);
  styleStore = e.cdsStyleStore as StyleStore[];
  console.log(styleStore, `styleStore`);
  if (styleStore) {
    const domainSetting = styleStore.filter(v => v.host === host) || [];
    let html = '';
    domainSetting.forEach(v => {
      const { path, css } = v;
      console.log(path, `path`);
      console.log(css, `css`);
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
        query += `:nth-child(${v.index}) > `;
      });
      query = query.substring(0,query.length - 3);
      let cssText = '';
      css.forEach(v => (cssText += `${v.key}:${v.value} !important;`));
      console.log(query, `query`);
      html += `${query}{ ${cssText} }`;
    });
    const el = document.createElement('style');
    el.setAttribute('data-from', 'cds-style');
    el.textContent = html;
    document.documentElement.appendChild(el);
  }
});
