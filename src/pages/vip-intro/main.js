import Vue from 'vue';
import App from './App';
import { getRule } from './api';

/* eslint-disable no-new */
getRule().then((data) => {
  new Vue({
    el: '#app',
    render: (h) => h(App, {
      props: {
        currentLevelInnerCode: data.currentLevelInnerCode,
        levels: data.levels
      }
    })
  });
});
