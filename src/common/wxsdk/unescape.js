/**
 * 字符串的反转义,将`&amp;`, `&lt;`,  `&gt;`, `&quot;`, `&#x27;`替换为转义前的符号
 * @memberof module:string
 * @param {string} text 处理前字符串
 * @return {string} 处理后的字符串
 * @runkit true
 * @example
 * const unescape = require('zan-utils/string/unescape');
 * unescape('&lt;hello&gt;')
 * // '<hello>'
 */

function unescape(text) {
  const _unescape = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'"
  };

  const unescapeExpr = /(&amp;|&lt;|&gt;|&quot;|&#x27;)/g;
  return (`${text}`).replace(unescapeExpr, match => _unescape[match]);
}

export default unescape;
