import Vue from 'vue';
import { Toast } from 'vant';
import Args from '@/common/utils/args';
import App from './App';
import { fetchTransportDetail } from './api';

const orderId = Args.get('orderId');
fetchTransportDetail(orderId).then((resp) => {
  new Vue({
	  el: '#app',
		render: h => h(App, {
			props: {
				transport: resp
			}
		})
	});
}).catch((err) => {
	window.$loading.finish();
	Toast(err);
});