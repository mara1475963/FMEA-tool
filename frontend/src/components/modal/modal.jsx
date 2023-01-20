import React, { useState } from "react";
import "./modal.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { updateNodeData } from "../../store/fmea/fmea.actions";
import { getNewId } from "../../helpers";

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
        node.functions[e.target.dataset.index].name = element.value;
        return;
      case "failure":
        node.functions[e.target.dataset.findex].failures[
          e.target.dataset.index
        ].name = element.value;
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
    !node["functions"]
      ? (node.functions = [
          {
            id: newid,
            depth: node.depth,
            name: value,
          },
        ])
      : node["functions"].push({
          id: newid,
          depth: node.depth,
          name: value,
        });

    console.log(node);
    e.target.newFunction.value = "";
    setNode({ ...node });
  };

  const addFailureHandler = (fid, value) => {
    const newid = getNewId();
    console.log(fid);
    console.log(value);
    // const value = e.target.newFailure.value;
    // const fid = e.target.newFailure.dataset.findex;
    !node["functions"][fid].failures
      ? (node["functions"][fid].failures = [
          {
            id: newid,
            depth: node.depth,
            name: value,
          },
        ])
      : node["functions"][fid].failures.push({
          id: newid,
          depth: node.depth,
          name: value,
        });

    console.log(node);

    setNode({ ...node });
  };
  {
    /* <form id="saveForm" action="/post/dispatch/save" method="post"></form>
<form id="deleteForm" action="/post/dispatch/delete" method="post"></form>

<div id="toolbar">
    <input type="text" name="foo" form="saveForm" />
    <input type="hidden" value="some_id" form="deleteForm" />
    <input type="text" name="foo2" id="foo2" form="saveForm" value="success" />

    <input type="submit" name="save" value="Save" form="saveForm" onclick="alert(document.getElementById('deleteForm').elements.length + ' ' + document.getElementById('saveForm').elements.length + ' ' + document.getElementById('saveForm').elements['foo2'].value);return false;" />
    <input type="submit" name="delete" value="Delete" form="deleteForm" />
    <a href="/home/index">Cancel</a>
</div> */
  }
  return (
    node && (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <form id="failureForm" onSubmit={(e) => e.preventDefault()}></form>
          <form className="upload" onSubmit={(e) => e.preventDefault()}>
            <div className="upload__column">
              <div className="modal-header">
                <label>Process Item</label>
                <input
                  defaultValue={node.name}
                  type="text"
                  data-type="title"
                  onChange={onChangeHandler}
                />
              </div>
              <span>Functions</span>
              <ul className="node-functions">
                {node.functions &&
                  node.functions.map((f, f_idx) => {
                    return (
                      <div key={f.name}>
                        <li>
                          <input
                            defaultValue={f.name}
                            type="text"
                            data-type="function"
                            data-id={f.id}
                            data-index={f_idx}
                            onChange={onChangeHandler}
                          />
                        </li>
                        <span>Failures</span>

                        {f.failures &&
                          f.failures.map((e, e_idx) => (
                            <li className="modal-header" key={e.name}>
                              <input
                                defaultValue={e.name ? e.name : e}
                                type="text"
                                data-type="failure"
                                data-id={e.id}
                                data-findex={f_idx}
                                data-index={e_idx}
                                onChange={onChangeHandler}
                              />
                            </li>
                          ))}

                        <span>Add failure</span>
                        <div className="add-container">
                          <input
                            id="new-failure"
                            data-findex={f_idx}
                            defaultValue={""}
                            name="newFailure"
                            type="text"
                            data-type="failure"
                            form="failureForm"
                          />
                          <Button
                            type="submit"
                            variant="text"
                            form="failureForm"
                            onClick={(e) => {
                              const input = e.target.previousElementSibling;
                              addFailureHandler(
                                input.dataset.findex,
                                input.value
                              );
                              console.log(e.target.previousElementSibling);
                            }}
                          >
                            Add
                          </Button>
                        </div>

                        {/* <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={node.functions.map((fce) => {
                            return { label: fce.name, id: f_idx };
                          })}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="toFunction"
                              label="Function"
                            />
                          )}
                        /> */}
                        <span>---------------------------</span>
                      </div>
                    );
                  })}
              </ul>
            </div>
          </form>
          <form className="upload" onSubmit={addFunctionHandler}>
            <span>Add function</span>
            <div className="add-container">
              <input
                id="new-function"
                defaultValue={""}
                name="newFunction"
                type="text"
                data-type="failure"
              />
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
