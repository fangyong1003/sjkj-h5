import Args from './utils/args';
import cookie from './utils/cookie';

const token = Args.get('Token');
const channel = Args.get('Channel');
const deviceId = Args.get('DeviceId');

if (token) {
  cookie('token', {
    value: token,
    expires: 1
  });
}
if (channel) {
  cookie('channel', {
    value: channel,
    expires: 1
  });
}
if (deviceId) {
  cookie('deviceId', {
    value: deviceId,
    expires: 1
  });
}

const ins = {
  token: cookie('token'),
  Channel: cookie('channel') || '123',
  DeviceId: cookie('deviceId') || 1
};

const setGlobal = (k, v) => {
  ins[k] = v;
};

export default ins;

export {
  setGlobal
};
