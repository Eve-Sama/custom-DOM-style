/**
 * FireFox extension config address: about:debugging#/runtime/this-firefox
 * Chrome extension config address: chrome://extensions/
 */

// #region delete useless DOM
const deleteIdList = ['#s_top_wrap', '#bottom_layer', '#lm-new', '#s-top-left', '#u1', '#s-hotsearch-wrapper', '#s_side_wrapper'];
deleteIdList.forEach((v) => {
  const element = document.querySelector(v) as HTMLElement;
  element.parentNode.removeChild(element);
});
// #endregion

// There is a css problem that search button on FireFox, let's fix it
const btnSearch = document.querySelector('#su') as HTMLElement;
btnSearch.style.height = '43.2px';
