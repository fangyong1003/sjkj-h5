import Vue from 'vue';
import App from './App';
import { getVipInfo } from './api';

/* eslint-disable no-new */
getVipInfo().then((data) => {
  new Vue({
    el: '#app',
    render: (h) => h(App, {
      props: {
        currentLevelInnerCode: data.currentLevelInnerCode
      }
    })
  });
});
