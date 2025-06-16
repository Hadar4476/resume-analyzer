import { combineReducers } from "@reduxjs/toolkit";

import positions from "./reducers/positions";
import auth from "./reducers/auth";
import system from "./reducers/system";

const rootReducer = combineReducers({
  positions,
  auth,
  system,
});

export default rootReducer;
