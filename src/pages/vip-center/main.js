import Vue from 'vue';
import App from './App';
import { getVipInfo } from './api';
import { checkLogin } from '@/common/helpers';

/* eslint-disable no-new */
if (checkLogin()) {
  getVipInfo().then((data) => {
    new Vue({
      el: '#app',
      render: (h) => h(App, {
        props: {
          canUpgrade: data.canUpgrade,
          currentLevelInnerCode: data.currentLevelInnerCode,
          levels: data.levels,
          rights: data.rights
        }
      })
    });
  });
}