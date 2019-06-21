import { createStore } from 'redux';
import { delTodo, addTodo, patchTodo } from './actions/todoActions';
import { ADD_ISSUE, DELETE_ISSUE, PATCH_ISSUE } from './constants/actionTypes';

function activityReducer(state = [], action) {
  switch (action.type) {
    case ADD_ISSUE:
      return addTodo();
    case DELETE_ISSUE:
      return delTodo();
    case PATCH_ISSUE:
      return patchTodo();
    default:
      return state;
  }
}

const Store = createStore(activityReducer, []);

export default Store;
