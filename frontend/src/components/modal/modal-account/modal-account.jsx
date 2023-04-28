import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { setModalAccountIsOpen } from "../../../store/modal/modal.actions";
import SignIn from "./sign-in/sign-in";
import SignUp from "./sign-up/sign-up";
import "./modal-account.scss";

const ModalAccount = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setModalAccountIsOpen(false));
    setOpen(false);
  };

  const opened = useSelector((state) => state.modal.accountIsOpen);
  const [open, setOpen] = useState(opened);

  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ width: 900 }}>
        <div className="account-container">
          <SignIn />
          <SignUp />
        </div>
      </Box>
    </Modal>
  );
};

export default ModalAccount;
