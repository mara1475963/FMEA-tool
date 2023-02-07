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
import { updateNodeData } from "../../store/fmea/fmea.actions";
import { findObject, getNewId } from "../../helpers";

const ModalWindow = () => {
  const opened = useSelector((state) => state.modal.isOpen);
  const [open, setOpen] = useState(opened);

  const handleOpen = () => setOpen();
  const handleClose = () => {
    dispatch(updateNodeData(nodes, node));
    return setOpen(false);
  };
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.fmea.data);
  let nodeModal = useSelector((state) => state.modal.node);
  const [node, setNode] = useState(nodeModal);
  const [selectedFunction, setSelectedFunction] = useState([]);
  const [selectedFailure, setSelectedFailure] = useState([]);

  let failures = [];
  if (JSON.stringify(nodes) !== "{}") {
    nodes.children.forEach((child) => {
      if (child.functions) {
        failures.push(
          ...child.functions.reduce((acc, cur) => {
            if (cur.failures) {
              cur.failures.forEach((f) => {
                f["nodeID"] = child.id;
              });
            }
            if (cur.failures) {
              acc.push(...cur.failures);
            }
            return acc;
          }, [])
        );
      }
    });
  }

  let functions = [];
  if (JSON.stringify(nodes) !== "{}") {
    functions = nodes.children.reduce((acc, cur) => {
      if (cur.functions) {
        cur.functions = cur.functions.map((f) => {
          f["nodeID"] = cur.id;
          return f;
        });
        acc.push(...cur.functions);
      }
      return acc;
    }, []);
  }

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
        if (node.depth !== 1) {
          nodes.children.forEach((child) => {
            if (child.functions) {
              child.functions.forEach((fc) => {
                if (fc.functions) {
                  fc.functions.forEach((f) => {
                    if (f.id === node.functions[e.target.dataset.index].id) {
                      f.name = element.value;
                    }
                  });
                }
              });
            }
          });

          dispatch(updateNodeData(nodes, node));
        }
        if (node.depth === 0) {
          setNode({ ...nodes });
          dispatch(updateNodeData(nodes, { ...nodes }));
        }
        return;
      case "failure":
        const failure =
          node.functions[e.target.dataset.findex].failures[
            e.target.dataset.index
          ];
        failure.name = element.value;

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

          dispatch(updateNodeData(nodes, node));

          //result.functions && result.functions.push(newFunction);
        }

        if (node.depth === 0) {
          setNode({ ...nodes });
          dispatch(updateNodeData(nodes, { ...nodes }));
        }

        // failure
        // if (node.depth === 1) {
        //   failures = failures.map((f) => {
        //     if (f.id === failure.id) {
        //       f.name = element.value;
        //     }
        //     return f;
        //   });
        // } else {
        //   failures = failures.map((f) => {
        //     if (f.failures) {
        //       f.failures = f.failures.map((ff) => {
        //         if (ff.id === failure.id) {
        //           ff.name = element.value;
        //         }
        //         return ff;
        //       });
        //     }
        //     return f;
        //   });
        // }

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

    if (node.depth !== 1) {
      const [result] = findObject(nodes, "id", selectedFunction.nodeId);

      result.functions.forEach((f) => {
        if (f.id === selectedFunction.id) {
          !f["functions"]
            ? (f.functions = [newFunction])
            : f["functions"].push(newFunction);
        }
      });

      if (node.depth === 0) {
        !nodes["functions"]
          ? (nodes.functions = [newFunction])
          : nodes["functions"].push(newFunction);
        dispatch(updateNodeData(nodes, { ...result }));
        setNode({ ...nodes });
      } else {
        dispatch(updateNodeData(nodes, result));
      }
    } else {
      dispatch(updateNodeData(nodes, node));
      setNode({ ...node });
    }

    e.target.newFunction.value = "";
  };

  const addFailureHandler = (fid, value) => {
    const newid = getNewId();
    const newFailure = {
      id: newid,
      depth: node.depth,
      name: value,
    };

    !node["functions"][fid].failures
      ? (node["functions"][fid].failures = [newFailure])
      : node["functions"][fid].failures.push(newFailure);

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

      if (node.depth === 0) {
        !nodes["functions"][fid].failures
          ? (nodes["functions"][fid].failures = [newFailure])
          : nodes["functions"][fid].failures.push(newFailure);
        setNode({ ...nodes });
        dispatch(updateNodeData(nodes, { ...result }));
      } else {
        dispatch(updateNodeData(nodes, result));
      }
    } else {
      dispatch(updateNodeData(nodes, node));
      setNode({ ...node });
    }
  };

  const deleteFailureHandler = (id, fidx) => {
    //console.log(id, fidx, node);
    node.functions[fidx].failures = node.functions[fidx].failures.filter(
      (f) => f.id !== id
    );
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
        setNode({ ...nodes });
        dispatch(updateNodeData(nodes, { ...nodes }));
      } else {
        dispatch(updateNodeData(nodes, node));
      }
    } else {
      dispatch(updateNodeData(nodes, node));
      setNode({ ...node });
    }
  };

  const deleteFunctionHandler = (id, fidx) => {
    console.log(id, fidx);

    if (node.functions[fidx].failures) {
      node.functions[fidx].failures.forEach((f) => {
        deleteFailureHandler(f.id, fidx);
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
        nodes.functions = nodes.functions.filter((f) => f.id !== id);
        dispatch(updateNodeData(nodes, { ...nodes }));
        setNode({ ...nodes });
      } else {
        dispatch(updateNodeData(nodes, { ...node }));
      }
    } else {
      dispatch(updateNodeData(nodes, { ...node }));
      setNode({ ...node });
    }
    // setNode({ ...node });
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
