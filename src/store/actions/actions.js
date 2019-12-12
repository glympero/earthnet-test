import * as types from '../types';

export const setAction = (payload) => ({
  type: types.ACTIONS,
  payload
});

export const fetchData = (data) => {
  return dispatch => {
    fetch(`http://localhost:8000/${data}`)
    .then(res => res.json())
      .then(res => {
        if (data === 'wells') dispatch(setWells(res));
        if (data === 'logs') dispatch(setLogs(res));
        if (data === 'formations') dispatch(setFormations(res));
        if (data === 'plots') dispatch(setPlots(res));
      })
      .catch(error => {
      })
  };
}

export const fetchSelectedPlots = (data) => {
  let params = `?wellId=${data.join('&wellId=')}`;

  return dispatch => {
    fetch(`http://localhost:8000/plots${params}`)
      .then(res => res.json())
      .then(res => {
        dispatch(setSelectedPlots(res));
      })
      .catch(error => {
      })
  };
}

const setWells = (payload) => ({
  type: types.SET_WELLS,
  payload
});

const setLogs = (payload) => ({
  type: types.SET_LOGS,
  payload
});

const setFormations = (payload) => ({
  type: types.SET_FORMATIONS,
  payload
});

export const setPlots = (payload) => ({
  type: types.SET_PLOTS,
  payload
});

const setSelectedPlots = (payload) => ({
  type: types.SET_SELECTED_PLOTS,
  payload
});

export const setSelectedWells = (payload) => ({
  type: types.SET_SELECTED_WELLS,
  payload
});

export const setSelectedLogs = (payload) => ({
  type: types.SET_SELECTED_LOGS,
  payload
});

export const setSelectedFormations = (payload) => ({
  type: types.SET_SELECTED_FORMATIONS,
  payload
});

