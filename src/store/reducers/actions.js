import * as types from '../types';

const INITIAL_STATE = {
  wells: [],
  logs: [],
  formations: [],
  plots: [],
  selectedWellOptions: [],
  selectedLogOptions: [],
  selectedFormationOptions: []
};

const setAction = (state, {payload}) => ({
  ...state,
  payload
});

const actionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ACTIONS:
      return setAction(state, action);
    case types.SET_WELLS:
      return {
        ...state,
        wells: action.payload
      };
    case types.SET_LOGS:
      return {
        ...state,
        logs: action.payload
      };
    case types.SET_FORMATIONS:
      return {
        ...state,
        formations: action.payload
      };
    case types.SET_PLOTS:
      return {
        ...state,
        plots: action.payload
      };
    case types.SET_SELECTED_WELLS:
      return {
        ...state,
        selectedWellOptions: action.payload
      };
    case types.SET_SELECTED_LOGS:
      return {
        ...state,
        selectedLogOptions: action.payload
      };
    case types.SET_SELECTED_FORMATIONS:
      return {
        ...state,
        selectedFormationOptions: action.payload
      };
    default:
      return state;
  }
};

export default actionsReducer;
