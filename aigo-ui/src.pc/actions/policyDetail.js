//import fetch from "isomorphic-fetch";
import fetch from "cathay-fetch";
export const FETCH_POLICY_DETAIL = 'FETCH_POLICY_DETAIL';
export const UPDATE_POLICY_DETAIL = 'UPDATE_POLICY_DETAIL';
export const FETCH_POLICY_DETAIL_SUCCESS = 'FETCH_POLICY_DETAIL_SUCCESS';
export const FETCH_CLIENT_INFO_SUCCESS = 'FETCH_CLIENT_INFO_SUCCESS';

export function fetchPolicyDetailByPolicyNo(antPolicyNo,isMock) {

    return dispatch => {
        //console.log(antPolicyNo);
        fetch('/api/v1/policies/getPolicyInfoByPolNo?policyNo='+antPolicyNo, {
            method:'GET',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(policyDetail=> {
            dispatch({
                type: FETCH_POLICY_DETAIL_SUCCESS,
                payload: policyDetail
            })
        })

    }
}

export function fetchClientInfoByPolicyNo(policyNo,reportNo,isMock) {
    return dispatch => {
        //console.log(antPolicyNo);
        fetch('/api/v1/policies/getPolicySnapshotByUniqueKey?policyNo='+policyNo+'&reportNo='+reportNo, {
            method:'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(policyDetail=> {
            console.log(policyDetail);
                dispatch({
                    type: FETCH_CLIENT_INFO_SUCCESS,
                    payload: policyDetail
                })
            })

    }
}