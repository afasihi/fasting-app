import types from "../types";

const initialState = {
  fast: [{
    id: "1",
    title: "Circadian Rhythm",
    hours: 13,
    description: "This fast starts at sunset and last to morning",
    instruction:
      "Based on the research of scientist DR. Satchin panda, this fast emulates the body's natural clock roughly after sunset to morning."
  }],
  duration: 0,
  timer: 0,
  time: 0
};

export default countdownReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FAST:
      return {
        ...state,
        fast: action.fastslist.filter(({ id }) => id === action.id)
      };
    case types.SET_TIMER:
      return {
        ...state,
        timer: action.timer
      };
    case types.SET_DURATION:
      return {
        ...state,
        duration: action.duration
      };
    case types.GET_TIME:
      return {
        ...state,
        time: action.time
      };

    default:
      return state;
  }
};
