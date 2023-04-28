import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./modal-logging.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalLoggingIsOpen } from "../../../store/modal/modal.actions";
import { selectFMEAData } from "../../../store/fmea/fmea.selectors";
import { Button } from "@mui/material";
import { updateNodeData } from "../../../store/fmea/fmea.actions";

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

  const addLog = (e) => {
    e.preventDefault();
    const element = e.target;

    const newLog = {
      date: element.date.value,
      description: element.description.value,
      relatedDocuments: element.documents.value,
      updated: element.updated.checked,
    };

    !data["logs"] ? (data.logs = [newLog]) : data["logs"].push(newLog);
    dispatch(updateNodeData(data, { ...data }));
    element.date.value = "";
    element.description.value = "";
    element.documents.value = "";
    element.updated.checked = false;
  };

  const deleteLog = (e) => {
    e.preventDefault();
    const element = e.target;

    data.logs.splice(element.dataset.idx, 1);

    dispatch(updateNodeData(data, { ...data }));
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
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.logs?.map((log, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{log.date}</td>
                <td>{log.description}</td>
                <td>{log.relatedDocuments}</td>
                <td>{log.updated ? "Yes" : "No"}</td>
                <td
                  data-idx={idx}
                  style={{ cursor: "pointer" }}
                  onClick={deleteLog}
                >
                  X
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form className="uploadLog" onSubmit={addLog}>
          <div className="logg-container">
            <div>
              <label htmlFor={"date"}> Date</label>
              <br />
              <input name="date" type="date" required />
            </div>
            <div>
              <label htmlFor={"description"}> Description</label>
              <br />
              <textarea name="description" required></textarea>
            </div>
            <div>
              <label htmlFor={"description"}> Documents</label>
              <br />

              <input type="text" name="documents" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "20px 50px" }}>
              <input type="checkbox" name="updated" value="Updated?" />

              <label htmlFor={"updated"}> Updated?</label>
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
