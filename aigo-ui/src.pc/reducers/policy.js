import {
    FETCH_POLICY,
    UPDATE_POLICY,
    FETCH_POLICY_SUCCESS
} from '../actions/policy';


export default function auth(state = [], action = {}) {
    switch (action.type) {
        case FETCH_POLICY_SUCCESS:
            return action.payload;
        case UPDATE_POLICY:
            return state.map(function (item) {
                return item.policyInfo.antPlicyNo !== action.payload.policyInfo.antPlicyNo ? item : Object.assign({}, action.payload);
            });
        default:
            return state;
    }
}
