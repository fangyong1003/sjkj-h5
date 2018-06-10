import Vue from 'vue';
import App from './App';
import { checkLogin } from '@/common/helpers';

/* eslint-disable no-new */
if (checkLogin()) {
  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
  });
}

