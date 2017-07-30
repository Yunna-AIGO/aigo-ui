//import fetch from "isomorphic-fetch";

export const FETCH_INITIALSTATE = 'FETCH_INITIALSTATE';
import fetch from "cathay-fetch";


export function fetchInitialStatePolicyNo(antPolicyNo,isMock) {


    return dispatch => {

        fetch('/api/initialState.json',{
        	headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(initialState=> {
            dispatch({
                type: FETCH_INITIALSTATE,
                initialState: initialState.initialState
            })
        })

    }
}