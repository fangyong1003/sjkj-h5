import ajax from '@/common/ajax';
import { Toast } from 'vant';

export const getVipInfo = () => {
  return ajax.get('/api/member/my', {}, {
    errorMessage: '获取会员数据失败'
  });
};

export const getAchievement = ({ startTime, endTime }) => {
  return ajax.post('/api/user/my/team/performance', {
    beginDate: startTime,
    endDate: endTime
  }, {
    errorMessage: '查询失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};
