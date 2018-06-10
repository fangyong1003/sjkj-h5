import Vue from 'vue';
import { Lazyload } from 'vant';
import App from './App';

Vue.use(Lazyload);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
