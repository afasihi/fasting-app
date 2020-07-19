/** @format */

import { combineReducers } from "redux";
import timerReducer from "./timer";
import countdownReducer from "./countdown";

export default combineReducers({
  timer: timerReducer,
  countdown: countdownReducer
});
