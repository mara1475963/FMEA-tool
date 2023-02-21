import { MODAL_ACTION_TYPES } from "./modal.types";

const INITIAL_STATE = {
  node: null,
  isOpen: false,
  analyses: null,
  analysesIsOpen: false,
  SODtype: null,
  sodIsOpen: false,
  SODobject: null,
};

export const modalReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case MODAL_ACTION_TYPES.SET_MODAL_IS_OPEN:
      return { ...state, isOpen: payload };
    case MODAL_ACTION_TYPES.SET_MODAL_DATA:
      return { ...state, node: payload };
    case MODAL_ACTION_TYPES.SET_MODAL_ANALYSES_IS_OPEN:
      return { ...state, analysesIsOpen: payload };
    case MODAL_ACTION_TYPES.SET_ANALYSES:
      return { ...state, analyses: payload };
    case MODAL_ACTION_TYPES.SET_MODAL_SOD_IS_OPEN:
      return { ...state, sodIsOpen: payload };
    case MODAL_ACTION_TYPES.SET_SOD_TYPE:
      return { ...state, SODtype: payload };
    case MODAL_ACTION_TYPES.SET_SOD_OBJECT:
      return { ...state, SODobject: payload };
    default:
      return state;
  }
};
