import moment from 'moment';

// let phoneNo = '';

export const getAccountInfo = (req, res, next) => {
	let userId = req.params.userId;
	console.log('userId: '+userId);
	let result = {
		code: '0000',
		message: 'success',
		data: {
			accId: 'dwy4670',
			userId: '13774436724',
			// accAmount: '500.3',
			availableAmount: '468.3',
			// freezeAmount: '32',
			// accType: '00',
			// status: 'normal',
		}
	};
	res.json(result);
};

export const entry = (req, res, next) => {
	console.log(req.body);
	let mobile = req.body.mobile;
	let smsCode = req.body.smsCode;
	let result = {
		code: '0000',
		message: 'success',
		data: {
			userId: mobile,
			token: 'AD775KJAL456K63D',
		},
	};
	res.json(result);
}

export const qrcode = (req, res) => {
	console.log(req.body);
	let userId = req.body.userId;
	let token = req.body.token;
	let random = Math.floor(Math.random()*1000000);
	let result = {
		code: '0000',
		message: 'success',
		data: {
			entry: 'http://www.yunna.me/api/entry/'+userId+'/'+token+'/'+random,
		}
	};
	res.json(result);
}