import ajax from '@/common/ajax';

export const getCategory = (data) => {
  const { titlePart, pageNo = 1, pageSize = 10 } = data;
  return ajax.post('/v1/item/page', {
    data: {
      titlePart,
      pageNo,
      pageSize
    }
  }, {
    isJson: true,
    errorMessage: '获取商品搜索失败'
  });
};

export const getHotSearch = () => {
  return ajax.get('/v1/item/keyword', {}, {
    errorMessage: '获取热门搜索数据失败'
  });
};
