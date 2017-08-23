export const APPID = 'TestWechat';
export const SUCCESS = '0000';

// storages
export const loginState = 'loginState';

// mock by nodejs
// const urlPrefix = 'http://localhost:9000/api/v1/';
// local
const urlPrefix = 'http://localhost:8080/cloudpick/rest/api/v1/';
// wenhao
// const urlPrefix = 'http://10.10.10.146:8080/cloudpick/rest/api/v1/';

export const sendsms = urlPrefix + 'logon/sendsms?mobile={mobile}';
export const entry = urlPrefix + 'logon/entry';
export const qrcode = urlPrefix + 'logon/qrcode';

export const accountInfo = urlPrefix + 'account/{userId}/query'

export const orders = urlPrefix + 'order/{userId}/list';
export const orderInfo = urlPrefix + 'order/{orderId}/info';

export const getUserInfo = urlPrefix + 'user/info/{userId}';
export const updateUserInfo = urlPrefix + 'user/info';

export const recharge = urlPrefix + 'trade/recharge';
export const pay = urlPrefix + 'trade/pay';
