import Args from '@/common/utils/args';
import { getShareData } from './share';
import ajax from '@/common/ajax';
import wxActions from './wx';
import assign from 'lodash/assign';

const { setWxConfig, wxReady: wxApiReady, setWxShare, wx } = wxActions;

let isWxRequestFailed = false;

// 不存在跨域
function getWeixinTicketAndSetConfig(config, options = {}, count = 0) {
  ajax.get('/api/weixin/ticket', {
    'url': window.location.href
  }, {
    errorMessage: '获取签名失败'
  }).then((resp) => {
    console.log(resp)
    const { success, appId, timestamp, nonceStr, signature } = resp;
    if (success) {
      setWxConfig(assign(config, {
        appId,
        timestamp,
        nonceStr,
        signature
      }));
      return;
    }
    count++;
    if (count < 2) {
      setTimeout(() => getWeixinTicketAndSetConfig(config, options, count), 1000);
    } else {
      isWxRequestFailed = true;
    }
  }).catch((err) => {
    isWxRequestFailed = true;
    throw err;
  });
};

function getSfUrl(url, sf) {
  return Args.add(url, {
    sf: sf
  });
};

function formatTimeLineShareData(shareData) {
  const sf = 'wx_tl';
  const link = getSfUrl(shareData.link, sf);

  shareData.timeline = {
    link,
    success: function(res) {
      window.__onShareTimeline && window.__onShareTimeline(res);
    },
    trigger: function() {
      window.doWhileShare && window.doWhileShare();
      // log({ link, title: shareData.title || shareData.timeLineTitle }, 'timeline');
    }
  };

  return shareData;
};

function formatAppMessageShareData(shareData) {
  const sf = 'wx_sm';
  const link = getSfUrl(shareData.link, sf);

  shareData.appMessage = {
    link,
    success(res) {
      window.__onShareAppMessage && window.__onShareAppMessage(res);
    },
    trigger() {
      window.doWhileShare && window.doWhileShare();
      // log({ link, title: shareData.title }, 'appmessage');
    }
  };

  return shareData;
};

function formatQQShareData(shareData) {
  const sf = 'qq_sm';
  const link = getSfUrl(shareData.link, sf);

  shareData.qq = {
    link,
    success: function(res) {
      window.__onShareQQ && window.__onShareQQ(res);
    },
    trigger: function() {
      window.doWhileShare && window.doWhileShare();
      // log({ link, title: shareData.title }, 'qq');
    }
  };

  return shareData;
};

function formatQZoneShareData(shareData) {
  const sf = 'qq_zone';
  const link = getSfUrl(shareData.link, sf);

  shareData.qzone = {
    link,
    success: function(res) {
      window.__onShareQZone && window.__onShareQZone(res);
    },
    trigger: function() {
      window.doWhileShare && window.doWhileShare();
    }
  };

  return shareData;
};

function getWxShareData() {
  let shareData = getShareData();

  shareData = formatTimeLineShareData(shareData);
  shareData = formatAppMessageShareData(shareData);
  shareData = formatQQShareData(shareData);
  shareData = formatQZoneShareData(shareData);

  return shareData;
}

export function updateShareData() {
  const shareData = getWxShareData();
  setWxShare(shareData);
};

export function putConfigToWX({ baseUrl, debug = false, jsApiList = [] }) {
  const configDefault = {
    debug,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'hideOptionMenu',
      'showOptionMenu',
      'addCard',
      'scanQRCode',
      'chooseWXPay',
      ...jsApiList
    ]
  };

  getWeixinTicketAndSetConfig(configDefault, { baseUrl });
};

export function wxReady(callback) {
  if (isWxRequestFailed) {
    return;
  }

  wxApiReady(callback);
};

export function initShareConfig(shareConfig) {
  wxReady(function() {
    // 测试
    // shareConfig.notShare = true;

    // 隐藏or显示右上角点点点按钮
    const action = shareConfig.notShare ? 'hideOptionMenu' : 'showOptionMenu';
    wx[action] && (wx[action])();

    updateShareData();
  });
};

export const wxBridge = {
  openAddress(success, fail) {
    wx.openAddress({
      success: function(res) {
        success(res);
      },
      fail: function(res) {
        fail(res);
      }
    });
  },
  hideMenuItems(menus) {
    wx.hideMenuItems({
      memuList: menus
    });
  },
  showMenuItems(menus) {
    wx.showMenuItems({
      memuList: menus
    });
  }
};

window.wx = wx;
window.wxReady = wxReady;
window.wxBridge = wxBridge;
