import {
    FETCH_REPORT_ENTER_SUCCESS
} from '../actions/reportEnter';
import cloneDeep from 'lodash/cloneDeep'

export default function auth(state = [], action = {}) {
    switch (action.type) {
        case FETCH_REPORT_ENTER_SUCCESS:
            var newState = cloneDeep(state);
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}
