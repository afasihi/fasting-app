import types from "../types";

const initialState = {
  isFasting: false,
  isReady: false
};

export default timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FASTING:
      return {
        ...state,
        isFasting: !state.isFasting,
        id: action.id
      };
    case types.SET_READY:
      return {
        ...state,
        isReady: !state.isReady,
        id: action.id
      }
    case types.SET_ID:
      return {
        ...state,
        id: action.id
      }

    default:
      return state;
  }
};
