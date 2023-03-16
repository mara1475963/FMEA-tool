import React, { useEffect, useState } from "react";
import { Toast, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToastVisible } from "../store/user/user.action";

import "./toast.scss";
export default function ToastComponent() {
  const dispatch = useDispatch();
  const [showToast, setToast] = useState(false);
  const [nvm, setnvm] = useState(false);
  const show = useSelector((state) => state.user.showToast);
  console.log(show);

  useEffect(() => {
    nvm && setToast(true);
    setnvm(true);
  }, [show]);

  return (
    <div>
      <Toast
        onClose={() => setToast(false)}
        autohide
        show={showToast}
        delay={3000}
        position="top-end"
      >
        <Toast.Body>Link copied to clipboard!</Toast.Body>
      </Toast>
    </div>
  );
}
