import { MODAL_ACTION_TYPES } from "./modal.types";

const INITIAL_STATE = {
  node: null,
  isOpen: false,
};

export const modalReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case MODAL_ACTION_TYPES.SET_MODAL_IS_OPEN:
      return { ...state, isOpen: payload };
    case MODAL_ACTION_TYPES.SET_MODAL_DATA:
      return { ...state, node: payload };
    default:
      return state;
  }
};
