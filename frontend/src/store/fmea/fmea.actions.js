import { FMEA_ACTION_TYPES } from "./fmea.types";
import { findObject, getNewId } from "../../helpers";
import { createAction } from "../../utils/reducer/reducer.utils";

import {
  dfmeaHeaders,
  header,
  pfmeaHeaders,
  structure1 as treeData,
} from "../../data/dataJS";

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
  return { ...nodes };
};

const deleteNode = (nodes, nodeID, depth) => {
  const [result] = findObject(nodes, "id", nodeID);
  if (result.functions) {
    for (let i = 0; i < result.functions.length; i++) {
      if (result.functions[i].failures) {
        result.functions[i].failures.forEach((f) => {
          nodes = deleteFailures(nodes, f.id, i);
        });
      }
      console.log(result.functions[i]);
      nodes.children.forEach((child) => {
        if (child.functions) {
          child.functions.forEach((fc) => {
            if (fc.functions) {
              fc.functions = fc.functions.filter(
                (f) => f.id !== result.functions[i].id
              );
            }
          });
        }
      });

      if (result.functions[i].functions) {
        result.functions[i].functions.forEach((fce) => {
          nodes.functions = nodes.functions.filter((f) => fce.id !== f.id);
          nodes.children.forEach((child) => {
            if (child.children) {
              child.children.forEach((ch3) => {
                if (ch3.functions) {
                  ch3.functions = ch3.functions.filter((f) => fce.id !== f.id);
                }
              });
            }
          });
        });
      }
    }
  }

  let nodeObj = nodes;

  if (depth === 1) {
    nodeObj.children.splice(nodeObj.children.indexOf(result), 1);
    if (nodeObj.children.length === 0) {
      nodeObj.children = null;
    }
  } else {
    nodeObj.children.forEach((k) => {
      if (!k.children) return;
      k.children = k.children.filter((v) => v.id != nodeID);
      if (k.children.length === 0) {
        k.children = null;
      }
    });
  }

  return { ...nodes };
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

  return { ...nodes };
};

const updateAttributes = (nodes, node, element) => {
  switch (element.dataset.type) {
    case "function":
      //node
      const fce = node.functions[element.dataset.index];
      fce.name = element.value;
      //in relation to lvl2 Function
      if (node.depth !== 1) {
        nodes.children.forEach((child) => {
          if (child.functions) {
            child.functions.forEach((fc) => {
              if (fc.functions) {
                fc.functions.forEach((f) => {
                  if (f.id === fce.id) {
                    f.name = element.value;
                  }
                });
              }
            });
          }
        });
        if (node.depth === 0) {
          return { ...updateNode(nodes, { ...nodes }) };
        }
      }
      return { ...updateNode(nodes, { ...node }) };

    case "failure":
      //node
      const failure =
        node.functions[element.dataset.findex].failures[element.dataset.index];
      failure.name = element.value;

      //in relation to lvl2 Failure
      if (node.depth !== 1) {
        nodes.children.forEach((child) => {
          if (child.functions) {
            child.functions.forEach((fce) => {
              fce.failures.forEach((fm) => {
                fm.failures.forEach((f) => {
                  if (f.id === failure.id) {
                    f.name = element.value;
                  }
                });
              });
            });
          }
        });
        if (node.depth === 0) {
          return { ...updateNode(nodes, { ...nodes }) };
        }
      }
      return { ...updateNode(nodes, { ...node }) };

    case "title":
      node.name = element.value;
      return { ...updateNode(nodes, { ...node }) };
    default:
      return;
  }
};

const addFailure = (nodes, node, element, selectedFailure) => {
  const fce_idx = element.dataset.findex;
  const value = element.value;

  const newid = getNewId();
  const newFailure = {
    id: newid,
    depth: node.depth,
    name: value,
  };

  //node
  if (node.depth === 0) {
    !nodes["functions"][fce_idx].failures
      ? (nodes["functions"][fce_idx].failures = [newFailure])
      : nodes["functions"][fce_idx].failures.push(newFailure);
  } else {
    const nodeFuntion = node["functions"][fce_idx];
    !nodeFuntion.failures
      ? (nodeFuntion.failures = [newFailure])
      : nodeFuntion.failures.push(newFailure);
  }

  //in relation to lvl2Failure
  if (node.depth !== 1) {
    const [result] = findObject(nodes, "id", selectedFailure.nodeId);

    result.functions.forEach((fc) => {
      fc.failures.forEach((f) => {
        if (f.id === selectedFailure.id) {
          !f["failures"]
            ? (f.failures = [newFailure])
            : f["failures"].push(newFailure);
        }
      });
    });
    return { ...updateNode(nodes, { ...result }) };
  } else {
    return { ...updateNode(nodes, { ...node }) };
  }
};

