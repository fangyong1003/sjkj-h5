export default {
  goods_list: [{
    pay_price: 2980,
    img_url: 'https://img.yzcdn.cn/upload_files/2017/09/11/FhaiswkPLCpVqQQ8MPLo8-hOEB_i.jpg?imageView2/2/w/980/h/980/q/75/format/jpg',
    title: '测试商品: 小黄人月饼',
    sku: [{ v: '大盒' }, { v: '铁盒' }],
    num: '1',
    message: {
      发货日期: '2017-10-02',
      祝福语: ''
    }
  }],
  invalidGoodsList: [{
    sku: [{ v: '商品SKU1' }, { v: '商品SKU2' }],
    num: 2,
    sku_id: 123,
    title: '商品 A',
    price: 12200,
    unavailable_desc: '超出配送区域',
    img_url: 'https://img.yzcdn.cn/upload_files/2017/06/29/FnPSAKkEeh4FnDA09oIbmnlzWQrw.png',
  }],
  coupons: [{
    available: 1,
    discount: 0,
    denominations: 150,
    origin_condition: 0,
    reason: '',
    value: 150,
    condition: '下单立减 1.50 元',
    name: '新手专用优惠券',
    start_at: 1489104000,
    end_at: 1514592000
  }],
  express_fee: 0,
  goods_total_price: 2980
};
