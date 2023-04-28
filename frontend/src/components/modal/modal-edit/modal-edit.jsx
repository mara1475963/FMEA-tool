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
} from "../../treeView/treeView";

import "./modal-edit.scss";
import {
  addFailureToFunction,
  addFunctionToNode,
  deleteNodeFailure,
  deleteNodeFunction,
  updateNodeAttributes,
  updateNodeData,
} from "../../../store/fmea/fmea.actions";

import {
  selectFMEAData,
  selectMainFailures,
  selectMainFunctions,
} from "../../../store/fmea/fmea.selectors";
import { mainSocket } from "../../../socket";

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
    const element = e.target;
    dispatch(updateNodeAttributes(nodes, node, element));
    socket && socket.emit("send-changes", nodes);
  };

  const addFunctionHandler = (e) => {
    e.preventDefault();
    dispatch(addFunctionToNode(nodes, node, e.target, selectedFunction));
    if (node.depth === 0) {
      setNode({ ...nodes });
    }
    socket && socket.emit("send-changes", nodes);
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
    dispatch(deleteNodeFailure(nodes, node, id, fce_idx));
    if (node.depth === 0) {
      setNode({ ...nodes });
    }
    socket && socket.emit("send-changes", nodes);
  };

  const deleteFunctionHandler = (id, fce_idx) => {
    dispatch(deleteNodeFunction(nodes, node, id, fce_idx));
    if (node.depth === 0) {
      setNode({ ...nodes });
    }
    socket && socket.emit("send-changes", nodes);
  };

  return (
    node && (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ width: "60%" }}>
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
                  flexGrow: 1,
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
                              style={{ width: "100%" }}
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
                                    style={{ width: "100%" }}
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
                          {failures?.length === 0 && node.depth !== 1 ? (
                            <h6>You need to add Failure mode first.</h6>
                          ) : (
                            <div className="add-container add-failure">
                              <TextField
                                id="new-failure"
                                style={{ width: "60%" }}
                                size="small"
                                inputProps={{
                                  "data-findex": f_idx,
                                }}
                                defaultValue={""}
                                name="newFailure"
                                type="text"
                                data-type="failure"
                                form="failureForm"
                                placeholder="New Failure"
                              />
                              {node.depth !== 1 && (
                                <Autocomplete
                                  disablePortal
                                  style={{ width: "40%" }}
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
                                  options={failures?.map((f) => {
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
                          )}
                        </div>
                      );
                    })}
                </StyledTreeItem>
              </TreeView>
            </div>
          </form>
          {functions?.length === 0 && node.depth !== 1 ? (
            <h6>You need to add function on level 2 first.</h6>
          ) : (
            <form className="upload" onSubmit={addFunctionHandler}>
              <div className="add-container">
                <TextField
                  style={{ width: "60%" }}
                  id="new-function"
                  size="small"
                  defaultValue={""}
                  name="newFunction"
                  type="text"
                  placeholder="New Function"
                  inputProps={{
                    "data-type": "function",
                  }}
                />

                {node.depth !== 1 && (
                  <Autocomplete
                    disablePortal
                    style={{ width: "40%" }}
                    id="combo-box-demo"
                    name="toFunction2"
                    data-fid={0}
                    size="small"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, value) => setSelectedFunction(value)}
                    options={functions?.map((fce) => {
                      return {
                        label: fce.name,
                        id: fce.id,
                        nodeId: fce.nodeID,
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
                <Button type="submit" variant="text">
                  Add
                </Button>
              </div>
            </form>
          )}
        </Box>
      </Modal>
    )
  );
};

export default ModalWindow;
