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

export const setModalSOD_IsOpen = (open) =>
  createAction(MODAL_ACTION_TYPES.SET_MODAL_SOD_IS_OPEN, open);

export const setModalSODtype = (data) => {
  return createAction(MODAL_ACTION_TYPES.SET_SOD_TYPE, data);
};

export const setModalSODobject = (object) => {
  return createAction(MODAL_ACTION_TYPES.SET_SOD_OBJECT, object);
};

export const setModalResultsIsOpen = (open) =>
  createAction(MODAL_ACTION_TYPES.SET_RESULTS_IS_OPEN, open);
export const setModalAccountIsOpen = (open) =>
  createAction(MODAL_ACTION_TYPES.SET_ACCOUNT_IS_OPEN, open);

export const setModalLoggingIsOpen = (open) =>
  createAction(MODAL_ACTION_TYPES.SET_LOGGING_IS_OPEN, open);

export const setModalSODSetupUpIsOpen = (open) =>
  createAction(MODAL_ACTION_TYPES.SET_SOD_SET_UP_IS_OPEN, open);
