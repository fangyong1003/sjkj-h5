import Vue from 'vue';
import {
  Lazyload
} from 'vant';
import App from './App';
import api from './api';
import UA from '@/common/utils/ua_browser';
import Args from '@/common/utils/args';
import { initWXSdk } from '@/common/wxsdk';

Vue.use(Lazyload);

function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

const id = Args.get('id');
api.getExhibition(id).then((res) => {
  const { weixinDesc, weixinIconUrl, weixinLinkerUrl, weixinTitle, onlyCreditFlag } = res.result;

  setupWebViewJavascriptBridge(function(bridge) {
    bridge.registerHandler('appShare', function(data, responseCallback) {
      /** @preserve Foo Bar */
      const responseData = {
        'weixinDesc': weixinDesc,
        'weixinIconUrl': weixinIconUrl,
        'weixinLinkerUrl': weixinLinkerUrl,
        'weixinTitle': weixinTitle
      };
      responseCallback(responseData);
    });
  });

  if (UA.isWeixin) {
    initWXSdk({
      shareConfig: {
        cover: weixinIconUrl,
        desc: weixinDesc,
        link: weixinLinkerUrl,
        title: weixinTitle
      }
    });
  }

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: h => h(App, {
      props: {
        onlyCredit: +onlyCreditFlag === 1
      }
    })
  });
});

