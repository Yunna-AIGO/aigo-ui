//import fetch from "isomorphic-fetch";
import Url from './Url';
import fetch from "cathay-fetch";

export const FETCH_EXAMIN_SUCCESS = 'FETCH_EXAMIN_SUCCESS';
export const FETCH_EXAMIN_FAILURE = 'FETCH_EXAMIN_FAILURE';

export function fetchExamine(reportNo) {
    //console.log(reportNo+'                       111111111');
	return dispatch=>{
		fetch(Url.initExamine, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:JSON.stringify(reportNo)
            }
        ).then(data => {
                //console.log(`${JSON.stringify(data)},data`);
                if (data) {
                    dispatch({
                        type: FETCH_EXAMIN_SUCCESS,
                        payload: data.data ? data.data : {}
                    })
                } else {
                    dispatch({
                        type: FETCH_EXAMIN_FAILURE,
                        payload: data.data ? data.data : {}
                    })
                }
            }
        )
	}
}