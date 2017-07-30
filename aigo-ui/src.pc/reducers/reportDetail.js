import {
    FETCH_REPORT_DETAIL,
    UPDATE_REPORT_DETAIL,
    FETCH_REPORT_DETAIL_SUCCESS,
    FETCH_REPORT_DETAIL_FAILURE,
    FETCH_POLICY_INFO_SUCCESS,
    FETCH_BUTTON_STATE_SUCCESS,
    FETCH_CLAIM_DETAIL_SUCCESS,
    FETCH_SURVEY_DETAIL_SUCCESS,
    FETCH_POLICY_QUERY_DETAIL_SUCCESS,
    FETCH_REGISTERS,
    UPDATE_REGISTER,
    FETCH_REGISTERS_SUCCESS,
    FETCH_REGISTERS_FAILURE,
    FETCH_ACCEPT_SUCCESS,
    FETCH_REPORT_RELEASE_SUCCESS,
    FETCH_ANNOTATION_SUCCESS,
    FETCH_SURVEYINFO_SUCCESS,
    FETCH_REPORT_ACCEPT_SUCCESS,
    FETCH_CORRELATION_SUCCESS,
    FETCH_REGISTER_ENTER_SUCCESS,
    FETCH_SAVE_REGISTER_ENTER_SUCCESS,
    FETCH_REGISTERFINISH_SUCCESS,
    FETCH_ADJUSTMENT_INFO_SUCCESS
    } from '../actions/reportDetail';
import cloneDeep from 'lodash/cloneDeep'

function mergeReportDetail(pre, current) {
    let rtn = Object.assign({}, pre);

    Object.keys(current).forEach((key) => {
        if (key == 'data') {
            Object.keys(current['data']).forEach((dataAttr) => {
                rtn['data'][dataAttr] = current['data'][dataAttr];
            })
        }else{
            rtn[key] = current[key];
        }
    });

    return rtn;
}


export default function x(state = {}, action = {}) {
    switch (action.type) {
        case FETCH_REPORT_DETAIL_SUCCESS:
            if(!action.payload.operations){
                action.payload.operations = [];
            }
            //action.payload.operations.push("registerEnter");

            return action.payload;
        case FETCH_POLICY_INFO_SUCCESS:
            var newState = cloneDeep(state);
            newState.data.policyInfo = action.payload.data.data.policyInfo;
            newState.operations = action.payload.data.operations;
            newState.tips = null;
            return newState;
        case FETCH_CLAIM_DETAIL_SUCCESS:
            var newState = cloneDeep(state);
            newState = action.payload.accept.data;
            return newState;
        case FETCH_REPORT_DETAIL_FAILURE:
            var newState = cloneDeep(state);
            newState.data.policyInfo = null;
            newState.data.reportInfo = null;
            newState.tabs = [];
            newState.operations = [];
            return newState;
        case FETCH_SURVEY_DETAIL_SUCCESS:
            var newState = cloneDeep(state);
            newState.tabs = action.payload.data.tabs;
            newState.operations = action.payload.data.operations;
            newState.data.surveyInfo = action.payload.data.data.surveyInfo;
            return newState;
        case FETCH_POLICY_QUERY_DETAIL_SUCCESS:
            var newState = cloneDeep(state);
            newState = action.payload.claimPolicy.data;
            return newState;
        case UPDATE_REPORT_DETAIL:
            return state.map(function (item) {
                return item.policyInfo.antPlicyNo !== action.payload.policyInfo.antPlicyNo ? item : Object.assign({}, state, action.payload);
            });
        case FETCH_REGISTERS_SUCCESS:
            var newState = cloneDeep(state);
            newState.data.registerInfo = action.payload;
            return newState;
        case FETCH_CORRELATION_SUCCESS:
            var newState = cloneDeep(state);
            newState.correlation = 'correlation';
            return newState;
        case FETCH_ACCEPT_SUCCESS:
            var newState = cloneDeep(state);
            return newState;
        case FETCH_BUTTON_STATE_SUCCESS:
            var newState = cloneDeep(state);
            newState.data.register = action.payload;
            return  newState;
        case FETCH_ANNOTATION_SUCCESS:
            var newState = cloneDeep(state);

            return  newState;
        case FETCH_SURVEYINFO_SUCCESS:
            var newState = cloneDeep(state);
            newState = action.payload.survey.data;
            return  newState;
        case FETCH_REPORT_RELEASE_SUCCESS:
            var newState = cloneDeep(state);
            newState.data = action.payload;
            return newState;
        case FETCH_REPORT_ACCEPT_SUCCESS:
            var newState = cloneDeep(state);
            newState.data = action.payload;
            return newState;
        case FETCH_REGISTER_ENTER_SUCCESS:
            var newState = cloneDeep(state);
            newState.data.registerInfo = action.payload.data.data.registerInfo;
            return newState;
        case FETCH_SAVE_REGISTER_ENTER_SUCCESS:
            var newState = cloneDeep(state);
            newState = action.payload.data;
            return newState;
        case FETCH_REGISTERFINISH_SUCCESS:
            var newState = cloneDeep(state);
            return newState;
        case FETCH_ADJUSTMENT_INFO_SUCCESS:
            var newState = cloneDeep(state);
            //测试使用的数据
            action.payload.data.data.adjustmentTabInfo.push(
                {
                    key: '2',
                    a: 'hhh',
                    b: 322,
                    c: '11',
                    d: '231',
                    e: '32'
                }
            );
            newState.data.adjustmentTabInfo = action.payload.data.data.adjustmentTabInfo;
            return newState;
        default:
            return state;
    }
}
