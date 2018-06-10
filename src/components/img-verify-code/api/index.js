import ajax from '@/common/ajax';
import cookie from '@/common/utils/cookie';

export const getImgVerifyCode = () => {
  return ajax.get('/api/img_check_code', {
    clientType: 4,
    deviceId: cookie('deviceId') || 1
  });
}
