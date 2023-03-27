import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TreeView from "@mui/lab/TreeView";
import { Autocomplete } from "@mui/material";

import {
  CloseSquare,
  MinusSquare,
  PlusSquare,
  StyledTreeItem,
} from "../treeView/treeView";

import {
  addFailureToFunction,
  updateNodeAttributes,
  updateNodeData,
} from "../../store/fmea/fmea.actions";

import {
  selectFMEAData,
  selectMainFailures,
  selectMainFunctions,
} from "../../store/fmea/fmea.selectors";
import { findObject, getNewId } from "../../helpers";
import { mainSocket } from "../../socket";
import "./modal.scss";

const ModalWindow = () => {
  const dispatch = useDispatch();

  const nodes = useSelector(selectFMEAData);
  const functions = useSelector(selectMainFunctions);
  const failures = useSelector(selectMainFailures);
  const opened = useSelector((state) => state.modal.isOpen);
  const nodeModal = useSelector((state) => state.modal.node);

  const [open, setOpen] = useState(opened);
  const [node, setNode] = useState(nodeModal);
  const [selectedFunction, setSelectedFunction] = useState([]);
  const [selectedFailure, setSelectedFailure] = useState([]);
  const [socket, setSocket] = useState();

  useEffect(() => {
    setOpen(true);
    setNode(nodeModal);
  }, [opened, nodeModal]);

  useEffect(() => {
    setSocket(mainSocket);

    return () => {
      mainSocket.disconnect();
    };
  }, []);

  const handleClose = () => {
    dispatch(updateNodeData(nodes, node));
    return setOpen(false);
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const element = e.target;
    dispatch(updateNodeAttributes(nodes, node, element));
    socket && socket.emit("send-changes", nodes);
  };

  const addFunctionHandler = (e) => {
    e.preventDefault();

    const newid = getNewId();
    const value = e.target.newFunction.value;
    const newFunction = {
      id: newid,
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

      //main node
      if (node.depth === 0) {
        dispatch(updateNodeData(nodes, { ...result }));
        setNode({ ...nodes });
        socket && socket.emit("send-changes", nodes);
      } else {
        dispatch(updateNodeData(nodes, { ...result }));
        socket && socket.emit("send-changes", nodes);
      }
    } else {
      dispatch(updateNodeData(nodes, { ...node }));
      setNode({ ...node });
      socket && socket.emit("send-changes", nodes);
    }

    e.target.newFunction.value = "";
  };

  const addFailureHandler = (element) => {
    dispatch(addFailureToFunction(nodes, node, element, selectedFailure));
    if (node.depth === 0) {
      setNode({ ...nodes });
    }
    socket && socket.emit("send-changes", nodes);
  };

  const deleteFailureHandler = (id, fce_idx) => {
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
        dispatch(updateNodeData(nodes, { ...nodes }));
        setNode({ ...nodes });
        socket && socket.emit("send-changes", nodes);
      } else {
        dispatch(updateNodeData(nodes, { ...node }));
        socket && socket.emit("send-changes", nodes);
      }
    } else {
      dispatch(updateNodeData(nodes, { ...node }));
      setNode({ ...node });
      socket && socket.emit("send-changes", nodes);
    }
  };

  const deleteFunctionHandler = (id, fce_idx) => {
    const nodeFunction = node.functions[fce_idx];
    //delete function´s failures
    if (nodeFunction.failures) {
      nodeFunction.failures.forEach((f) => {
        deleteFailureHandler(f.id, fce_idx);
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
        dispatch(updateNodeData(nodes, { ...nodes }));
        setNode({ ...nodes });
        socket && socket.emit("send-changes", nodes);
      } else {
        dispatch(updateNodeData(nodes, { ...node }));
        socket && socket.emit("send-changes", nodes);
      }
    } else {
      dispatch(updateNodeData(nodes, { ...node }));
      setNode({ ...node });
      socket && socket.emit("send-changes", nodes);
    }
  };

  return (
    node && (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ width: 600 }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TextField
              defaultValue={node.name}
              onChange={onChangeHandler}
              size="normal"
              inputProps={{
                className: "form-input title",
                "data-type": "title",
              }}
              fullWidth
            />

            <div className="function-container">
              <TreeView
                aria-label="customized"
                defaultExpanded={["1"]}
                defaultCollapseIcon={<MinusSquare />}
                defaultExpandIcon={<PlusSquare />}
                defaultEndIcon={<CloseSquare />}
                sx={{
                  margin: 2,
                  //height: 264,
                  flexGrow: 1,
                  // maxWidth: 400,
                  maxHeight: 450,
                  overflowY: "auto",
                }}
              >
                <StyledTreeItem nodeId="1" label="Functions">
                  {node.functions &&
                    node.functions.map((f, f_idx) => {
                      return (
                        <div key={f.id}>
                          <div className="input-container">
                            <div style={{ color: "green" }}>Func</div>
                            <TextField
                              key={f.id}
                              defaultValue={f.name}
                              type="text"
                              size="small"
                              className="form-input"
                              onChange={onChangeHandler}
                              inputProps={{
                                "data-type": "function",
                                "data-id": f.id,
                                "data-index": f_idx,
                              }}
                            />
                            <Button
                              type="submit"
                              variant="text"
                              form="failureForm"
                              onClick={(event) => {
                                deleteFunctionHandler(f.id, f_idx);
                              }}
                            >
                              DEL
                            </Button>
                          </div>
                          <StyledTreeItem
                            nodeId={f.id.toString()}
                            label="Failures"
                          >
                            {f.failures &&
                              f.failures.map((e, e_idx) => (
                                <div className="input-container" key={e.id}>
                                  <div style={{ color: "red" }}>Fail</div>
                                  <TextField
                                    key={e.id}
                                    defaultValue={e.name ? e.name : e}
                                    type="text"
                                    size="small"
                                    inputProps={{
                                      "data-type": "failure",
                                      "data-id": e.id,
                                      "data-findex": f_idx,
                                      "data-index": e_idx,
                                    }}
                                    onChange={onChangeHandler}
                                  />
                                  <Button
                                    type="submit"
                                    variant="text"
                                    form="failureForm"
                                    onClick={(event) => {
                                      deleteFailureHandler(e.id, f_idx);
                                    }}
                                  >
                                    DEL
                                  </Button>
                                </div>
                              ))}
                          </StyledTreeItem>
                          <div className="add-container add-failure">
                            <TextField
                              id="new-failure"
                              size="small"
                              inputProps={{
                                "data-findex": f_idx,
                              }}
                              defaultValue={""}
                              name="newFailure"
                              type="text"
                              data-type="failure"
                              form="failureForm"
                            />

                            {node.depth !== 1 && (
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                name="toFunction2"
                                size="small"
                                data-fid={0}
                                isOptionEqualToValue={(option, value) =>
                                  option.id === value.id
                                }
                                onChange={(event, value) =>
                                  setSelectedFailure(value)
                                }
                                options={failures.map((f) => {
                                  return {
                                    label: f.name,
                                    id: f.id,
                                    nodeId: f.nodeID,
                                  };
                                })}
                                sx={{ width: 150 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    name="toFunction"
                                    label=""
                                    required
                                  />
                                )}
                              />
                            )}
                            <Button
                              type="submit"
                              variant="text"
                              onClick={(e) => {
                                e.preventDefault();
                                const input =
                                  e.target.parentElement.querySelector(
                                    "#new-failure"
                                  );

                                if (!input.value) {
                                  console.error("Value not seleceted");
                                  return;
                                }
                                addFailureHandler(input);
                                input.value = "";
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </StyledTreeItem>
              </TreeView>
            </div>
          </form>

          <form className="upload" onSubmit={addFunctionHandler}>
            <div className="add-container">
              <TextField
                id="new-function"
                size="small"
                defaultValue={""}
                name="newFunction"
                type="text"
                inputProps={{
                  "data-type": "function",
                }}
              />

              {node.depth !== 1 && (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name="toFunction2"
                  data-fid={0}
                  size="small"
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(event, value) => setSelectedFunction(value)}
                  options={functions.map((fce) => {
                    return { label: fce.name, id: fce.id, nodeId: fce.nodeID };
                  })}
                  sx={{ width: 150 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="toFunction"
                      label=""
                      required
                    />
                  )}
                />
              )}
              <Button type="submit" variant="text">
                Add
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    )
  );
};

export default ModalWindow;
