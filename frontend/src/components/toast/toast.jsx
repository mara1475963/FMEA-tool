import React, { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "./toast.scss";
import { setToastVisible } from "../../store/user/user.action";
export default function ToastComponent() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.user.showToast);
  const [showToast, setShowToast] = useState(show);

  useEffect(() => {
    setShowToast(show);
  }, [show]);

  return (
    <div>
      <Toast
        onClose={() => {
          setShowToast(false);
          dispatch(setToastVisible(false));
        }}
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
