import Vue from 'vue';
import { Toast } from 'vant';
import Args from '@/common/utils/args';
import App from './App';
import api from './api';

const orderId = Args.get('orderId');
api.fetchOrderDetail(orderId).then((resp) => {
  new Vue({
    el: '#app',
    render: h => h(App, {
      props: {
        order: resp.result
      }
    })
  });
}).catch((err) => {
  window.$loading.finish();
  Toast(err);
});

