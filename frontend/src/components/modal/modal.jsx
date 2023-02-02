import React, { useState } from "react";
import "./modal.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Autocomplete } from "@mui/material";
import {
  deleteNodeFailures,
  setMainFailures,
  setMainFunctions,
  updateNodeData,
} from "../../store/fmea/fmea.actions";
import { findObject, getNewId } from "../../helpers";

const ModalWindow = () => {
  const opened = useSelector((state) => state.modal.isOpen);
  const [open, setOpen] = useState(opened);

  const handleOpen = () => setOpen();
  const handleClose = () => {
    dispatch(updateNodeData(nodes, node));
    dispatch(setMainFunctions(functions));
    dispatch(setMainFailures(failures));
    return setOpen(false);
  };
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.fmea.data);
  let functions = useSelector((state) => state.fmea.lvl2Functions);
  let failures = useSelector((state) => state.fmea.lvl2Failures);
  let nodeModal = useSelector((state) => state.modal.node);
  const [node, setNode] = useState(nodeModal);
  const [selectedFunction, setSelectedFunction] = useState([]);
  const [selectedFailure, setSelectedFailure] = useState([]);

  //console.log("1", functions);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setOpen(true);
    setNode(nodeModal);
  }, [opened]);

  const onChangeHandler = (e) => {
    const element = e.target;

    switch (element.dataset.type) {
      case "function":
        //node
        node.functions[e.target.dataset.index].name = element.value;
        //function
        if (node.depth === 1) {
          functions = functions.map((f) => {
            if (f.id === node.functions[e.target.dataset.index].id) {
              f.name = element.value;
            }
            return f;
          });
        } else {
          functions = functions.map((f) => {
            if (f.functions) {
              f.functions = f.functions.map((fc) => {
                if (fc.id === node.functions[e.target.dataset.index].id) {
                  fc.name = element.value;
                }
                return fc;
              });
            }

            return f;
          });
        }

        return;
      case "failure":
        const failure =
          node.functions[e.target.dataset.findex].failures[
            e.target.dataset.index
          ];
        failure.name = element.value;

        // failure
        if (node.depth === 1) {
          failures = failures.map((f) => {
            if (f.id === failure.id) {
              f.name = element.value;
            }
            return f;
          });
        } else {
          failures = failures.map((f) => {
            if (f.failures) {
              f.failures = f.failures.map((ff) => {
                if (ff.id === failure.id) {
                  ff.name = element.value;
                }
                return ff;
              });
            }
            return f;
          });
        }

        return;
      case "title":
        node.name = element.value;
        return;
    }
    //node[element.name] = element.value;
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

    !node["functions"]
      ? (node.functions = [newFunction])
      : node["functions"].push(newFunction);

    if (node.depth === 1) {
      functions.push(newFunction);
      //console.log(functions);
      functions = functions.map((f) => f);
      dispatch(setMainFunctions(functions));
    } else {
      const [result] = functions.filter((f) => f.id === selectedFunction.id);
      !result["functions"]
        ? (result.functions = [newFunction])
        : result["functions"].push(newFunction);
      //console.log("functions", functions);
      functions = functions.map((f) => {
        if (selectedFunction.id === f.id) {
          return result;
        }
        return f;
      });

      //console.log("result", result);
      dispatch(setMainFunctions(functions));
    }

    e.target.newFunction.value = "";
    setNode({ ...node });
  };

  const addFailureHandler = (fid, value) => {
    const newid = getNewId();

    // console.log(fid);
    // console.log(value);
    // console.log(selectedFailure.id);
    // const value = e.target.newFailure.value;
    // const fid = e.target.newFailure.dataset.findex;
    const newFailure = {
      id: newid,
      depth: node.depth,
      name: value,
    };

    !node["functions"][fid].failures
      ? (node["functions"][fid].failures = [newFailure])
      : node["functions"][fid].failures.push(newFailure);

    if (node.depth === 1) {
      failures.push(newFailure);
      failures = failures.map((f) => f);
      dispatch(setMainFailures(failures));

      console.log(node["functions"][fid]);
      functions.forEach((func) => {
        if (func.id === node["functions"][fid].id) {
          func.failures.push(newFailure);
          console.log(func);
        }
        return func;
      });
      console.log(functions);
      dispatch(setMainFunctions(functions));
      //console.log(functions);
      // console.log(failures);
    } else {
      const [result] = failures.filter((f) => f.id === selectedFailure.id);
      !result["failures"]
        ? (result.failures = [newFailure])
        : result["failures"].push(newFailure);

      failures = failures.map((f) => {
        if (selectedFailure.id === f.id) {
          return result;
        }
        return f;
      });
      dispatch(setMainFailures(failures));

      functions.forEach((fc) => {
        if (fc.functions) {
          fc.functions.forEach((f) => {
            if (f.id === node["functions"][fid].id) {
              f.failures.push(newFailure);
            }
          });
        }
      });
      console.log(functions);
      dispatch(setMainFunctions(functions));
      //console.log(result);
    }
    //console.log(failures);
    setNode({ ...node });
  };

  const deleteFailureHandler = (id, fidx) => {
    //console.log(id, fidx, node);
    node.functions[fidx].failures = node.functions[fidx].failures.filter(
      (f) => f.id !== id
    );
    //console.log(failures);
    // if (node.depth === 1) {
    //   failures = failures.filter((f) => f.id !== id);
    // } else {
    //   failures = failures.map((fm) => {
    //     fm.failures = fm.failures.filter((f) => f.id !== id);
    //     return fm;
    //   });
    // }
    // console.log(failures);
    // dispatch(setMainFailures(failures));
    dispatch(deleteNodeFailures(node, failures, id, fidx));

    setNode({ ...node });
  };

  const deleteFunctionHandler = (id, fidx) => {
    console.log(id, fidx);

    if (node.depth === 1) {
      //delete failures first
      console.log(functions);
      functions.forEach((f) => {
        if (f.id === id) {
          if (f.failures) {
            f.failures.forEach((fa) => {
              deleteFailureHandler(fa.id, fidx);
            });
          }
        }
      });
      //delete function from list
      functions = functions.filter((f) => f.id !== id);
    } else {
      //delete failures first
      functions.forEach((fc) => {
        if (fc.functions) {
          fc.functions.forEach((f) => {
            if (f.id === node.functions[fidx].id) {
              if (f.failures) {
                f.failures.forEach((fail) => {
                  deleteFailureHandler(fail.id, fidx);
                });
              }
            }
          });
        }
      });

      functions = functions.map((fc) => {
        fc.functions = fc.functions.filter((f) => f.id !== id);
        return fc;
      });
    }
    node.functions = node.functions.filter((f) => f.id !== id);

    dispatch(setMainFunctions(functions));

    setNode({ ...node });
  };

  return (
    node && (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <form id="failureForm" onSubmit={(e) => e.preventDefault()}></form>
          <form>
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
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultExpanded={["1"]}
                sx={{
                  overflowY: "none",
                }}
              >
                <TreeItem nodeId="1" label="Functions">
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
                          <TreeItem nodeId={f.id.toString()} label="Failures">
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
                          </TreeItem>
                          <div className="add-container">
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
                              disabled={failures.length === 0}
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
                                  return { label: f.name, id: f.id };
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
                              form="failureForm"
                              onClick={(e) => {
                                const input =
                                  e.target.parentElement.querySelector(
                                    "#new-failure"
                                  );

                                addFailureHandler(
                                  input.dataset.findex,
                                  input.value
                                );
                                input.value = "";
                              }}
                              disabled={functions.length === 0}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </TreeItem>
              </TreeView>
            </div>
          </form>

          <form className="upload" onSubmit={addFunctionHandler}>
            <span>-----------------------</span>
            <br />
            <span>Add function</span>
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
                    return { label: fce.name, id: fce.id };
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
