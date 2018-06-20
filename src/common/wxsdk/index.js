import { wxReady, wxBridge, putConfigToWX, initShareConfig } from './wxsdk';
import { getShareData, setShareData, getShareLink } from './share';
import { getConfig, setConfig } from './config';
import wxActions from './wx';

const { wx } = wxActions;

const initWXSdk = (config = {}) => {
  setConfig(config);

  const { debug = false, jsApiList = [] } = config;
  const { shareConfig, baseUrl } = getConfig();

  putConfigToWX({ baseUrl, debug, jsApiList });
  initShareConfig(shareConfig);
};

export {
  initWXSdk,
  wx,
  wxReady,
  wxBridge,
  setShareData,
  getShareData,
  getShareLink
};
