//import fetch from "isomorphic-fetch"
import Url from './Url';
import fetch from "cathay-fetch";
export const FETCH_REPORTS = 'FETCH_REPORTS';
export const UPDATE_REPORT = 'UPDATE_REPORT';
export const FETCH_REPORTS_SUCCESS = 'FETCH_REPORTS_SUCCESS';
export const RELEVANCE_POLICY_SUCCESS = 'RELEVANCE_POLICY_SUCCESS';
export const RELEVANCE_POLICY_ERROR = 'RELEVANCE_POLICY_ERROR';
export const FETCH_REPORT_ACCEPT_SUCCESS = 'FETCH_REPORT_ACCEPT_SUCCESS';

export function searchReportsByConditions(conditions, callback,page, pageSize, sort, order) {
  
    let actionId = actionId?actionId:'';

    let params = '?q=' + encodeURIComponent(JSON.stringify(conditions)) + '&page=' + page + '&perPage=' + pageSize;
    let url = Url.getReports + params;
    
    return dispatch => {
        fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(reports => {
            // console.log('reports:',reports)
            if(reports.code == 200){
                if (reports.data.tasks && Object.prototype.toString.call(reports.data.tasks) === "[object Array]") {
                    reports.data.tasks.map((data, index) => {
                        data.key = index;
                    });
                }
                dispatch({
                    type: RELEVANCE_POLICY_SUCCESS,
                    payload: reports.data ? reports.data : new Object(),
                })
            }
            callback(reports);
        })
    }
}








