import Vue from 'vue';
import App from './App';
import { getBankList } from './api';
import { Dialog } from 'vant';

Vue.use(Dialog);

/* eslint-disable no-new */
getBankList().then((data) => {
  new Vue({
    el: '#app',
    render: (h) => h(App, {
      props: {
        columns: data.banks
      }
    })
  });
});

