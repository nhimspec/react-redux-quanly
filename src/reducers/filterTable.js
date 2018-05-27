import * as types from './../constants/ActionTypes';
var initState = {
    name: null,
    status: -1
};

var myReducer = (state = initState, action) => {
    switch (action.type) {
        case types.FILTER_TATBLE:
            return {
                name: action.filter.name,
                status: parseInt(action.filter.status, 10)
            }
        default:
            return state;
    }
}

export default myReducer;