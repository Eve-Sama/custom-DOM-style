/** Actions that should be done in the first of all */

interface StyleStore {
  host: string;
  path: Path[];
  css: CssSetting[];
}

// #region Global variable
let dom: JQuery<HTMLElement>;
let path: Path[];
const host = window.location.host;
// #endregion

let styleStore: StyleStore[];

// Inject script to page
$(document).ready(function () {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = chrome.extension.getURL('dist/content-script/inject.js');
  script.onload = e => $(e.target).remove();
  document.body.appendChild(script);
});

chrome.storage.sync.get('cdsStyleStore', e => {
  setTimeout(() => {
    console.log(e, `e`);
    const styleStore = e.cdsStyleStore as StyleStore[];
    if (styleStore) {
      const domainSetting = styleStore.find(v => v.host === host);
      const { path, css } = domainSetting;
      const dom = getDom(path);
      applyDomSyle(dom, css);
    }
  }, 1000);
});
