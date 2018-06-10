import Vue from 'vue';
import { Lazyload } from 'vant';
import Args from '@/common/utils/args';
import App from './App';
import { getGoods } from './api';
import { initWXSdk } from '@/common/wxsdk';
import UA from '@/common/utils/ua_browser';

Vue.use(Lazyload);

const goodsId = Args.get('id');
const exhibitionId = Args.get('exhibitionId') || 0;

getGoods(goodsId, exhibitionId).then((data) => {
  console.log(data);
  if (UA.isWeixin) {
    initWXSdk({
      shareConfig: {
        cover: data.result.weixinIconUrl,
        desc: data.result.weixinDesc,
        link: window.location.href,
        title: data.result.weixinTitle
      }
    });
  }
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: (h) => h(App, {
      props: {
        goodsData: data.result
      }
    })
  });
});

