import assign from 'lodash/assign';
import UA from '@/common/utils/ua_browser';
import Args from '@/common/utils/args';
import decodeHTMLEntities from './decodeHTMLEntities';
import unescape from './unescape';
import find from 'lodash/find';
import ajax from '@/common/ajax';
import { getConfig, setConfig } from './config';
import wxActions from './wx';
import wxReady from './wxsdk';
import { goToPage } from '@/common/helpers';
import YZLocalStorage from '@/common/utils/local_storage';

const { wx } = wxActions;
function onBridgeReady(obj,orderIds,needBalanceString){
     WeixinJSBridge.invoke(
         'getBrandWCPayRequest',obj,
         function(res){
             if(res.err_msg == "get_brand_wcpay_request:ok" ) {
               goToPage('paid', {
                 orderIds: orderIds,
                 payCredits:needBalanceString,
                 status:1
               });
             }
         }
     );
    }
export const initPayConfig = (orderIds,needBalanceString) =>{
    const idArr = JSON.stringify(orderIds.split(','));
    ajax.post('/api/payment/apply/h5', {
      data: idArr
    },{
      isJson: true,
      errorMessage: '获取支付参数失败'
    }).then((resp) => {
        let configs = {
          appId:resp.appId,
          package:resp.packageExt, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType:resp.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: resp.paySign, // 支付签名
          timeStamp: resp.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: resp.nonceStr, // 支付签名随机串，不长于 32 位
        };
        if (typeof WeixinJSBridge == "undefined"){
           if( document.addEventListener ){
               document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
           }else if (document.attachEvent){
               document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
               document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
           }
        }else{
            onBridgeReady(configs,orderIds,needBalanceString);
        }
      }).catch((err) => {
        throw err;
      });
};


// wx.chooseWXPay({
// timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
// nonceStr: '', // 支付签名随机串，不长于 32 位
// package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
// signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
// paySign: '', // 支付签名
// success: function (res) {
// // 支付成功后的回调函数
// }
// });
