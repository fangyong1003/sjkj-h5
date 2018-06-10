import Vue from 'vue';
import App from './App';
import { checkLogin } from '@/common/helpers';

if (checkLogin()) {
  new Vue({
    el: '#app',
    render: h => h(App)
  });
}

