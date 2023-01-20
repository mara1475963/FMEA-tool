import { combineReducers } from 'redux';
import { fmeaReducer } from './fmea/fmea.reducer';
import { modalReducer } from "./modal/modal.reducer";


export const rootReducer = combineReducers({
  fmea:fmeaReducer,
  modal: modalReducer,
});
