import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./modal-load.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalAnalysesIsOpen } from "../../store/modal/modal.actions";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { updateNodeData } from "../../store/fmea/fmea.actions";
import { selectFMEAData } from "../../store/fmea/fmea.selectors";
import { IconButton } from "@mui/material";
import { mainSocket } from "../../socket";

const ModalLoad = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModalAnalysesIsOpen(false));
    setOpen(false);
  };
  const nodes = useSelector(selectFMEAData);
  const opened = useSelector((state) => state.modal.analysesIsOpen);
  const data = useSelector((state) => state.modal.analyses);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [open, setOpen] = useState(opened);
  const [open2, setOpen2] = useState(true);
  const [analyses, setAnalyses] = useState(data);
  const [socket, setSocket] = useState();

  const handleClick = () => {
    setOpen2(!open2);
  };

  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  useEffect(() => {
    setAnalyses(data);
  }, [data]);

  useEffect(() => {
    setSocket(mainSocket);

    return () => {
      mainSocket.disconnect();
    };
  }, []);

  const handleLoad = (id, idx) => {
    console.log(id);
    dispatch(updateNodeData(nodes, { ...analyses[idx].data }));
    handleClose();
  };
  const deleteAnalysis = (e) => {
    socket.emit("delete-analysis", e.target.dataset.id);
    handleClose();
  };

  console.log(analyses);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ width: 600 }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="h2" id="nested-list-subheader">
              <i>{`${currentUser?.displayName}`}</i> analyses
            </ListSubheader>
          }
        >
          {analyses &&
            analyses.map((a, idx) => {
              return (
                <div key={a._id} style={{ display: "flex" }}>
                  <ListItemButton onClick={(e) => handleLoad(a._id, idx)}>
                    <ListItemIcon>
                      <span>
                        {a.data.header.type.name === "DFMEA"
                          ? "DFMEA"
                          : "PFMEA"}
                        :&nbsp;&nbsp;&nbsp;
                      </span>
                    </ListItemIcon>
                    <ListItemText primary={a.data.name} />
                  </ListItemButton>
                  <IconButton
                    aria-label="comment"
                    data-id={a.data.dbId}
                    onClick={deleteAnalysis}
                  >
                    x
                  </IconButton>
                </div>
              );
            })}

          {/* <ListItemButton onClick={handleClick}>
            <ListItemIcon>
            <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse> */}
        </List>
      </Box>
    </Modal>
  );
};

export default ModalLoad;
