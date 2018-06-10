import uniq from 'lodash/uniq';
import assign from 'lodash/assign';
import Event from './event';
import wx from 'weixin-js-sdk';

const defaultJsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideOptionMenu', 'showOptionMenu'];

let isWxApiReady = false;
let isWxApiFailed = false;

/*
 * 暴露原生微信对象
 */
export { wx };

/*
 * 微信设置中所有的回调由事件触发
 */
export const event = new Event();

/*
 * 在微信中注入初始配置
 */
export function setWxConfig(config) {
  // 默认授权的项目
  const wxConfigs = assign({
    debug: false
  }, config);
  // jsApiList 做特殊合并
  wxConfigs.jsApiList = uniq(defaultJsApiList.concat(config.jsApiList));
  wx.config(wxConfigs);

  wx.ready(function() {
    isWxApiReady = true;
    event.trigger('init:success');
  });

  wx.error(function() {
    isWxApiFailed = true;
    event.trigger('init:fail');
  });
}

/*
 * 保证callback 在微信sdk初始化完成后调用
 */
export function wxReady(callback) {
  if (isWxApiFailed) {
    return;
  }

  if (isWxApiReady) {
    callback && callback();
  } else {
    setTimeout(function() {
      wxReady(callback);
    }, 1000);
  }
}

/*
 * 在微信中注入分享配置
 */
export function setWxShare(shareConfig) {
  wxReady(() => {
    changeShareTimeLineData(shareConfig);
    changeMenuShareAppMessageData(shareConfig);
    changeMenuShareQQData(shareConfig);
    changeMenuShareQZoneData(shareConfig);
  });
}

// 修改 朋友圈分享 设置，以 shareConfig.timeline shareConfig 顺序覆盖
function changeShareTimeLineData(shareConfig) {
  const timelineShareConfig = assign({}, shareConfig, shareConfig.timeline);
  // 动态的title，根据页面变动的内容而变
  if (timelineShareConfig.timeLineTitle) timelineShareConfig.title = timelineShareConfig.timeLineTitle;

  wx.onMenuShareTimeline(assign({}, timelineShareConfig, {
    success: function(res) {
      event.trigger('share:timeline:success', res);
      timelineShareConfig.success && timelineShareConfig.success(res);
    },
    trigger: function() {
      event.trigger('share:timeline:trigger');
      timelineShareConfig.trigger && timelineShareConfig.trigger();
    }
  }));
}

// 修改 微信好友分享 设置
function changeMenuShareAppMessageData(shareConfig) {
  const appMessageShareConfig = assign({}, shareConfig, shareConfig.appMessage);

  wx.onMenuShareAppMessage(assign({}, appMessageShareConfig, {
    success: function(res) {
      event.trigger('share:appMessage:success', res);
      appMessageShareConfig.success && appMessageShareConfig.success(res);
    },
    trigger: function() {
      event.trigger('share:appMessage:trigger');
      appMessageShareConfig.trigger && appMessageShareConfig.trigger();
    }
  }));
}

// 修改 qq好友分享 设置
function changeMenuShareQQData(shareConfig) {
  const qqShareConfig = assign({}, shareConfig, shareConfig.qq);

  wx.onMenuShareQQ(assign({}, qqShareConfig, {
    success: function(res) {
      event.trigger('share:qq:success', res);
      qqShareConfig.success && qqShareConfig.success(res);
    },
    trigger: function() {
      event.trigger('share:qq:trigger');
      qqShareConfig.trigger && qqShareConfig.trigger();
    }
  }));
}

// 修改 qq空间分享 设置
function changeMenuShareQZoneData(shareConfig) {
  const qzoneShareConfig = assign({}, shareConfig, shareConfig.qzone);

  wx.onMenuShareQZone(assign({}, qzoneShareConfig, {
    success: function(res) {
      event.trigger('share:qzone:success', res);
      qzoneShareConfig.success && qzoneShareConfig.success(res);
    },
    trigger: function() {
      event.trigger('share:qzone:trigger');
      qzoneShareConfig.trigger && qzoneShareConfig.trigger();
    }
  }));
}
