const btnTypeList = {
  'WAITING_PAY': ['cancel', 'topay'],
  'WAITING_SHIPPING': ['remind'],
  'WAIT_RECEIVING': ['transport', 'confirm'],
  'ORDER_COMPLETION': ['delete'],
  'CANCEL_ORDER': ['delete'],
  'ORDER_EXPIRED': ['delete']
};

export default btnTypeList;
