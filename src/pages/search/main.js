import Vue from 'vue';
import App from './App';
import { getHotSearch } from './api';
import { Lazyload } from 'vant';

Vue.use(Lazyload);

/* eslint-disable no-new */
getHotSearch().then((data) => {
  new Vue({
    el: '#app',
    render: (h) => h(App, {
      props: {
        hotHistory: data.result.data || []
      }
    })
  });
});

