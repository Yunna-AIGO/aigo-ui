export const APPID = 'TestWechat';
export const SUCCESS = '0000';

// storages
export const loginState = 'loginState';

// mock环境：启动nodejs
const urlPrefix = 'http://localhost:9000/api/v1/';
// 真实的服务接口：本地环境
// const urlPrefix = 'http://localhost:8080/cloudpick/rest/api/v1/';
// 真实的服务接口：测试环境
// const urlPrefix = 'http://10.10.10.146:8080/cloudpick/rest/api/v1/';

export const sendsms = urlPrefix + 'logon/sendsms?mobile={mobile}';
export const entry = urlPrefix + 'logon/entry';
export const qrcode = urlPrefix + 'logon/qrcode';

export const accountInfo = urlPrefix + 'account/{userId}/query'


export const orders = urlPrefix + 'order/{userId}/list?pageNum={pageNum}&pageSize={pageSize}';

export const orderInfo = urlPrefix + 'order/{orderId}/info';

export const getUserInfo = urlPrefix + 'user/info/{userId}';
export const updateUserInfo = urlPrefix + 'user/info';

export const recharge = urlPrefix + 'trade/recharge';
export const pay = urlPrefix + 'trade/pay';
