import express, { Router } from 'express';
import { 
	sendsms,
	entry,
	qrcode,
} from './controllers/loginControl';
import {
	recharge,
	pay,
} from './controllers/tradeControl';
import {
	orders,
	orderInfo,
} from './controllers/orderControl';
import {
	getAccountInfo,
} from './controllers/accountControl';
import {
	userInfo,
	userModify,
} from './controllers/userControl';

const router = Router();

router.route('/logon/sendsms').get(sendsms);
router.route('/logon/entry').post(entry);
router.route('/logon/qrcode').post(qrcode);

router.route('/trade/recharge').post(recharge);
router.route('/trade/pay').post(pay);

router.route('/order/:userId/list').get(orders);
router.route('/order/:orderId/info').get(orderInfo);

router.route('/account/:userId/query').get(getAccountInfo);

router.route('/user/getNormalUserById/:userId').get(userInfo);
router.route('/user/modify').post(userModify);

export default router;