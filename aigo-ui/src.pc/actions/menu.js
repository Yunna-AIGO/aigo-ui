export const GET_ALL_MENU = 'GET_ALL_MENU';
export const GET_ALL_MENU_SUCCESS = 'GET_ALL_MENU_SUCCESS';
export const UPDATE_NAVPATH = 'UPDATE_NAVPATH';

//import fetch from 'isomorphic-fetch';
import fetch from "cathay-fetch";

export function updateNavPath(activeKey, keyPath) {
    return {
        type: UPDATE_NAVPATH,
        payload: {
            activeKey: activeKey,
            keyPath: keyPath
        }
    }
}

export function getAllMenu() {
    return (dispatch)=> {
        return
        setTimeout(()=> {
            fetch('/api/menu.jsonx', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).then(json=> {
                dispatch({
                    type: GET_ALL_MENU_SUCCESS,
                    payload: json
                })
            });
        }, 2000)
    }

}
