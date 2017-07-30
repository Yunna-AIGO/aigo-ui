//import fetch from "isomorphic-fetch";

export const FETCH_POLICY = 'FETCH_POLICY';
export const UPDATE_POLICY = 'UPDATE_POLICY';
export const FETCH_POLICY_SUCCESS = 'FETCH_POLICY_SUCCESS';
import Url from './Url';
import fetch from "cathay-fetch";
export function fetchPolicyByAntPolicyNo(conditions,page,perPage,sort,order,callback) {

        let actionId = actionId?actionId:'';
        if (conditions.policyPeriod) {
            let policyPeriodArr = conditions['policyPeriod'];
            conditions['beginTime'] = Date.parse(policyPeriodArr[0]);
            conditions['endTime'] = Date.parse(policyPeriodArr[1]);
            delete conditions.policyPeriod;
        }
        let params = '?q=' + encodeURIComponent(JSON.stringify(conditions)) + "&page=" + page + "&perPage=" + perPage + "&sort=" + sort + "&order=" + order;
        let url = Url.policySearch + params;
        return dispatch => {
            fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            ).then(reports => {
                // console.log(reports);
                if(reports.code == 200){
                    if (reports.data && Object.prototype.toString.call(reports.data) === "[object Array]") {
                        reports.data.map((data, index) => {
                            data.key = index;
                        });
                    }
                    dispatch({
                        //console.log(reports.data);
                        type: FETCH_POLICY_SUCCESS,
                        payload: reports.data ? reports.data : new Object(),
                    })
                }else{
                    callback(reports);
                }
            });
        }
}