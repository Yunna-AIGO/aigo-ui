import moment from 'moment';

// let phoneNo = '';

export const sendsms = (req, res, next) => {
	let mobile = req.params.mobile;
	console.log('mobile: '+mobile);
	let result = {
		code: '0000',
		message: 'success',
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
			entryUrl: 'http://www.yunna.me/api/entry/'+userId+'/'+token+'/'+random,
		}
	};
	res.json(result);
}