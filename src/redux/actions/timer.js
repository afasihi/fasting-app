import types from "../types";

export const toggleFasting = (id) => ({
  type: types.SET_FASTING,
  id
});
export const toggleReady = (id) => ({
  type: types.SET_READY,
  id
});

export const setId = (id) => ({
  type: types.SET_ID,
  id
})
