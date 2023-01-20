import { FMEA_ACTION_TYPES } from './fmea.types'

export const INITIAL_STATE = {
    data: {},
    isLoading:true,
    error:null
};

export const fmeaReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
        case FMEA_ACTION_TYPES.SET_FMEA_DATA:
        return { ...state, data: payload };
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
