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
