import axios from 'axios';
import qs from 'qs';
import globalValue from './globalValue';
import guid from './utils/guid';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get.Accept = 'application/json';

const method = ['post', 'get', 'put', 'delete', 'patch'];
const ins = {};

function logAjaxError({ level = 'warning', method, url, code, message, data, response }) {
  const Raven = window.Raven;
  method = method.toUpperCase();

  try {
    Raven && Raven.captureMessage(`${method} ${url} [${code}:${message}] `, {
      level,
      logger: 'ajax',
      tags: {
        Type: 'ajax'
      },
      extra: { url, data, method, response }
    });
  } catch (e) {
    //
  }
}

const middlewares = [];
export const addMiddlewares = (cb) => {
  if (middlewares.indexOf(cb) > -1) {
    return;
  }
  middlewares.push(cb);
};

method.forEach((method) => {
  ins[`_${method}`] = function (url, data, options = {}) {
    data = data || {};

    data.requestId = guid();

    if (method === 'get') {
      const params = {
        ...data
      };

      data = { params };
    } else if (!(data instanceof FormData) && !options.isJson) {
      data = {
        data: qs.stringify(data)
      };
    }

    middlewares.forEach((cb) => {
      const result = cb(url);
      if (!result) {
        return;
      }
      if (result.url) {
        url = result.url;
      }
    });

    const headers = options.headers || {};
    if (options.isJson) {
      headers['Content-Type'] = 'application/json';
    }

    return axios({
      url,
      method,
      ...data,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        ClientType: 4,
        UserId: 1,
        Token: globalValue.token || '',
        Longitude: globalValue.lng || '',
        Latitude: globalValue.lat || '',
        SoftVersion: '0.1',
        SystemVersion: '0.1',
        DeviceId: globalValue.DeviceId,
        Time: (new Date()).getTime(),
        SignVersion: '1',
        Sign: '1',
        PhoneVersion: 1,
        Channel: globalValue.Channel,
        AppIdentifier: 11,
        MerchantId: 12,
        ...headers
      },
      ...options
    }).then(res => res.data);
  };
});

method.forEach((method) => {
  ins[method] = (url, data, options) => {
    return new window.Promise((res, rej) => ins[`_${method}`](url, data, options)
        .then((response) => {
          if (response.success) {
            res(response);
          } else {
            rej(response.errorMessage || options.errorMessage || '网络错误');

            logAjaxError({
              level: response.code > 10000 ? 'info' : 'warning',
              method,
              url,
              data,
              code: response.code,
              message: response.errorMessage,
              response
            });
          }
        })
        .catch((error) => {
          rej(options.errorMessage || error);

          logAjaxError({
            level: 'error',
            method,
            url,
            data,
            code: error.response.status,
            message: error.response.statusText,
            response: error.response
          });
        }));
  };
});

export default ins;
