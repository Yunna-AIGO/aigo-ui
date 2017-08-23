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
		orderAmt: 124.23,
		unPaidAmt: 62.1,
		payTime: Date.now(),
		storeName: '1号店(中山南路分店)', 
		gmtCreate: Date.now(),
	};

	res.json({
		code: '0000',
		message: 'success',
		data: order,
	});
};