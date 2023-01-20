import { FMEA_ACTION_TYPES } from "./fmea.types";
import { findObject, getNewId } from "../../helpers";
import { createAction } from "../../utils/reducer/reducer.utils";

import { structure1 as treeData } from "../../data/dataJS";

const addNode = (nodes, setToNodeId) => {
  const [result] = findObject(nodes, "id", setToNodeId);
  let newid = getNewId();

  !result["children"]
    ? (result.children = [
        {
          id: newid,
          depth: result.depth + 1,
          name: "Structure " + (result.depth + 2),
        },
      ])
    : result["children"].push({
        id: newid,
        depth: result.depth + 1,
        name: "Structure " + (result.depth + 2),
      });
  return nodes;
};

const deleteNode = (nodes, nodeID, depth) => {
  const [result] = findObject(nodes, "id", nodeID);

  let nodeObj = nodes;

  if (depth === 1) {
    nodeObj.children.splice(nodeObj.children.indexOf(result), 1);
  } else {
    nodeObj.children.forEach((k) => {
      if (!k.children) return;
      k.children = k.children.filter((v) => v.id !== nodeID);
    });
  }

  return nodes;
};

const updateNode = (nodes, node) => {
  if (node.depth === 0) {
    return node;
  }
  if (node.depth === 1) {
    for (let i = 0; i < nodes.children.length; i++) {
      if (nodes.children[i].id === node.id) {
        nodes.children[i] = node;
      }
    }
  }
  if (node.depth === 2) {
    nodes.children.forEach((child) => {
      if (child.children) {
        const childrens = child.children.map((ch) => {
          if (ch.id === node.id) return node;
          else {
            return ch;
          }
        });

        child.children = childrens;
      }
    });
  }

  //TODO - dalsi urovne krome top level
  return { ...nodes };
};

export const addNodeToData = (nodes, setToNodeId) => {
  const newData = addNode(nodes, setToNodeId);
  return createAction(FMEA_ACTION_TYPES.SET_FMEA_DATA, newData);
};
export const deleteNodeFromData = (nodes, nodeID, depth) => {
  const newData = deleteNode(nodes, nodeID, depth);
  return createAction(FMEA_ACTION_TYPES.SET_FMEA_DATA, newData);
};

export const updateNodeData = (nodes, updatedNode) => {
  const newData = updateNode(nodes, updatedNode);
  return createAction(FMEA_ACTION_TYPES.SET_FMEA_DATA, newData);
};

export const fetchFMEAStart = () =>
  createAction(FMEA_ACTION_TYPES.FETCH_FMEA_START);

export const fetchFMEASuccess = (data) =>
  createAction(FMEA_ACTION_TYPES.FETCH_FMEA_SUCCESS, data);

export const fetchFMEAFailure = (error) =>
  createAction(FMEA_ACTION_TYPES.FETCH_FMEA_FAIL, error);

export const fetchFMEAData = () =>
  createAction(FMEA_ACTION_TYPES.FETCH_FMEA_SUCCESS, treeData);

export const fetchFMEADataAsync = () => {
  return async (dispatch) => {
    dispatch(fetchFMEAStart());
    try {
      const fmeaData = treeData;
      dispatch(fetchFMEASuccess(fmeaData));
    } catch (error) {
      dispatch(fetchFMEAFailure(error));
    }
  };
};
