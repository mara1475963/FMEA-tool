import React from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";

import { setModalAccountIsOpen } from "../../../../store/modal/modal.actions";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../../../utils/firebase/firebase.utils";
import "./sign-in.scss";

const SignIn = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const element = e.target;
    const email = element.email.value;
    const password = element.password.value;

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      dispatch(setModalAccountIsOpen(false));
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    dispatch(setModalAccountIsOpen(false));
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <div className="sign-in-inputs">
          <TextField label="Email" type="email" required name="email" />

          <TextField
            label="Password"
            type="password"
            required
            name="password"
          />
        </div>
        <div className="sing-in-buttons" style={{ display: "flex" }}>
          <Button type="submit">Sign In</Button>
          <Button onClick={signInWithGoogle}>Sign In with Google</Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
