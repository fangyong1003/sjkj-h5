import Vue from 'vue';
import App from './App';
import { checkLogin } from '@/common/helpers';
import { initWXSdk } from '@/common/wxsdk';
import { getInvite } from './api';
import UA from '@/common/utils/ua_browser';

/* eslint-disable no-new */
if (checkLogin()) {
  /* eslint-disable no-new */
  getInvite().then((data) => {
    if (UA.isWeixin) {
      initWXSdk({
        shareConfig: {
          cover: data.weixinIconUrl,
          desc: data.weixinDesc,
          link: data.weixinLinkerUrl,
          title: data.weixinTitle
        }
      });
    }
    new Vue({
      el: '#app',
      render: (h) => h(App, {
        props: {
          bannerUrl: data.bannerUrl
        }
      })
    });
  });
}
