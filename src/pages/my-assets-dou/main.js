import Vue from 'vue';
import App from './App';
import { checkLogin } from '@/common/helpers';
import { getAssets } from './api';

/* eslint-disable no-new */
if (checkLogin()) {
  /* eslint-disable no-new */
  getAssets().then((data) => {
    new Vue({
      el: '#app',
      render: (h) => h(App, {
        props: {
          amount: data.enabledCredit,
        }
      })
    });
  });
}
