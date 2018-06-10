import { Toast } from 'vant';
import ajax from '@/common/ajax';

let localFiles = [];

function getParameterByName(name, url) {
  name = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
  url = url ? ('?' + url.split('#')[0].split('?')[1]) : window.location.search;
  var results = RegExp('[?&]' + name + '=([^&#]*)').exec(url);
  return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : '';
}

const uploadfile = (uploadUrl, file, token) => {
  let formData = new FormData();

  file = file.file;
  formData.append('token', token);
  formData.append('file', file);

  let ext = '';
  const exts = file.name.split('.');
  if (exts.length > 1) {
    ext = `.${exts[exts.length - 1]}`;
  }
  formData.append('x:ext', ext);
  Toast('正在上传....');
  return ajax.post(uploadUrl, {
    formData
  }, {
    errorMessage: '获取图片token失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
  // return ajax({
  //   url: uploadUrl,
  //   method: 'post',
  //   data: formData,
  //   contentType: 'multipart/form-data; charset=UTF-8'
  // });
};

let getToken = (options) => {
  return ajax.get(options.tokenUrl, {}, {
    errorMessage: '获取图片token失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
  // ajax({
  //   url: options.tokenUrl,
  //   method: 'get',
  //   noXRequestedWithHeader: true,
  //   data: {
  //     channel: 'meeting_common',
  //     max: 5
  //   }
  // });
};

export default function uploadLocalImage(options) {
  return new Promise((resolve, reject) => {
    let { target, uploadUrl } = options;
    // 获取token
    getToken(options).then(data => {
      // 返回的token
      let { token } = data.data.data;
      let uploadResult = [];
      // 选择后的所有的files
      let files = target;
      let upload = (index) => {
        if (files[index]) {
          // 上传图片
          uploadfile(uploadUrl, files[index], token).then(res => {
            uploadResult.push(res.data.data);
            upload(index);
          }).catch(resp => {
            reject(resp);
            Toast('上传失败');
          });
        } else if (uploadResult.length > 0) {
          resolve(uploadResult);
        }
        index++;
      };
      upload(0);
    }).catch(resp => {
      reject(resp);
      Toast('上传失败');
    });
  });
}
