import Vue from 'vue';
import cookie from '@/common/utils/cookie';

cookie('token', {
  expires: -1
});

cookie('user', {
  expires: -1
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<div></div>'
});
