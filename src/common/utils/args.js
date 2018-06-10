const args = {
  getParameterByName(name, url) {
    name = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
    url = url ? (`?${url.split('#')[0].split('?')[1]}`) : window.location.search;
    const results = RegExp(`[?&]${name}=([^&#]*)`).exec(url);
    return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : '';
  },
  removeParameter(url, parameter) {
    // prefer to use l.search if you have a location/link object
    const urlparts = url.split('?');
    if (urlparts.length >= 2) {
      const prefix = `${encodeURIComponent(parameter)}=`;
      const pars = urlparts[1].split(/[&;]/g);

      // reverse iteration as may be destructive
      for (let i = pars.length; i-- > 0;) {
        // idiom for string.startsWith
        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
          pars.splice(i, 1);
        }
      }

      url = `${urlparts[0]}?${pars.join('&')}`;
      return url;
    }
    return url;
  },
  addParameter: (function () {
    const obj2UrlString = function (obj) {
      let string = '';
      for (const key in obj) {
        if (obj[key] === '') {
          continue;
        }
        string += `${key.trim()}=${obj[key]}&`;
      }
      return string ? (`?${string.slice(0, string.length - 1)}`) : '';
    };

    return function (url, obj) {
      if (!url || url.length === 0 || url.trim().indexOf('javascript') === 0) {
        return '';
      }
      const hashArray = url.split('#');
      const paraArray = hashArray[0].split('?');
      const para = {};
      // 原有参数放入para对象
      if (paraArray[1]) {
        paraArray[1].split('&').forEach((item) => {
          let tempArr;
          tempArr = item.split('=');
          // 参数值中有等号，做处理
          para[tempArr[0]] = tempArr.slice(1).join('=');
        });
      }
      // 将需要添加的参数放入para对象
      Object.keys(obj || {}).forEach((k) => {
        para[k.trim()] = encodeURIComponent(obj[k]);
      });
      // 重组url
      url = paraArray[0] + obj2UrlString(para);

      return hashArray[1] ? (url += `#${hashArray[1]}`) : url;
    };
  }())
};
args.get = args.getParameterByName;
args.remove = args.removeParameter;
args.add = args.addParameter;

export default args;
