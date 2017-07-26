//import fetch from "isomorphic-fetch";
import fetch from "cathay-fetch";
export const FETCH_REPORT_ENTER_SUCCESS = 'FETCH_REPORT_ENTER_SUCCESS';
import Url from '../actions/Url'

export function fetchReportEnter(reportEnter, callback,successCallback) {

console.log('reportEnter',reportEnter);

    if (reportEnter.prefix)
        delete reportEnter.prefix;
    if (reportEnter['accidentTime']) {
        reportEnter['accidentTime'] = reportEnter['accidentTime'].format('YYYY-MM-DD HH:mm:ss');
    }
    if (reportEnter['reportTime']) {
        reportEnter['reportTime'] = reportEnter['reportTime'].format('YYYY-MM-DD HH:mm:ss');
    }
    return dispatch => {

        fetch(Url.reportEnter + "?actionId=ACTION_R10", {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reportEnter)
            }
        ).then(reportEnter => {

            if (reportEnter.code == 400) {
                callback(reportEnter);
            }

            if (reportEnter.code == 200) {
                successCallback(reportEnter);
            }

            dispatch({
                type: FETCH_REPORT_ENTER_SUCCESS,
                payload: reportEnter
            })
        })
    }
}