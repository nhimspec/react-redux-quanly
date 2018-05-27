import * as types from './../constants/ActionTypes';
import _ from 'lodash';

var tasks = JSON.parse(localStorage.getItem('tasks'));

var initState = tasks ? tasks : [];

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var generateId = () => {
    return s4() + s4() + '-' + s4() + s4() + s4() + s4() + '-' + s4();
}

var myReducer = (state = initState, action) => {
    let index;
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status === 'true' ? true : false
            }
            if (!task.id) {
                task.id = generateId()
                state.push(task);
            } else {
                index = _.findIndex(tasks, (task) => task.id === action.task.id)
                state[index] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));

            return [...state];
        case types.UPDATE_STATUS_TASK:
            index = _.findIndex(tasks, (task) => task.id === action.taskId)
            state[index] = {
                ...state[index],
                status: !state[index].status
            };
            localStorage.setItem('tasks', JSON.stringify(state));

            return [...state];
        case types.DELETE_TASK:
            index = _.findIndex(tasks, (task) => task.id === action.taskId);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));

            return [...state];
        default:
            return state;
    }
}

export default myReducer;