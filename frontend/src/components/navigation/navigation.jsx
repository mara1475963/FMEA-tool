import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mainSocket } from "../../socket";
import { fetchFMEAData } from "../../store/fmea/fmea.actions";
import {
  setModalAnalyses,
  setModalAnalysesIsOpen,
} from "../../store/modal/modal.actions";
import { googleSignIn } from "../../store/user/user.action";
import {
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import "./navigation.css";

const Navigation = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const mainData = useSelector((state) => state.fmea.data);
  const opened = useSelector((state) => state.modal.analysesIsOpen);
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log(currentUser);

  const [socket, setSocket] = useState();
  const [data, setData] = useState(mainData);

  const createNewFMEA = (type) => {
    dispatch(fetchFMEAData(type));
    // navigate("/");
  };

  const saveAnalysis = () => {
    data["ownerId"] = currentUser.uid;
    console.log(data);

    socket.emit("save-analysis", data);
  };
  const updateAnalysis = () => {
    data["ownerId"] = currentUser.uid;
    console.log(data);
    socket.emit("update-analysis", data);
  };

  const uploadAnalysis = () => {
    dispatch(setModalAnalysesIsOpen(!opened));
    socket.emit("load-analyses", currentUser.uid);
  };

  const signOut = () => {
    dispatch(fetchFMEAData(data.header.type.name));
    signOutUser();
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  useEffect(() => {
    setSocket(mainSocket);

    return () => {
      mainSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    setData({ ...mainData });
  }, [mainData]);

  useEffect(() => {
    if (socket == null) return;
    const handler = (analyses) => {
      dispatch(setModalAnalyses(analyses));
    };

    socket.on("receive-analyses", handler);
    return () => {
      socket.off("receive-analyses", handler);
    };
  }, [socket]);

  return (
    <div className="navigation grid-item">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ height: 30 }}
      >
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                File
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    New FMEA &raquo;
                  </a>
                  <ul className="dropdown-menu dropdown-submenu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => createNewFMEA("DFMEA")}
                      >
                        DFMEA
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => createNewFMEA("PFMEA")}
                      >
                        PFMEA
                      </a>
                    </li>
                  </ul>
                </li>
                {currentUser && (
                  <>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => saveAnalysis()}
                      >
                        Save New
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => updateAnalysis()}
                      >
                        Save
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();

                          return uploadAnalysis();
                        }}
                      >
                        Load
                      </a>
                    </li>
                  </>
                )}

                <li>
                  <a className="dropdown-item" href="#">
                    About
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#" style={{ cursor: "auto" }}>
                    Welcome {currentUser.displayName}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    onClick={signOut}
                  >
                    Sign Out
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  onClick={signInWithGoogle}
                >
                  Sign In
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
