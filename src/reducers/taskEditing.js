import * as types from './../constants/ActionTypes';
var initState = {
    id: null,
    name: null,
    status: false
};

var myReducer = (state = initState, action) => {
    switch (action.type) {
        case types.EDIT_TASK:
            return action.task;
        default:
            return state;
    }
}

export default myReducer;