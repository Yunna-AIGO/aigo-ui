/**
 * Created by i01007600608 on 2017/1/23.
 */
 const Url = {
    getReports: "/api/v1/tasks/getTasks",
    initBaseDetailInfo: "/api/v1/reports/initBaseDetailInfo",
    addOrUpdateSurveyInfo: "/api/v1/surveies/addOrUpdateSurveyInfo",
    updateReportInfo: "/api/v1/reports/updateReportInfo",
    updateReportInfoByReportNo: "/api/v1/reports/updateReportInfoByReportNo",
    getPolicyInfo: "/api/v1/policies/getPolicyInfo",
    policySearch: "/api/v1/policies/getPolicies",
    searchReportsMock:"/api/reportSearch.json",
    getExpenses:"/api/v1/registers/getExpenses",
    addRegisterInfo:"/api/v1/registers/addRegisterInfo",
    reportEnter:"/api/v1/reports/addReportInfo",
    registerAcceptance :"/api/v1/registers/registerAcceptance",
    initExamine:'/api/v1/reports/initExamine',
    updateExamineApprovalOpinion: '/api/v1/reports/updateExamineApprovalOpinion',
    getPolicySnapshotByUniqueKey: '/api/v1/policies/getPolicySnapshotByUniqueKey',
    claimAcceptType:'/api/v1/dicts/getDicts/CLM_ACCIDENT_TYPE',
    claimAcceptReason:'/api/v1/dicts/getDicts/CLM_ACCIDENT_REASON',


    accReconciliation: '/api/v1/acc/account',
}
export default Url;
