import { Toast } from 'vant';
import ajax from '@/common/ajax';

export const getExhibition = ({ type }) => {
  return ajax.post(`/v1/exhibition/list`, {
    data: {}
  }, {
    isJson: true,
    errorMessage: '获取首页数据失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};

export const getSwiperBanner = () => {
  return ajax.get('/api/home/banner', {}, {
    errorMessage: '获取广告图片失败'
  });
};
