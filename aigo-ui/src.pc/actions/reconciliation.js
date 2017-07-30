//import fetch from "isomorphic-fetch";
import Url from './Url';
import fetch from "cathay-fetch";

export const FETCH_ACC_SUCCESS = 'FETCH_ACC_SUCCESS';
export const FETCH_ACC_FAILURE = 'FETCH_ACC_FAILURE';

export function fetchAccReconciliation() {
	return dispatch=>{
		fetch(Url.accReconciliation, {
                method: 'get'
        }).then(data => {
                if (data) {
                    dispatch({
                        type: FETCH_ACC_SUCCESS,
                        acc: data.data ? data : {}
                    })
                } else {
                    dispatch({
                        type: FETCH_ACC_FAILURE,
                        acc: data.data ? data : {}
                    })
                }
            }
        )
	}
}