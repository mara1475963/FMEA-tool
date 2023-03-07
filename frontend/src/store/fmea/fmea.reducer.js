import { FMEA_ACTION_TYPES } from "./fmea.types";

export const INITIAL_STATE = {
  header: {},
  data: null,
  isLoading: true,
  error: null,
  selectedNode: {},
};

export const fmeaReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FMEA_ACTION_TYPES.SET_FMEA_HEADER:
      return { ...state, header: payload };
    case FMEA_ACTION_TYPES.SET_FMEA_DATA:
      return { ...state, data: payload, isLoading: false };
    case FMEA_ACTION_TYPES.SET_SELECTED_NODE:
      return { ...state, selectedNode: payload };
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
