# todo list

0. ~~接入支付宝，同时支持沙箱+生产环境，不用第三方库~~
1. ~~订单详情页~~
2. ~~所有页面接nodejs服务，不在app里mock~~
3. ~~个人中心：用彩色icon，添加app icon~~
3. 登录后|打开app|每分钟，自动刷新二维码
4. 退出时跳转登录页
5. 样式：ios各版本、ios和android保持一致
6. ~~样式：ios plus版本borderWidth<1导致layout问题~~
6. 同理，充值后怎么触发『我的钱包』余额更新？
7. 未支付的订单，显示『去支付』，点击后显示弹框，选择支付宝或微信，点击『立即支付』，唤起支付宝或微信完成支付
7. 发送系统消息，app通知
8. 用户可反馈错误
9. 发送验证码：60s内disable，不可重复发
10. Modal会遮挡Toast，之前是用transparent的View，登录页里如何处理？//考虑用react-native-root-modal
11. 启动闪屏
12. 订单列表的分页，每次到底pageNum+1，然后再查
14. ~~order页不显示下拉刷新，只有下拉时才显示~~
15. 文本输入时页面不上浮，也不可关闭文本输入框，导致不能切换页面 // 用KeyboardAvoidingView部分解决了，但android的体验差，ios还没测
16. 橙白黑+彩色icon、或蓝白黑，最好能动态切换主题颜色
18. ~~按官方要求改alipay、微信样式，加相应的Logo~~
20. ~~用户中心：用户详情页~~
21. ~~支付是否成功：根据transId按1、2、4、8秒查询后台异步结果，而不是根据支付宝的同步结果做判断~~
22. 没有网络连接时，能优雅降级显示
23. ~~关闭js remoting debug时，Date()对象的表现行为不一致//模拟器+设备上用的是safari的js engine，remoting debug用的是chrome的V8引擎~~
24. storage支持过期失效，默认3个月，支持在选项里做配置
26. ~~订单页区分 充值 vs. 购物单，充值单显示『充值成功、取消、失败』，购物单显示『已支付、去支付』~~
27. react-native-wechat目前的buildToolsVersion="23.0.1",版本过低，需手工改为25.0.0，或后续移植到项目中来
28. 目前只有1个配置urlPrefix，如果有多个，考虑引入react-native-config，切换不同的环境：mock, dev, test, prod
29. ~~android的release版要先卸载debug版，再执行`yarn release`，ios的release版只需在xcode里scheme->run->build configuration里改成release再连真机run即可~~
30. 手机号、身份证号等敏感信息，中间若干位要打掩码


# Page

- QrCode : 二维码,
- Orders : 订单,
  - OrderDetail: 订单详情
- UserCenter : 用户中心
  - UserDetail : 用户详情
  - Wallet : 钱包
  	- Topup: 	充值
  		- TermOfServiceTopup: 充值条款
  - Setting: 设置
  - Logout : 登出
- Login : 登录
	- TermOfService: 服务条款

# 常用命令

请参见package.json，包括`yarn run ios|android`等