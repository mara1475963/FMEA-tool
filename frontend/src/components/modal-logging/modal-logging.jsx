import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./modal-logging.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalLoggingIsOpen,
  setModalResultsIsOpen,
} from "../../store/modal/modal.actions";
import { selectFMEAData } from "../../store/fmea/fmea.selectors";
import { Button, TextField } from "@mui/material";
import { updateNodeData } from "../../store/fmea/fmea.actions";

const ModalLogger = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModalLoggingIsOpen(false));
    setOpen(false);
  };
  const data = useSelector(selectFMEAData);
  const opened = useSelector((state) => state.modal.loggingIsOpen);

  const [open, setOpen] = useState(opened);

  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  console.log(data);

  const addLog = (e) => {
    e.preventDefault();
    const element = e.target;
    console.log(e.target.date.value);
    const newLog = {
      date: element.date.value,
      description: element.description.value,
      relatedDocuments: element.documents.value,
      updated: element.updated.checked,
    };

    !data["logs"] ? (data.logs = [newLog]) : data["logs"].push(newLog);
    dispatch(updateNodeData(data, { ...data }));
    console.log(data);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ width: 700 }}>
        <table className="logger-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Change Date</th>
              <th>Description</th>
              <th>Related Documents</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {data?.logs?.map((log, idx) => {
              return (
                <tr>
                  <td>{idx + 1}</td>
                  <td>{log.date}</td>
                  <td>{log.description}</td>
                  <td>{log.relatedDocuments}</td>
                  <td>{log.updated ? "X" : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <form className="uploadLog" onSubmit={addLog}>
          <div className="logg-container">
            <div>
              <label for="date"> Date</label>
              <br />
              <input name="date" type="date" required />
            </div>
            <div>
              <label for="description"> Description</label>
              <br />
              <textarea name="description" required></textarea>
            </div>
            {/* <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              variant="standard"
              required 
            />*/}
            {/* <input name="documents" type="text" /> */}
            <TextField label="Documents" type="text" name="documents" />
            <div>
              <input type="checkbox" name="updated" value="Updated?" />
              <label for="updated"> Updated?</label>
            </div>
            <Button type="submit" variant="text">
              Add
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalLogger;
