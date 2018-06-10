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
// 处理img的url
function getThumb(imgUrl) {
  if (UA.isWeixin()) {
    imgUrl = imgUrl.replace('https://', 'http://');
  }
  return imgUrl;
}

function getCover() {
  // 通过3个途径获取
  // 默认的cover
  const defaultCover = '';
  let nCover = document.getElementById('wxcover');
  let cover = null;
  // 由id指定的封面
  if (nCover) {
    // 1. 通过 data-wxcover 取
    cover = nCover.getAttribute('data-wxcover');
  } else {
    // 2. 取第一个img
    const imgs = document.querySelectorAll('.content img');
    nCover = find(imgs, img => {
      return !hasClass(img, 'js-not-share');
    });

    if (nCover) {
      cover = nCover.getAttribute('data-src') || nCover.getAttribute('src');
    }
  }
  return cover || defaultCover;
};

function getDesc(configDesc, title) {
  const descEl = document.getElementById('wxdesc') || {};
  const desc = configDesc || descEl.value || descEl.textContent || '';

  return desc.replace(/\s+/g, ' ').trim();
};

export const getShareLink = (link) => {
  link = link || document.documentURI;
  link = Args.remove(link, 'redirect_count');
  return link;
};

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
