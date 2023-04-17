import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mainSocket } from "../../socket";
import { fetchFMEAData, updateNodeData } from "../../store/fmea/fmea.actions";
import {
  setModalAccountIsOpen,
  setModalAnalyses,
  setModalAnalysesIsOpen,
  setModalLoggingIsOpen,
  setModalResultsIsOpen,
  setModalSODSetupUpIsOpen,
} from "../../store/modal/modal.actions";
import { googleSignIn, setToastVisible } from "../../store/user/user.action";
import {
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import "./navigation.css";

import { TableToExcelReact } from "table-to-excel-react";
import { useDownloadExcel } from "table-to-excel-react";
import { Button } from "@mui/material";
import { checkImportFormat, getNewId } from "../../helpers";
import { exportComponentAsPNG } from "react-component-export-image";

const Navigation = ({ graphRef }) => {
  const ref = graphRef;
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const mainData = useSelector((state) => state.fmea.data);
  const opened = useSelector((state) => state.modal.analysesIsOpen);
  const opened2 = useSelector((state) => state.modal.resultsIsOpen);
  const opened3 = useSelector((state) => state.modal.accountIsOpen);
  const opened4 = useSelector((state) => state.modal.loggingIsOpen);
  const opened5 = useSelector((state) => state.modal.sodSetUpIsOpen);
  const currentUser = useSelector((state) => state.user.currentUser);
  const toast = useSelector((state) => state.user.showToast);

  //console.log(currentUser);

  const [socket, setSocket] = useState();
  const [data, setData] = useState(mainData);

  const FILENAME = data?.name?.replaceAll(" ", "_");

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      if (!checkImportFormat(importedData)) {
        console.log("wrong format");
        return;
      }

      console.log("good format");
      dispatch(updateNodeData(data, { ...importedData }));
      setData({ ...importedData });
    };
  };

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    dispatch(setToastVisible(!toast));
  }

  const createNewFMEA = (type) => {
    dispatch(fetchFMEAData(type));
    // navigate("/");
  };

  const saveAnalysis = () => {
    data["ownerId"] = currentUser.uid;
    data["dbId"] = getNewId();
    console.log(data);

    socket.emit("save-analysis", data);
  };

  const showResult = () => {
    dispatch(setModalResultsIsOpen(!opened2));
  };

  const showAccount = () => {
    dispatch(setModalAccountIsOpen(!opened3));
  };

  const showLogger = () => {
    dispatch(setModalLoggingIsOpen(!opened4));
  };

  const showSOD = () => {
    console.log(opened5);
    dispatch(setModalSODSetupUpIsOpen(!opened5));
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
    signOutUser();
  };

  const { onDownload } = useDownloadExcel({
    fileName: FILENAME,
    table: "table-to-xls",
    sheet: "sheet 1",
  });

  const exportDataJSON = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = FILENAME + ".json";

    link.click();
  };

  const exportToSVG = () => {
    const graph = document.querySelector(".hidden");

    graph.style.display = "block";
    exportComponentAsPNG(ref, { fileName: FILENAME });
    graph.style.display = "none";
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

                <li>
                  <a className="dropdown-item" href="#" onClick={copy}>
                    Share
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Export &raquo;
                  </a>
                  <ul className="dropdown-menu dropdown-submenu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={exportDataJSON}
                      >
                        {"Analysis Data => JSON"}
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={exportToSVG}
                      >
                        {"Structure => PNG"}
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={onDownload}
                      >
                        {"Table => Excel"}
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Import &raquo;
                  </a>
                  <ul className="dropdown-menu dropdown-submenu">
                    <li>
                      <a className="dropdown-item" href="#">
                        <Button
                          variant="text"
                          component="label"
                          style={{
                            color: "black",
                            textTransform: "none",
                            fontWeight: "300",
                          }}
                        >
                          {"Analysis Data <= JSON"}
                          <input type="file" onChange={handleChange} hidden />
                        </Button>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            {/* --------------------------- */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                Analysis
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      return showSOD();
                    }}
                  >
                    Set SOD
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      return showLogger();
                    }}
                  >
                    Logger
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      return showResult();
                    }}
                  >
                    Results
                  </a>
                </li>
              </ul>
            </li>
            {/* --------------------------- */}
            {currentUser && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  User
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
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
                      Existing
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
                </ul>
              </li>
            )}
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
                  onClick={showAccount}
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
