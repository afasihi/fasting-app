import types from "../types";

export const setFast = (fastslist, id) => ({
  type: types.SET_FAST,
  fastslist,
  id
});

export const setTimer = timer => ({
  type: types.SET_TIMER,
  timer
});

export const setDuration = duration => ({
  type: types.SET_DURATION,
  duration
});

export const getTiming = time => ({
  type: types.GET_TIME,
  time
}) 