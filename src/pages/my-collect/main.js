import Vue from 'vue';
import { Lazyload } from 'vant';
import App from './App';
import { checkLogin } from '@/common/helpers';

Vue.use(Lazyload);

/* eslint-disable no-new */
if (checkLogin()) {
  new Vue({
    el: '#app',
    render: (h) => h(App)
  });
}