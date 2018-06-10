const btnTypeList = {
  'WAITING_PAY': ['cancel', 'topay'],
  'WAITING_SHIPPING': ['remind'],
  'WAIT_RECEIVING': ['transport', 'confirm'],
  'ORDER_COMPLETION': ['delete'],
  'ORDER_CANCELED': ['delete'],
  'ORDER_EXPIRED': ['delete']
};

export const ORDER_STATUS_STR = {
  ORDER_CANCELED: '交易关闭',
  WAITING_PAY: '等待付款',
  WAITING_SHIPPING: '等待商家发货',
  WAIT_RECEIVING: '等待确认收货',
  ORDER_COMPLETION: '交易成功',
  ORDER_EXPIRED: '付款超时，订单失效'
};

export {
  btnTypeList as btns
};
