import assign from 'lodash/assign';
import UA from '@/common/utils/ua_browser';
import Args from '@/common/utils/args';
import decodeHTMLEntities from './decodeHTMLEntities';
import unescape from './unescape';
import find from 'lodash/find';
import { getConfig, setConfig } from './config';
import { updateShareData } from './wxsdk';
import wxActions from './wx';

const { wx } = wxActions;

function hasClass(el, name) {
  if (!name) return false;

  return new RegExp('(^|\\s)' + name + '(\\s|$)').test(el.className);
}





export const getShareData = () => {
  // 针对朋友圈专门指定标题
  const { shareConfig } = getConfig();
  const timeLineTitleEl = document.getElementById('time-line-title');
  const titleEl = document.getElementById('wxtitle') || {};
  const otherShareData = shareConfig.otherShareData || {};
  const title = shareConfig.title || titleEl.textContent || document.title;
  const link = getThumb(shareConfig.link || getShareLink());
  const cover = getThumb(shareConfig.cover || getCover());
  const desc = getDesc(shareConfig.desc, title);
  let timeLineTitle;

  // 优先拿写在页面中的timeline_title
  if (timeLineTitleEl) {
    timeLineTitle = timeLineTitleEl.textContent;
  } else {
    timeLineTitle = shareConfig.timeline_title;
  }

  return assign({
    title: decodeHTMLEntities(unescape(title)),
    link: link,
    imgUrl: cover,
    desc: decodeHTMLEntities(unescape(desc)).substring(0, 80),
    timeLineTitle: decodeHTMLEntities(unescape((timeLineTitle || '').trim()))
  }, otherShareData);
};

export const setShareData = (shareConfig) => {
  setConfig({
    shareConfig: assign(getConfig().shareConfig, shareConfig)
  });

  if (shareConfig.notShare === true) {
    wx.hideOptionMenu && wx.hideOptionMenu();
  } else {
    wx.showOptionMenu && wx.showOptionMenu();
  }

  updateShareData();
};

// for debug
window.getShareData = getShareData;
