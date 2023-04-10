import { createReducer } from '@reduxjs/toolkit';
import { addData } from '../Actions/farmAction.js';

const initialState = {};

const dataReducer = createReducer(initialState, {
  [addData]: (state, action) => {
    console.log("reducer")
    return action.payload;
  },
});

export default dataReducer;