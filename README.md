# todo list

1. 订单详情页
2. 所有页面接nodejs服务，不在app里直接mock，接口与文档一致
3. 登录/注册页：目前写在qrCode里，应该拆出来，在任何页面判断未登录时，都跳转到登录页
4. 启动闪屏
5. 个人中心：用彩色icon
6. css如何切换主题
7. 发送系统消息
8. 用户可反馈错误
9. 发送验证码：60s内disable，不可重复发
10. Modal会遮挡Toast，之前是用transparent的View，登录页里如何处理？



# Page

QrCode : 二维码,
Orders : 订单,
  OrderDetail: 订单详情
UserCenter : 用户中心
  UserDetail : 用户详情
  Wallet : 钱包
  	Topup: 	充值
  		TermOfServiceTopup: 充值条款
  Setting: 设置
  Logout : 登出
Login : 登录
	TermOfService: 服务条款

# 常用命令

请参见package.json，包括`yarn run ios|android`等