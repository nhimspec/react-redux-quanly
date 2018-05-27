import * as types from './../constants/ActionTypes';

export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
}

export const saveTask = (task) => {
    return {
        type: types.SAVE_TASK,
        task
    }
}

export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM
    }
}

export const openForm = () => {
    return {
        type: types.OPEN_FORM
    }
}

export const closeForm = () => {
    return {
        type: types.CLOSE_FORM
    }
}

export const updateStatus = (taskId) => {
    return {
        type: types.UPDATE_STATUS_TASK,
        taskId
    }
}

export const deleteTask = (taskId) => {
    return {
        type: types.DELETE_TASK,
        taskId
    }
}

export const editTask = (task) => {
    return {
        type: types.EDIT_TASK,
        task
    }
}

export const filterTask = (filter) => {
    return {
        type: types.FILTER_TATBLE,
        filter
    }
}

export const searchTask = (keyword) => {
    return {
        type: types.SEARCH,
        keyword
    }
}

export const sortTask = (sort) => {
    return {
        type: types.SORT,
        sort
    }
}