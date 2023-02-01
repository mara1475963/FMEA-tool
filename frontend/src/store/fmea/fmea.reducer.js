import { FMEA_ACTION_TYPES } from "./fmea.types";

export const INITIAL_STATE = {
  header: {},
  data: {},
  lvl2Functions: [],
  lvl2Failures: [],
  isLoading: true,
  error: null,
};

export const fmeaReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FMEA_ACTION_TYPES.SET_FMEA_HEADER:
      return { ...state, header: payload };
    case FMEA_ACTION_TYPES.SET_FMEA_DATA:
      return { ...state, data: payload, isLoading: false };
    case FMEA_ACTION_TYPES.SET_LVL2_FUNCTIONS:
      return { ...state, lvl2Functions: payload };
    case FMEA_ACTION_TYPES.SET_LVL2_FAILURES:
      return { ...state, lvl2Failures: payload };
    case FMEA_ACTION_TYPES.FETCH_FMEA_START:
      return {
        ...state,
        isLoading: true,
      };
    case FMEA_ACTION_TYPES.FETCH_FMEA_SUCCESS:
      return { ...state, isLoading: false, data: payload };
    case FMEA_ACTION_TYPES.FETCH_FMEA_FAIL:
      return { ...state, isLoading: false, error: payload };

    default:
      return state;
  }
};
