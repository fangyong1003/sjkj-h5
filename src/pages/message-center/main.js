import Vue from 'vue';
import { checkLogin } from '@/common/helpers';
import App from './App';
import { getMessage } from './api';
import find from 'lodash/find';


if (checkLogin()) {
  /* eslint-disable no-new */
  getMessage().then((data) => {
    console.log('data', data)
    const system = find(data.result, (item) => {
      return item.noticeType === 'system';
    });
    const activity = find(data.result, (item) => {
      return item.noticeType === 'exhibition';
    });
    const asset = find(data.result, (item) => {
      return item.noticeType === 'asset';
    });
    new Vue({
      el: '#app',
      render: (h) => h(App, {
        props: {
          system: system && system.count || 0,
          activity: activity && activity.count || 0,
          asset: asset && asset.count || 0
        }
      })
    });
  });
}
