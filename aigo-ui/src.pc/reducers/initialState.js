import {
    FETCH_INITIALSTATE
} from '../actions/initialState';


export default function auth(state = [], action = {}) {
    switch (action.type) {
        case FETCH_INITIALSTATE:
            return action.initialState;
        default:
            return state;
    }
}
