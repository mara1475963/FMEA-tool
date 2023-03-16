import { Button, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setModalAccountIsOpen } from "../../../store/modal/modal.actions";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../../utils/firebase/firebase.utils";

const SignIn = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const element = e.target;
    const email = element.email.value;
    const password = element.password.value;

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
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
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
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
        <div className="sing-in-buttons">
          <Button type="submit">Sign In</Button>
          <Button onClick={signInWithGoogle}>Sign In with Google</Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
