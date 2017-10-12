export const APPID = 'TestWechat';
export const SUCCESS = '0000';
export const VERSION = '1.0.1';

// storages
export const loginState = 'loginState';

// mock环境：cd server & yarn run start
// const urlPrefix = 'http://localhost:9000/api/v1/';
// 真实的服务接口：本地环境，接沙箱版的appid
// const urlPrefix = 'http://10.10.10.131:8080/cloudpick/rest/api/v1/';
// 真实的服务接口：测试环境，接真实的支付appid
const urlPrefix = 'http://10.10.10.130:8080/cloudpick/rest/api/v1/';

export const sendsms = urlPrefix + 'logon/sendsms?mobile={mobile}';
export const entry = urlPrefix + 'logon/entry';
export const qrcode = urlPrefix + 'logon/qrcode';

export const accountInfo = urlPrefix + 'account/{userId}/query'

export const orders = urlPrefix + 'order/{userId}/list?pageNum={pageNum}&pageSize={pageSize}';
export const orderInfo = urlPrefix + 'order/{orderId}/info';

export const userInfo = urlPrefix + 'user/{userId}/getNormalUser';
export const userModify = urlPrefix + 'user/modify?userId={userId}&mobile={mobile}&nickName={nickName}';

export const recharge = urlPrefix + 'trade/recharge';
export const pay = urlPrefix + 'trade/pay';
export const queryTrans = urlPrefix + 'trade/{transId}/info';
