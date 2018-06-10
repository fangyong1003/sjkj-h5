import ajax, { addMiddlewares } from './axios';

addMiddlewares((url) => {
  let prefix = '/yzjz-web';

  if (process.env.NODE_ENV === 'development') {
    // if (/v1/.test(url)) prefix = '/yzjz-console-server';
  }

  return {
    url: `${prefix}${url}`
  };
});

// 初始化微信jssdk
// import { initWXSdk } from './wxsdk';

// if ((/micromessenger/gi).test(navigator.userAgent.toLowerCase())) {
//   initWXSdk();
// }

export default ajax;
