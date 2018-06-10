import Vue from 'vue';
import App from './App';
import { NavBar } from 'vant';

Vue.use(NavBar);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App)
});
