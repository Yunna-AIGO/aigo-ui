let ajaxURLs = a=>[
	/**
	 * getReports: "/api/v1/tasks/getTasks",
	 initBaseDetailInfo: "/api/v1/reports/initBaseDetailInfo",
	 addOrUpdateSurveyInfo: "/api/v1/surveies/addOrUpdateSurveyInfo",
	 updateReportInfo: "/api/v1/reports/updateReportInfo",
	 updateReportInfoByReportNo: "/api/v1/reports/updateReportInfoByReportNo",
	 getPolicyInfo: "/api/v1/policies/getPolicyInfo",
	 searchReportsMock:"/api/reportSearch.json",
	 getExpenses:"/api/v1/registers/getExpenses",
	 addRegisterInfo:"/api/v1/registers/addRegisterInfo",
	 reportEnter:"/api/v1/reports/addReportInfo",
	 registerAcceptance :"/api/v1/registers/registerAcceptance",
	 initExamine:'/api/v1/reports/initExamine',
	 updateExamineApprovalOpinion: '/api/v1/reports/updateExamineApprovalOpinion',
	 *
		['路径','域',端口(默80)]，
		['路径',{数据}]，
	 *
	 	10.253.2.180
	 *
	//  */
	['/api/v1/tasks/getTasks','http://10.253.2.180'],
	["/api/v1/reports/initBaseDetailInfo",'http://10.253.2.180'],
	["/api/v1/surveies/addOrUpdateSurveyInfo", 'http://10.253.2.180'],
	["/api/v1/reports/updateReportInfo", 'http://10.253.2.180'],
	["/api/v1/reports/updateReportInfoByReportNo", 'http://10.253.2.180'],
	["/api/v1/policies/getPolicyInfo", 'http://10.253.2.180'],
	["/api/reportSearch.json", 'http://10.253.2.180'],
	["/api/v1/registers/getExpenses", 'http://10.253.2.180'],
	["/api/v1/registers/addRegisterInfo", 'http://10.253.2.180'],
	["/api/v1/reports/addReportInfo", 'http://10.253.2.180'],
	["/api/v1/registers/registerAcceptance", 'http://10.253.2.180'],
	["/api/v1/reports/addReportInfo", 'http://10.253.2.180'],
    ['/api/v1/dicts/getDicts/CLM_ACCIDENT_TYPE', 'http://10.253.2.180'],
	['/api/v1/dicts/getDicts/CLM_ACCIDENT_REASON', 'http://10.253.2.180'],
	['/api/v1/claims/adjustmentInfo', 'http://10.253.2.180'],
	['/api/v1/claims/adjustmentAcceptance', 'http://10.253.2.180'],
	['/api/v1/claims/closeReport', 'http://10.253.2.180'],
	['/api/v1/policies/getPolicySnapshotByUniqueKey', 'http://10.253.2.180'],
	['/api/v1/policies/getPolicies', 'http://10.253.2.180'],

    // ['/api/v1/acc/billcompare/result', root.queryBillCompareResult],
	 // ["/api/v1/policies/getPolicySnapshotByUniqueKey",root.policyInfoData],
	 // ["/api/v1/registers/AdjustmentAcceptance", root.registerInfo],
	 // ["/api/v1/claims/adjustmentInfo", root.registerInfo],
	 // ["/api/v1/claims/closeReport", root.registerInfo],
	 // ["/api/v1/claims/refuseClaim", root.registerInfo],
	 // ["/api/v1/surveies/addOrUpdateSurveyInfo", root.reportDetail],
	 // ['/api/v1/tasks/registerInfo', root.registerInfo],
	 // ['/api/v1/tasks/registerSaveInfo', root.registerInfo],
	 // ['/api/v1/tasks/registerFinish', root.registerFinish],	
	 // ['/api/v1/tasks/getTasks', root.reportList],
	 // ["/api/v1/reports/initBaseDetailInfo", root.reportDetail],
]

let root = require('./pageModel');
module.exports = ajaxURLs();

