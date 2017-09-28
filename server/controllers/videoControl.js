import moment from 'moment';

export const save = (req, res, next) => {
	console.log(req.body);
	let { cameraId, startTimestamp, endTimestamp, relativeUrl, thumbUrlthumbUrl } = req.body;
	let result = {
		code: '0000',
		message: 'success',
		data: {
			cameraId: cameraId+'test',
			startTimestamp: startTimestamp+87686,
			endTimestamp: endTimestamp+87686,
			relativeUrl: relativeUrl+'test',
			thumbUrl: thumbUrl+'test',
		},
	};
	res.json(result);
}

export const saveProfile = (req, res, next) => {
	console.log(req.body);
	let { customerId, cameraId, timestamp, relativeUrl } = req.body;
	let result = {
		code: '0000',
		message: 'success',
		data: {
			customerId: customerId+'test',
			cameraId: cameraId+'test',
			timestamp: timestamp+87686,
			relativeUrl: relativeUrl+'test',
		},
	};
	res.json(result);
}