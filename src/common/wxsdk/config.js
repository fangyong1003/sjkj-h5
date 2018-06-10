const global = window._global || { url: {}};

let config = {
  // 请求weixin jsticket的base url
  baseUrl: global.url,
  // 分享数据信息
  shareConfig: global.share || {}
};

export const setConfig = (data) => {
  config = Object.assign(config, data);
};

export const getConfig = () => {
  return config;
};
