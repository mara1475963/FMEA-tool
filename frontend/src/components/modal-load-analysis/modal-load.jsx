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
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { updateNodeData } from "../../store/fmea/fmea.actions";
import { selectFMEAData } from "../../store/fmea/fmea.selectors";

const ModalLoad = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModalAnalysesIsOpen(false));
    setOpen(false);
  };
  const nodes = useSelector(selectFMEAData);
  const opened = useSelector((state) => state.modal.analysesIsOpen);
  const data = useSelector((state) => state.modal.analyses);

  const [open, setOpen] = useState(opened);
  const [open2, setOpen2] = useState(true);
  const [analyses, setAnalyses] = useState(data);

  const handleClick = () => {
    setOpen2(!open2);
  };

  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  useEffect(() => {
    setAnalyses(data);
  }, [data]);

  const handleLoad = (id, idx) => {
    console.log(id);
    dispatch(updateNodeData(nodes, { ...analyses[idx].data }));
    handleClose();
  };

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
            <ListSubheader component="div" id="nested-list-subheader">
              Avaible analyses
            </ListSubheader>
          }
        >
          {analyses &&
            analyses.map((a, idx) => {
              return (
                <ListItemButton
                  onClick={(e) => handleLoad(a._id, idx)}
                  key={a._id}
                >
                  <ListItemIcon>
                    <span>D</span>
                  </ListItemIcon>
                  <ListItemText primary={a._id.slice(0, 5)} />
                </ListItemButton>
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
