import Vue from 'vue';
import App from './App';
import store from './store';
import { Lazyload } from 'vant';
import { checkLogin } from '@/common/helpers';

Vue.use(Lazyload);

if (checkLogin()) {
  new Vue({
    el: '#app',
    store,
    render: h => h(App)
  });
}

