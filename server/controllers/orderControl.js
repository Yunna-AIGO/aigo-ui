import moment from 'moment';

export const orders = (req, res, next) => {
	let userId = req.params.userId;
	let pageNum = req.query.pageNum;
	let pageSize = req.query.pageSize;
	let orders = [];

	for(let i=0;i<20;i++){
		orders.push({
			orderId: '26662689'+i, 
			userId: userId,
			orderAmt: ''+(21.3*(i+1)).toFixed(2),
			unPaidAmt: ''+(i%2 == 0 ? 0 : 10.2),
			orderType: (i%3 == 0) ? '01' : '00',
			payTime: (i%2 == 0) ? '2017-08-23 18:44:09' : null,
			status: (i%2 == 0) ? 'init' : 'success',
			storeId: (i+1) + '号店(中山南路分店)',
			storeName: (i+1) + '号店(中山南路分店)', 
			gmtCreate:'2017-08-23 17:01:23', 
		});
	}

	res.json({
		code: '0000',
		message: 'success',
		data: orders,
	});
};

export const orderInfo = (req, res, next) => {
	let orderId = req.params.orderId;
	let detail = req.params.detail;
	
	let order = {
		orderId: orderId,
		userId: 'alex',
		orderAmt: 4124.23,
		unPaidAmt: 62.1,
		payTime: '2017-08-23 18:44:09',
		storeId: '1号店(中山南路分店)', 
		storeName: '1号店(中山南路分店)', 
		gmtCreate: '2017-08-23 17:01:23',
		goodsList: [
			{
				goodsId:'11', goodsName:'米米果女童长袖连帽套头卫衣', goodsNum:1, goodsUnit:'件', goodsPrice:'238',
				goodsPhotoUrl:'https://gd3.alicdn.com/imgextra/i3/38455724/TB2MitTXbT8F1Jjy0FgXXX3fpXa_!!38455724.jpg',
			},
			{
				goodsId:'12', goodsName:'Camel骆驼男鞋秋季休闲皮鞋', goodsNum:2, goodsUnit:'双', goodsPrice:'437',
				goodsPhotoUrl:'https://img.alicdn.com/imgextra/i4/1690521144/TB2X4X3aw28F1Jjy0FfXXa6sFXa_!!1690521144.jpg',
			},
			{
				goodsId:'13', goodsName:'科沃斯地宝朵朵S规划扫地机器人', goodsNum:1, goodsUnit:'件', goodsPrice:'1288',
				goodsPhotoUrl:'https://gd2.alicdn.com/imgextra/i2/2535330525/TB2v4o0fR4lpuFjy1zjXXcAKpXa_!!2535330525.jpg',
			},
			{
				goodsId:'14', goodsName:'华硕X555游戏笔记本电脑', goodsNum:1, goodsUnit:'台', goodsPrice:'2499',
				goodsPhotoUrl:'https://gd2.alicdn.com/imgextra/i2/25628539/TB29bAsoFXXXXaoXpXXXXXXXXXX_!!25628539.jpg',
			},
			{
				goodsId:'15', goodsName:'儿童短袖T恤潮韩版背带裤', goodsNum:1, goodsUnit:'件', goodsPrice:'106',
				goodsPhotoUrl:'https://gd1.alicdn.com/imgextra/i1/38455724/TB2pCQ5oYtlpuFjSspoXXbcDpXa_!!38455724.jpg',
			},
		],
	};

	res.json({
		code: '0000',
		message: 'success',
		data: order,
	});
};