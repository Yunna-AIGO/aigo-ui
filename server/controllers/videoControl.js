import moment from 'moment';

export const save = (req, res, next) => {
	console.log(req.body);
	let { cameraId, startTimestamp, endTimestamp, relativeUrl } = req.body;
	let result = {
		code: '0000',
		message: 'success',
		data: {
			cameraId: cameraId+'test',
			startTimestamp: startTimestamp+87686,
			endTimestamp: endTimestamp+87686,
			relativeUrl: relativeUrl+'test',
		},
	};
	res.json(result);
}