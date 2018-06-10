import Vue from 'vue';
import App from './App';
import { getRightsInfo } from './api';
import { NavBar } from 'vant';

Vue.use(NavBar);

/* eslint-disable no-new */
getRightsInfo().then((data) => {
  const empty = {
    type: '',
    name: '',
    text: ''
  };
  const levels = data.levels.map(item => {
    if (item.rights.length === 1) {
      item.rights = item.rights.concat([empty], [empty]);
    } else if (item.rights.length === 2) {
      item.rights = item.rights.concat([empty]);
    }
    return item;
  });
  new Vue({
    el: '#app',
    render: (h) => h(App, {
      props: {
        currentLevelInnerCode: data.currentLevelInnerCode,
        levels
      }
    })
  });
});