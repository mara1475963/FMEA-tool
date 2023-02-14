import { MODAL_ACTION_TYPES } from "./modal.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setModalData = (node) => {
  return createAction(MODAL_ACTION_TYPES.SET_MODAL_DATA, node);
};

export const setModalIsOpen = (open) =>
  createAction(MODAL_ACTION_TYPES.SET_MODAL_IS_OPEN, open);

export const setModalAnalysesIsOpen = (open) =>
  createAction(MODAL_ACTION_TYPES.SET_MODAL_ANALYSES_IS_OPEN, open);

export const setModalAnalyses = (data) => {
  return createAction(MODAL_ACTION_TYPES.SET_ANALYSES, data);
};
