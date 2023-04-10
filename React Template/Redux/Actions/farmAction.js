import { createAction } from '@reduxjs/toolkit';
console.log("action")
export const addData = createAction('ADD_DATA');
export const setFarm = (farm) => {
    return {
      type: 'SET_FARM',
      payload: farm
    }
  }