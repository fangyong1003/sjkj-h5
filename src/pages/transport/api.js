import ajax from '@/common/ajax';
import { Toast } from 'vant';
import mock from './mock';

export const fetchTransportDetail = (orderId) => {
    // return new Promise((res) => res(mock));
    return ajax.get('/api/express/trace', {
        orderId
    }, {
            errorMessage: '查看物流数据失败'
        }).catch((err) => {
            Toast(err);
            throw err;
        });
};
