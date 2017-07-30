//import fetch from "isomorphic-fetch";
import Url from './Url';
import fetch from "cathay-fetch";
export const FETCH_REPORT_DETAIL = 'FETCH_REPORT_DETAIL';
export const UPDATE_REPORT_DETAIL = 'UPDATE_REPORT_DETAIL';
export const FETCH_REPORT_DETAIL_SUCCESS = 'FETCH_REPORT_DETAIL_SUCCESS';
export const FETCH_CLAIM_DETAIL_SUCCESS = 'FETCH_CLAIM_DETAIL_SUCCESS';
export const FETCH_BUTTON_STATE_SUCCESS = 'FETCH_BUTTON_STATE_SUCCESS';
export const FETCH_POLICY_INFO_SUCCESS = 'FETCH_POLICY_INFO_SUCCESS';
export const FETCH_SURVEY_DETAIL_SUCCESS = 'FETCH_SURVEY_DETAIL_SUCCESS';
export const FETCH_POLICY_QUERY_DETAIL_SUCCESS = 'FETCH_POLICY_QUERY_DETAIL_SUCCESS';
export const FETCH_REPORT_DETAIL_FAILURE = 'FETCH_REPORT_DETAIL_FAILURE';
export const FETCH_ACCEPT_SUCCESS = 'FETCH_ACCEPT_SUCCESS';
export const FETCH_ANNOTATION_SUCCESS = 'FETCH_ANNOTATION_SUCCESS';
export const FETCH_SURVEYINFO_SUCCESS = 'FETCH_SURVEYINFO_SUCCESS';
export const FETCH_REPORT_RELEASE_SUCCESS = 'FETCH_REPORT_RELEASE_SUCCESS';
export const FETCH_CORRELATION_SUCCESS = 'FETCH_CORRELATION_SUCCESS';
export const FETCH_REGISTER_ENTER_SUCCESS = 'FETCH_REGISTER_ENTER_SUCCESS';
export const FETCH_SAVE_REGISTER_ENTER_SUCCESS = 'FETCH_SAVE_REGISTER_ENTER_SUCCESS';
export const FETCH_REGISTERFINISH_SUCCESS = 'FETCH_REGISTERFINISH_SUCCESS';
export const FETCH_ADJUSTMENT_INFO_SUCCESS = 'FETCH_ADJUSTMENT_INFO_SUCCESS';
export function fetchReportDetailByPolicyNo(antPolicyNo, isMock) {
    return dispatch => {

        fetch('/api/reportDetail.json', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(reportDetail => {
            dispatch({
                type: FETCH_REPORT_DETAIL_SUCCESS,
                payload: reportDetail.reportDetail.data
            })
        })

    }
}

export function fetchPolicyInfoByPolicyNo(antPolicyNo, reportNo, oldPolicyNo, id, callback) {

    if (!oldPolicyNo)
        oldPolicyNo = '';

    return dispatch => {

        fetch(Url.getPolicyInfo + '?antPolicyNo=' + antPolicyNo + '&reportNo=' + reportNo + '&oldPolicyNo=' + oldPolicyNo + '&actionId=' + id, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(policyInfo => {
                callback(policyInfo);
                if(policyInfo.code == 200){
                    dispatch({
                        type: FETCH_POLICY_INFO_SUCCESS,
                        payload: policyInfo ? policyInfo : {}
                    })
                }
        })
    }
}
export function fetchReportByReportNo(reportNo, policyNo, actionId,callBack) {
    if (!policyNo)
        policyNo = '';

    if(!actionId){
        actionId = '';
    }

    return dispatch => {
        fetch(Url.initBaseDetailInfo + '?reportNo=' + reportNo + '&policyNo=' + policyNo + '&actionId=' + actionId, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        ).then(report => {
                console.log('componentDidmount backinfo',report);
                if (report.code == 200) {
                    dispatch({
                        type: FETCH_REPORT_DETAIL_SUCCESS,
                        payload: report.data ? report.data : {}
                    })
                } else {
                    dispatch({
                        type: FETCH_REPORT_DETAIL_FAILURE,
                        payload: report.data ? report.data : {}
                    })
                }
                callBack&&callBack()
            }
        )
    }
}
export function fetchButtonStateByPolicyNo() {

    return dispatch => {

        fetch('/api/buttonState.json', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(buttonState => {

            dispatch({
                type: FETCH_BUTTON_STATE_SUCCESS,
                payload: buttonState
            })
        })

    }
}


export function reportDetailClaim() {

    return dispatch => {

        fetch('/api/accept.json', {
               headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(claim => {
            dispatch({
                type: FETCH_CLAIM_DETAIL_SUCCESS,
                payload: claim
            })
        })

    }
}


export function fetchSaveSurvey(claim) {

    return dispatch => {

        dispatch({
            type: FETCH_SURVEY_DETAIL_SUCCESS,
            payload: claim
        })

    }
}


export function claimDetailPolicy() {

    return dispatch => {

        fetch('/api/claimPolicy.json', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(claimPolicy => {

            dispatch({
                type: FETCH_POLICY_QUERY_DETAIL_SUCCESS,
                payload: claimPolicy
            })
        })

    }
}

export function reportAccept(reportAccept) {

    return dispatch => {
        dispatch({
            type: FETCH_ACCEPT_SUCCESS,
            payload: reportAccept
        })
    }
}

export function reportAnnotation(reportAn) {

    return dispatch => {

        dispatch({
            type: FETCH_ANNOTATION_SUCCESS,
            payload: reportAn
        })

    }
}

export function reportCorrelation(reportAn) {

    return dispatch => {

        dispatch({
            type: FETCH_CORRELATION_SUCCESS,
            payload: reportCorrelation
        })

    }
}

export function registerFinish(registerFinish){

    return dispatch => {

        dispatch({
            type: FETCH_REGISTERFINISH_SUCCESS,
            payload: registerFinish
        })

    }
}

export function surveyTabInfo(callback, error) {
    return dispatch => {

        fetch('/api/survey.json', {
               headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(surveyInfo => {

            dispatch({
                type: FETCH_SURVEYINFO_SUCCESS,
                payload: surveyInfo
            })
        })

    }
}


export function fetchReportAccept(reportNo, policyNo) {

    if (!policyNo)
        policyNo = '';
    return dispatch => {

        fetch(Url.initBaseDetailInfo + '?reportNo=' + reportNo + '&policyNo=' + policyNo, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(reportAccept => {
                dispatch({
                    type: FETCH_REPORT_ACCEPT_SUCCESS,
                    payload: reportAccept
                })
            }
        )
    }
}

export function fetchReportRelease(reportNo, policyNo) {

    if (!policyNo)
        policyNo = '';
    return dispatch => {

        fetch(Url.initBaseDetailInfo + '?reportNo=' + reportNo + '&policyNo=' + policyNo, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(reportRelease => {
                dispatch({
                    type: FETCH_REPORT_RELEASE_SUCCESS,
                    payload: reportRelease
                })
            }
        )
    }
}


export function registerEnterData() {
    return dispatch => {

        fetch('/api/v1/tasks/registerInfo', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(registerInfo => {

                dispatch({
                    type: FETCH_REGISTER_ENTER_SUCCESS,
                    payload: registerInfo
                })
            })
    }
}

export function getAdjustmentData(adInfo) {
    return dispatch => {

        dispatch({
            type: FETCH_ADJUSTMENT_INFO_SUCCESS,
            payload: adInfo
        })

    }
}


export function saveRegisterEnterData() {
    return dispatch => {

        fetch('/api/v1/tasks/registerSaveInfo', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(registerInfo => {

                dispatch({
                    type: FETCH_SAVE_REGISTER_ENTER_SUCCESS,
                    payload: registerInfo
                })
            })
    }
}


