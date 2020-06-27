/**
 * FireFox extension config address: about:debugging#/runtime/this-firefox
 * Chrome extension config address: chrome://extensions
 */


/** If enable below code, then the code about DELETE will not work, idk why... */
// // There is a css problem that search button on FireFox, let's fix it
// const btnSearch = document.querySelector('#su');
// btnSearch.style.height = '43.2px';
document.addEventListener('mousemove', (e)=>{
console.log(e, `e`);
})
// var e = event;　
// var x = e.pageX || e.clientX + document.body.scroolLeft;
// var y = e.pageY || e.clientY + document.body.scrollTop;
// var ele = document.elementFromPoint(x,y);
// console.log(e);
// #region delete useless DOM
hideSelectors([
  '#s_top_wrap',
  '#bottom_layer',
  '#lm-new',
  '#s-top-left',
  '#u1',
  '#s-hotsearch-wrapper',
  '.s-p-top',
  '#s_side_wrapper'
]);

function hideSelectors(v) {
  const styleElement = document.createElement('style');
  styleElement.textContent = v.join(',') + '{ visibility: hidden !important }';
  document.documentElement.appendChild(styleElement);
}
// #endregion
