import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./modal-account.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectInitialAPs } from "../../store/fmea/fmea.selectors";
import { setModalAccountIsOpen } from "../../store/modal/modal.actions";
import { Button, TextField } from "@mui/material";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import SignIn from "./sign-in/sign-in";
import SignUp from "./sign-up/sign-up";

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
