import {
    GET_ALL_MENU,
    GET_ALL_MENU_SUCCESS,
    UPDATE_NAVPATH
} from '../actions/menu';

const initialState = {
    items: [],
    keyPath: [],
    activeKey: ''
};

const buildAutoKeys = (items)=> {
    let _items = items.slice(0);
    // 自动生成key
    let number = 0;
    while (_items.length) {
        let item = _items.shift();
        item.key = item.key || 'menu' + (++number);

        if (item.children) {
            item.children.forEach((child)=> {
                child.parentKey = item.key;
                child.parent = item;
            });
            _items = _items.concat(item.children.slice(0));
        }
    }
    return items;
}

export default function menu(state = initialState, action = {}) {

    switch (action.type) {
        case '@@redux/INIT':
            return Object.assign({}, initialState, {items: buildAutoKeys(state.items)});
        case GET_ALL_MENU_SUCCESS:
            return Object.assign({}, state, {items: buildAutoKeys(action.payload.menus)});
        case UPDATE_NAVPATH:
            return Object.assign({}, state, {
                keyPath: action.payload.keyPath,
                activeKey: action.payload.activeKey
            });
        default:
            return state;
    }
}
