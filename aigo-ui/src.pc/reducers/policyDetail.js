import {
    FETCH_POLICY_DETAIL,
    UPDATE_POLICY_DETAIL,
    FETCH_POLICY_DETAIL_SUCCESS,
    FETCH_CLIENT_INFO_SUCCESS,
    RELEVANCE_POLICY_SUCCESS,
    RELEVANCE_POLICY_ERROR,
    RELEVANCE_BUTTON_SUCCESS,
    RELEVANCE_BUTTON_ERROR
} from '../actions/policyDetail';


export default function auth(state = [], action = {}) {
    switch (action.type) {
        case FETCH_POLICY_DETAIL_SUCCESS:
            return action.payload;
        case  FETCH_CLIENT_INFO_SUCCESS:
            return action.payload;
        case UPDATE_POLICY_DETAIL:
            return state.map(function (item) {
                return item.policyInfo.antPlicyNo !== action.payload.policyInfo.antPlicyNo ? item : Object.assign({}, action.payload);
            });
        case RELEVANCE_POLICY_SUCCESS:
            return action.payload;
        case RELEVANCE_POLICY_ERROR:
            return action.payload;
        case  RELEVANCE_BUTTON_SUCCESS:
            return action.payload;
        case RELEVANCE_BUTTON_ERROR:
            return action.payload;
        default:
            return state;
    }
}
