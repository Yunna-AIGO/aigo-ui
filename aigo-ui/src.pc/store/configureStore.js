import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import initialState from './initialState';
import report from '../reducers/report';
import menu from '../reducers/menu';
import initialState1 from '../reducers/initialState';
import policy from  '../reducers/policy';
import policyDetail from  '../reducers/policyDetail';
import reportDetail from  '../reducers/reportDetail';
import reportEnter from '../reducers/reportEnter';


import examine from '../reducers/examine';
import accReconciliation from '../reducers/reconciliation';

function logger({ getState }) {
    return (next) => (action) => {
        // console.log('will dispatch', action)

        let returnValue = next(action)

        // console.log('state after dispatch', getState())

        return returnValue
    }
}

const reducer = combineReducers({report, menu, policy ,policyDetail,reportDetail,initialState1,reportEnter,examine,accReconciliation});

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware,logger)(createStore);

export default function configureStore() {
    return createStoreWithMiddleware(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
