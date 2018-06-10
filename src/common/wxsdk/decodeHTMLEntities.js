/**
 * 返回HTML里的文字内容
 * @memberof module:string
 * @param {string} str html字符串
 * @return {string} 处理后的文字
 * @example
 * const decodeHTMLEntities = require('zan-utils/string/decodeHTMLEntities');
 * decodeHTMLEntities('<li>111<span>222</span></li>')
 * // '111222'
 */
function decodeHTMLEntities(str) {
  const element = document.createElement('div');
  if (str && typeof str === 'string') {
    // strip script/html tags
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
    element.innerHTML = str;
    str = element.textContent;
    element.textContent = '';
  }
  return str;
}
export default decodeHTMLEntities;
