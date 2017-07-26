import { FETCH_EXAMIN_SUCCESS, FETCH_EXAMIN_FAILURE } from '../actions/examine';
import cloneDeep from 'lodash/cloneDeep';

export default function examineReducer(state={},action={}){
	switch (action.type){
		case FETCH_EXAMIN_SUCCESS:
			var newState = cloneDeep(state);
			newState = action.payload;
			return newState;
		default:
			return state;
	}
}