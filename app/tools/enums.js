// TransactionStatus
export const TransStatus = {
	INIT: '00',
	PENDING_PAYMENT: '01',
	PROCESSING: '02',
	SUCCEEDED: '04',
	FAILED: '05',
	TIMEOUT: '08',
	PAY_CANCEL: '09',
	CLOSED: '10',
};

export const OrderType = {
	CONSUME: '00',
	RECHARGE: '01',
};

export const OrderStatus = {
	init: '待支付',
	in_payment: '支付中',
	success: '订单支付成功',
	timeout: '订单过期',
	closed: '订单关闭',

	// INIT: {
	// 	code: 'init',
	// 	desc: '初始化',
	// },
	// PAYMENT_INPROGRESS: {
	// 	code: 'in_payment',
	// 	desc: '支付中',
	// },
	// SUCCEEDED: {
	// 	code: 'success',
	// 	desc: '订单支付成功',
	// },
	// TIMEOUT: {
	// 	code: 'timeout',
	// 	desc: '订单过期',
	// },
	// CLOSED: {
	// 	code: 'closed',
	// 	desc: '订单关闭',
	// },
};