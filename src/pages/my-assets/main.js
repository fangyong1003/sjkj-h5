import Vue from 'vue';
import { checkLogin } from '@/common/helpers';
import App from './App';
import { getAssets } from './api';

if (checkLogin()) {
  /* eslint-disable no-new */
  getAssets().then((data) => {
    new Vue({
      el: '#app',
      render: (h) => h(App, {
        props: {
          diamond: data.enabledCredit,
          jiuzhou: data.enabledProperty,
          remain: data.enabledBalance
        }
      })
    });
  });
}
