import { Button, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setModalAccountIsOpen } from "../../../store/modal/modal.actions";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  setDisplayName,
} from "../../../utils/firebase/firebase.utils";
import "./sign-up.scss";

const SignUp = () => {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const element = e.target;
    const displayName = element.displayName.value;
    const email = element.email.value;
    const password = element.password.value;
    const confirmPassword = element.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    console.log(e.target.confirmPassword.value);

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await setDisplayName(user, displayName);
      console.log(user);
      dispatch(setModalAccountIsOpen(false));

      //await createUserDocumentFromAuth(user, { displayName });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <div className="sing-up-container">
      <h2>Sign Up </h2>
      <form onSubmit={handleSubmit}>
        <div className="sign-up-inputs">
          <TextField
            label="Display Name"
            type="text"
            required
            name="displayName"
          />

          <TextField label="Email" type="email" required name="email" />

          <TextField
            label="Password"
            type="password"
            required
            name="password"
          />

          <TextField
            label="Confirm Password"
            type="password"
            required
            name="confirmPassword"
          />
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
