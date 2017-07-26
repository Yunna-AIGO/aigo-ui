import {
    FETCH_REPORTS,
    UPDATE_REPORT,
    FETCH_REPORTS_SUCCESS,
    RELEVANCE_POLICY_SUCCESS,
    RELEVANCE_POLICY_ERROR,
    FETCH_REPORT_RELEASE_SUCCESS,
    FETCH_REPORT_ACCEPT_SUCCESS
    
} from '../actions/report';
import cloneDeep from 'lodash/cloneDeep'

export default function auth(state = [], action = {}) {

    switch (action.type) {
        case FETCH_REPORTS_SUCCESS:
            var newState = cloneDeep(state);
            newState.data = action.payload;
            return newState;
        case UPDATE_REPORT:
            return state.map(function (item) {
                return item.reportInfo.id !== action.payload.reportInfo.id ? item : Object.assign({},state, action.payload);
            });
        case RELEVANCE_POLICY_SUCCESS:
            var newState = cloneDeep(state);
            newState.data = action.payload;
            return newState;
        case RELEVANCE_POLICY_ERROR:
            var newState = cloneDeep(state);
            newState.data = action.payload;
            return newState;

        default:
            return state;
    }
}