const deleteFailures = (nodes, id, fidx) => {
  nodes.children.forEach((child) => {
    if (child.functions) {
      child.functions.forEach((fc) => {
        if (fc.failures) {
          fc.failures.forEach((f) => {
            if (f.failures) {
              f.failures = f.failures.filter((f) => f.id !== id);
            }
          });
        }
      });
    }
  });
  return { ...nodes };
};

const deleteFunctions = (nodes, node, id, fidx) => {
  if (node.functions[fidx].failures) {
    node.functions[fidx].failures.forEach((f) => {
      deleteFailures(f.id, fidx);
    });
  }
  if (node.functions[fidx].functions) {
    node.functions[fidx].functions.forEach((fce) => {
      nodes.functions = nodes.functions.filter((f) => fce.id !== f.id);
      nodes.children.forEach((child) => {
        child.children.forEach((ch3) => {
          ch3.functions = ch3.functions.filter((f) => fce.id !== f.id);
        });
      });
    });
  }
  node.functions = node.functions.filter((f) => f.id !== id);
  if (node.depth !== 1) {
    nodes.children.forEach((child) => {
      if (child.functions) {
        child.functions.forEach((fc) => {
          if (fc.functions) {
            fc.functions = fc.functions.filter((f) => f.id !== id);
          }
        });
      }
    });

    if (node.depth === 0) {
      console.log(nodes);
      //dispatch(updateNodeData(nodes, { ...nodes }));
    } else {
      //dispatch(updateNodeData(nodes, { ...node }));
    }
  } else {
    //dispatch(updateNodeData(nodes, { ...node }));
  }
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

export const updateNodeAttributes = (nodes, node, element) => {
  const newData = updateAttributes(nodes, node, element);
  return createAction(FMEA_ACTION_TYPES.SET_FMEA_DATA, newData);
};

export const addFailureToFunction = (nodes, node, element, selectedFailure) => {
  const newData = addFailure(nodes, node, element, selectedFailure);
  return createAction(FMEA_ACTION_TYPES.SET_FMEA_DATA, newData);
};

export const fetchFMEAStart = () =>
  createAction(FMEA_ACTION_TYPES.FETCH_FMEA_START);

export const fetchFMEASuccess = (data) =>
  createAction(FMEA_ACTION_TYPES.FETCH_FMEA_SUCCESS, data);

export const fetchFMEAFailure = (error) =>
  createAction(FMEA_ACTION_TYPES.FETCH_FMEA_FAIL, error);

export const fetchFMEAData = (type) => {
  return async (dispatch) => {
    try {
      type === "DFMEA"
        ? (header.type = dfmeaHeaders)
        : (header.type = pfmeaHeaders);

      const data = JSON.parse(JSON.stringify(treeData));
      const headerData = JSON.parse(JSON.stringify(header));
      dispatch(setHeaderData(headerData));
      dispatch(setMainData(data));
    } catch (error) {
      dispatch(fetchFMEAFailure(error));
    }
  };
};

export const deleteNodeFunctions = (nodes, node, id, fidx) => {
  return async (dispatch) => {
    try {
      const nodes = deleteFunctions(nodes, node, id, fidx);
      dispatch(setMainData(nodes));
    } catch (error) {
      dispatch(fetchFMEAFailure(error));
    }
  };
};

export const setMainData = (data) =>
  createAction(FMEA_ACTION_TYPES.SET_FMEA_DATA, { ...data });

export const setHeaderData = (header) => {
  return createAction(FMEA_ACTION_TYPES.SET_FMEA_HEADER, header);
};

export const setSelectedNode = (node) => {
  return createAction(FMEA_ACTION_TYPES.SET_SELECTED_NODE, node);
};

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
