import moment from 'moment';

// let phoneNo = '';

export const userInfo = (req, res, next) => {
	let userId = req.params.userId;
	console.log('userId: '+userId);
	let result = {
		code: '0000',
		message: 'success',
		userInfo: {
			userId: '170823111618385U000002',
			mobile: '13774436724',
			nickName: 'AlexanderYao',
			// email: 'wwu@cloudpick.me',
			// realName: '邬文尧',
			// status: 'normal',
		}
	};
	res.json(result);
};

export const userModify = (req, res, next) => {
	let {userId, mobile, nickName} = req.params;
	let result = {
		code: '0000',
		message: 'success',
		userInfo: {
			userId: userId,
			mobile: mobile,
			nickName: nickName,
			// email: 'wwu@cloudpick.me',
			// realName: '邬文尧',
			// status: 'normal',
		}
	};
	res.json(result);
};