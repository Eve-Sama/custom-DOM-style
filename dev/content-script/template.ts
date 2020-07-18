/** The DOM template that will shows in origin web page */

/** Show some tips when user is selecting DOM */
function showSelectTip(): void {
  const template = $(`
    <div class="cds-element" data-from="cds">
      <div id="select-tip-panel" data-from="cds">
        <div class="content-text" data-from="cds">
          点击左键可以选中需要自定义的内容<br/>
          <a href="javascript:showInfo()" data-from="cds-cancel">点击此处取消选择</a>
        </div>
      </div>
    </div>
  `);
  fadeIn(template, 'right');
}

// Show toast message on web page
function toast(info: string, type: 'danger' | 'warning'): void {
  const template = $(`
    <div class="cds-element" data-from="cds">
      <div class="cds-toast cds-toast-${type}">
        ${info}
      </div>
    </div>
  `);
  fadeIn(template, 'left');
  setTimeout(() => fadeOut(template.find('.cds-toast'), 'left'), 2500);
}

function toastImage(): void {
  const image = chrome.extension.getURL('dist/images/1.png');
  const template = $(`
    <div class="cds-element" data-from="cds">
      <div class="cds-toast">
        <img src="${image}">
      </div>
    </div>
  `);
  fadeIn(template, 'left');
  setTimeout(() => fadeOut(template.find('.cds-toast'), 'left'), 2500);
}

function showDomSettingPanel(): void {
  const template = $(`
    <div class="cds-element" data-from="cds">
      <div id="dom-setting-panel" data-from="cds">
        <div class="dom-setting-panel-conent">
          <textarea id="css" cols="30" rows="10"></textarea>
          <div class="btns">
            <button onclick="setDomStyle()" type="button" class="btn btn-primary">预览</button>
            <button type="button" class="btn btn-success">应用</button>
          </div>
        </div>
      </div>
    </div>
  `);
  fadeIn(template, 'right');
}

/**
 * Append dom to body element with animation
 * @param dom DOM
 * @param direction append direction
 */
function fadeIn(dom: JQuery<HTMLElement>, direction: 'left' | 'right'): void {
  dom.children(':first').addClass(`cds-in-${direction}`);
  $('body').append(dom);
}

/**
 * Remove dom with animation after 400ms
 * @param dom DOM
 * @param direction leave direction
 */
function fadeOut(dom: JQuery<HTMLElement>, direction: 'left' | 'right'): void {
  dom.addClass(`cds-out-${direction}`);
  setTimeout(() => dom.remove(), 400);
}
