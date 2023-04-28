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
  let name = "";

  if (nodes.header.type.name === "DFMEA") {
    switch (result.depth + 1) {
      case 1:
        name = "Focus Element";
        break;
      case 2:
        name = "Next Lower Level";
        break;
      default:
        name = "Structure " + (result.depth + 2);
        break;
    }
  } else if (nodes.header.type.name === "PFMEA") {
    switch (result.depth + 1) {
      case 1:
        name = "Process Step";
        break;
      case 2:
        name = "Process Work Element";
        break;
      default:
        name = "Structure " + (result.depth + 2);
        break;
    }
  }

  !result["children"]
    ? (result.children = [
        {
          id: newid,
          depth: result.depth + 1,
          name: name,
        },
      ])
    : result["children"].push({
        id: newid,
        depth: result.depth + 1,
        name: name,
      });
  return { ...nodes };
};

const deleteNode = (nodes, nodeID, depth) => {
  const [result] = findObject(nodes, "id", nodeID);

  if (result.functions) {
    for (let i = 0; i < result.functions.length; i++) {
      if (result.functions[i].failures) {
        result.functions[i].failures.forEach((f) => {
          deleteFailures(nodes, f.id, i);
        });
      }

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
      k.children = k.children.filter((v) => v.id !== nodeID);
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

  return { ...updateNode(nodes, { ...nodes }) };
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

const addFunction = (nodes, node, element, selectedFunction) => {
  const newId = getNewId();
  const value = element.newFunction.value;
  const newFunction = {
    id: newId,
    depth: node.depth,
    name: value,
  };

  //node
  if (node.depth === 0) {
    !nodes["functions"]
      ? (nodes.functions = [newFunction])
      : nodes["functions"].push(newFunction);
  } else {
    !node["functions"]
      ? (node.functions = [newFunction])
      : node["functions"].push(newFunction);
  }

  //in relation to lvl2Function
  if (node.depth !== 1) {
    const [result] = findObject(nodes, "id", selectedFunction.nodeId);

    result.functions?.forEach((f) => {
      if (f.id === selectedFunction.id) {
        !f["functions"]
          ? (f.functions = [newFunction])
          : f["functions"].push(newFunction);
      }
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

const deleteFunction = (nodes, node, id, fce_idx) => {
  const nodeFunction = node.functions[fce_idx];

  //delete function´s failures
  if (nodeFunction.failures) {
    nodeFunction.failures.forEach((f) => {
      deleteFailures(nodes, f.id, fce_idx);
    });
  }

  //delete functions in relation to lvl2Function
  if (nodeFunction.functions) {
    nodeFunction.functions.forEach((fce) => {
      nodes.functions = nodes.functions.filter((f) => fce.id !== f.id);
      nodes.children.forEach((child) => {
        child.children &&
          child.children.forEach((ch3) => {
            ch3.functions = ch3.functions.filter((f) => fce.id !== f.id);
          });
      });
    });
  }

  //node
  if (node.depth === 0) {
    nodes.functions = nodes.functions.filter((f) => f.id !== id);
  } else {
    node.functions = node.functions.filter((f) => f.id !== id);
  }

  //delete function from lvl2Function relation
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
      return { ...updateNode(nodes, { ...nodes }) };
    } else {
      return { ...updateNode(nodes, { ...node }) };
    }
  } else {
    return { ...updateNode(nodes, { ...node }) };
  }
};

const deleteFailure = (nodes, node, id, fce_idx) => {
  //node
  node.functions[fce_idx].failures = node.functions[fce_idx].failures.filter(
    (f) => f.id !== id
  );

  ////in relation to lvl2Failure
  if (node.depth !== 1) {
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

    if (node.depth === 0) {
      return { ...updateNode(nodes, { ...nodes }) };
    } else {
      return { ...updateNode(nodes, { ...node }) };
    }
  } else {
    return { ...updateNode(nodes, { ...node }) };
  }
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

export const addFunctionToNode = (nodes, node, element, selectedFunction) => {
  const newData = addFunction(nodes, node, element, selectedFunction);
  return createAction(FMEA_ACTION_TYPES.SET_FMEA_DATA, newData);
};

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

      type === "DFMEA"
        ? (data.name = "Next Higher Level")
        : (data.name = "Process Item System");

      dispatch(setHeaderData(headerData));
      dispatch(setMainData(data));
    } catch (error) {
      dispatch(fetchFMEAFailure(error));
    }
  };
};

export const deleteNodeFunction = (nodes, node, id, fidx) => {
  return async (dispatch) => {
    try {
      const newData = deleteFunction(nodes, node, id, fidx);
      dispatch(setMainData(newData));
    } catch (error) {
      dispatch(fetchFMEAFailure(error));
    }
  };
};

export const deleteNodeFailure = (nodes, node, id, fidx) => {
  return async (dispatch) => {
    try {
      const newData = deleteFailure(nodes, node, id, fidx);
      dispatch(setMainData(newData));
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
