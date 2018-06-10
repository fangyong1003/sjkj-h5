const buyData = {
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


export default Object.assign({}, buyData, {
  order_no: 'E20170901102956098800001999',
  address: {
    address_detail: '文三路与工专路交口西南角 黄龙万科中心G座17楼',
    area_code: '330106',
    city: '杭州市',
    community: '',
    country: '中国',
    county: '西湖区',
    id: '52306461',
    is_default: 0,
    lat: '30.2818221386399',
    lon: '120.13264698640018',
    postal_code: '',
    province: '浙江省',
    tel: '18768188888',
    type: 1,
    user_name: '张敏'
  },
  message: '无',
  express_fee: 100,
  selected_coupon: {
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
  },
  real_pay: 2930
});
