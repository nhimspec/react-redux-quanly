import { createStore } from 'redux';
import { status, sort } from './actions';
import myReducer from './reducers';

const store = createStore(myReducer);

console.log(store.getState());

store.dispatch(status());

console.log(store.getState());

store.dispatch(sort({
    by: "name",
    value: -1
}));

console.log(store.getState());