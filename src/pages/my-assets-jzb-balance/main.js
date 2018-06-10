import Vue from 'vue';
import App from './App';
import { getAssets } from './api';

/* eslint-disable no-new */
getAssets().then((data) => {
  new Vue({
    el: '#app',
    render: (h) => h(App, {
      props: {
        enabledProperty: data.enabledBalance
      }
    })
  });
});
