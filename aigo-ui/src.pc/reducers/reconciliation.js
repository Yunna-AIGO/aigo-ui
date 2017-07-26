import { FETCH_ACC_SUCCESS, FETCH_ACC_FAILURE } from '../actions/reconciliation';
import cloneDeep from 'lodash/cloneDeep';

export default function accReducer(state={},action={}){
	switch (action.type){
		case FETCH_ACC_SUCCESS:
			var newState = cloneDeep(state);
			action.acc.duizhang = action.acc.data;
			newState = action.acc;
			return newState;
		default:
			return state;
	}
}