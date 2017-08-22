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

export const getCaptcha = urlPrefix + 'captcha/{phoneNo}';
export const login = urlPrefix + 'login';
export const bind = urlPrefix + 'bind';
export const entry = urlPrefix + 'entry?userId={userId}&token={token}';
export const getOrderHistory = urlPrefix + 'order/list/{userId}?from={from}&to={to}';
export const getOrderInfo = urlPrefix + 'order/{orderId}';
export const getUserInfo = urlPrefix + 'user/info/{userId}';
export const updateUserInfo = urlPrefix + 'user/info';
export const recharge = urlPrefix + 'trade/recharge';

export const books = urlPrefix + 'books';
export const doubanApi = 'https://api.douban.com/v2/book/{id}';