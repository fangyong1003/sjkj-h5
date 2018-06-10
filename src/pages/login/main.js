import Vue from 'vue';
import App from './App';
import { Dialog } from 'vant';

Vue.use(Dialog);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
