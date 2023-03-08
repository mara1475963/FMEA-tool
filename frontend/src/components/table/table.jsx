import React, { useEffect, useState } from "react";
import "./table.scss";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/spinner.component";
import parse from "html-react-parser";
//import ScrollContainer from "react-indiana-drag-scroll";
import { findObject } from "../../helpers";
import { updateNodeData } from "../../store/fmea/fmea.actions";
import { mainSocket } from "../../socket";
import {
  setModalSODobject,
  setModalSODtype,
  setModalSOD_IsOpen,
} from "../../store/modal/modal.actions";
import {
  selectFMEAData,
  selectFMEAHeader,
  selectFMEAIsLoading,
  selectMainFailures,
  selectNodeIDs,
} from "../../store/fmea/fmea.selectors";

const Table = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectFMEAIsLoading);
  const mainData = useSelector(selectFMEAData);
  const headerData = useSelector(selectFMEAHeader);
  const failures = useSelector(selectMainFailures);
  const selectedIDs = useSelector(selectNodeIDs);

  const opened = useSelector((state) => state.modal.sodIsOpen);

  const [header, setHeader] = useState(headerData);
  const [data, setData] = useState(null);
  const [socket, setSocket] = useState();

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
    setHeader({ ...headerData });
  }, [headerData]);

  const handler2 = (e) => {
    e.preventDefault();
    const element = e.nativeEvent.submitter;

    dispatch(setModalSODtype(element.id));
    dispatch(setModalSODobject(element));
    dispatch(setModalSOD_IsOpen(!opened));
  };

  const handler = (e) => {
    e.preventDefault();
    const element = e.target;
    let result = {};
    if (element.id === "initialSeverity") {
      data.children.forEach((child) => {
        child.functions.forEach((fce) => {
          fce.failures.forEach((f) => {
            if (f.id === +element.dataset.fmid) {
              f.initialSeverity = +element.value;
            }
          });
        });
      });

      dispatch(updateNodeData(data, { ...data }));
      setData({ ...data });
      socket && socket.emit("send-changes", { ...data });
    }
    const id =
      element.parentElement.parentElement.querySelector(
        "#failure-cause-id"
      ).value;

    [result] = findObject(data, "id", id);

    result[element.id] = element.value;

    if (
      element.id === "initialSeverity" ||
      element.id === "initialOccurance" ||
      element.id === "initialDetection" ||
      element.id === "finalSeverity" ||
      element.id === "finalOccurance" ||
      element.id === "finalDetection"
    ) {
      const S =
        element.parentElement.parentElement.querySelector("#initialSeverity");
      const O =
        element.parentElement.parentElement.querySelector("#initialOccurance");
      const D =
        element.parentElement.parentElement.querySelector("#initialDetection");
      const S2 =
        element.parentElement.parentElement.querySelector("#finalSeverity");
      const O2 =
        element.parentElement.parentElement.querySelector("#finalOccurance");
      const D2 =
        element.parentElement.parentElement.querySelector("#finalDetection");

      if (!S.value || !O.value || !D.value) {
      } else {
        const APproduct = S.value * O.value * D.value;
        // AP.innerHTML = APproduct;
        data.children.forEach((child) => {
          child.children.forEach((ch) => {
            ch.functions.forEach((fce) => {
              fce.failures.forEach((f) => {
                if (f.id === result.id) {
                  f["initialAP"] = APproduct;
                }
              });
            });
          });
        });
        data.children.forEach((child) => {
          child.functions.forEach((fce) => {
            fce.failures.forEach((f) => {
              f.failures &&
                f.failures.forEach((fc) => {
                  if (fc.id === result.id) {
                    fc["initialAP"] = APproduct;
                  }
                });
            });
          });
        });
        dispatch(updateNodeData(data, { ...data }));
        setData({ ...data });
      }
      if (!S2.value || !O2.value || !D2.value) {
      } else {
        const APproduct2 = S2.value * O2.value * D2.value;
        //AP2.innerHTML = APproduct2;
        data.children.forEach((child) => {
          child.children.forEach((ch) => {
            ch.functions.forEach((fce) => {
              fce.failures.forEach((f) => {
                if (f.id === result.id) {
                  f["finalAP"] = APproduct2;
                }
              });
            });
          });
        });
        data.children.forEach((child) => {
          child.functions.forEach((fce) => {
            fce.failures.forEach((f) => {
              f.failures &&
                f.failures.forEach((fc) => {
                  if (fc.id === result.id) {
                    fc["finalAP"] = APproduct2;
                  }
                });
            });
          });
        });
        dispatch(updateNodeData(data, { ...data }));
        setData({ ...data });
      }
    }
    data.children.forEach((child) => {
      child.children &&
        child.children.forEach((ch) => {
          ch.functions &&
            ch.functions.forEach((fce) => {
              fce.failures.forEach((f) => {
                if (f.id === result.id) {
                  f[element.id] = element.value;
                }
              });
            });
        });
    });
    data.children.forEach((child) => {
      child.functions &&
        child.functions.forEach((fce) => {
          fce.failures.forEach((f) => {
            f.failures &&
              f.failures.forEach((fc) => {
                if (fc.id === result.id) {
                  fc[element.id] = element.value;
                }
              });
          });
        });
    });

    dispatch(updateNodeData(data, { ...data }));
    setData({ ...data });
    socket && socket.emit("send-changes", data);
  };

  const isSelected = (id) => {
    return selectedIDs.includes(id);
  };

  // const test = (e) => {
  //   let el = document.querySelector("#" + e);
  //   if (e === "initialOccurance") {
  //     el = document.querySelector("#currentPreventionControl");
  //     return el?.value === "";
  //   }
  //   console.log(el);
  //   //console.log(el.parentElement.previousSibling.firstChild.value === "");
  //   return (
  //     el?.parentElement.previousSibling.firstChild.value === "" &&
  //     el?.parentElement.previousSibling.firstChild.innerHtml === ""
  //   );
  // };

  const generateFCform = (fc, initialSeverity) => {
    let initialAP = "";
    let finalAP = "";
    if (fc.initialAP && fc.initialAP <= 250) {
      initialAP = "L";
    } else if (fc.initialAP > 250 && fc.initialAP <= 500) {
      initialAP = "M";
    } else {
      initialAP = "H";
    }

    if (fc.finalAP && fc.finalAP <= 250) {
      finalAP = "L";
    } else if (fc.finalAP > 250 && fc.finalAP <= 500) {
      finalAP = "M";
    } else {
      finalAP = "H";
    }
    const FCform = `
    <td ><input id='failure-cause-id'  type='hidden' value='${
      fc.id
    }' /><input id='initialSeverity'   type='hidden' value='${initialSeverity}' />
    <input  id='currentPreventionControl' type='text' value='${
      fc.currentPreventionControl ? fc.currentPreventionControl : ""
    }' /></td>
    <td><button  id='initialOccurance' style='width:40px;background-color: transparent;
    border: none; '>${
      fc.initialOccurance ? fc.initialOccurance : "--"
    }</button></td>
    <td><input  id='currentDetectionControl' type='text' value='${
      fc.currentDetectionControl ? fc.currentDetectionControl : ""
    }'  /></td>
    <td><button id='initialDetection' style='width:40px;background-color: transparent;
    border: none;'/>${
      fc.initialDetection ? fc.initialDetection : "--"
    } </button></td>
    <td id='initialAP' style='color:black;' >${
      fc.initialAP ? fc.initialAP + "(" + initialAP + ")" : ""
    }</td>
    <td><input id='preventionAction' type='text' value='${
      fc.preventionAction ? fc.preventionAction : ""
    }' /></td>
    <td><input id='detectionAction' type='text' value='${
      fc.detectionAction ? fc.detectionAction : ""
    }' /></td>
    <td><input id='resposiblePersons' type='text' value='${
      fc.resposiblePersons ? fc.resposiblePersons : ""
    }' /></td>
    <td><input id='targetDate' type='date' value='${
      fc.targetDate ? fc.targetDate : ""
    }' /></td>
    <td><input id='status' type='text' style='width:50px;' value='${
      fc.status ? fc.status : ""
    }' /></td>
    <td><input id='actionTaken' type='text' value='${
      fc.actionTaken ? fc.actionTaken : ""
    }'  /></td>
    <td><input id='completionDate' type='date' value='${
      fc.completionDate ? fc.completionDate : ""
    }' /></td>
    <td><button id='finalSeverity'  style='width:40px;background-color: transparent;
    border: none;'>${fc.finalSeverity ? fc.finalSeverity : "--"} </button></td>
    <td><button id='finalOccurance' style='width:40px;background-color: transparent;
    border: none;'>${
      fc.finalOccurance ? fc.finalOccurance : "--"
    } </button></td>
    <td><button id='finalDetection' style='width:40px;background-color: transparent;
    border: none;'>${
      fc.finalDetection ? fc.finalDetection : "--"
    } </button></td>
    <td id='finalAP' style='color:black;'>${
      fc.finalAP ? fc.finalAP + "(" + finalAP + ")" : "--"
    }</td>
    `;

    return FCform;
  };

  const generateFailuresHTML = () => {
    let result = "";

    for (let lvl2F of failures) {
      if (!lvl2F.failures) {
        result += `<tr>
        <td></td>
        <td></td>
        <td class="${isSelected(lvl2F.id) ? "selected" : ""}">${lvl2F.name}</td>
        <td></td>
        </tr>`;
        continue;
      }
      const lvl1F = lvl2F.failures.filter((f) => f.depth === 0);
      const lvl3F = lvl2F.failures.filter((f) => f.depth === 2);
      //console.log("lvl1", lvl1F);
      //console.log("lvl3", lvl3F);

      let maxConnections = 0;

      if (lvl1F.length >= lvl3F.length) {
        maxConnections = lvl1F.length;
      }
      if (lvl1F.length < lvl3F.length) {
        maxConnections = lvl3F.length;
      }

      result += `<tr>
      <td class="${isSelected(lvl1F[0]?.id) ? "selected" : ""}">${
        lvl1F[0] ? lvl1F[0].name : ""
      }</td>
      <td rowSpan=${maxConnections}>
      <button name='initialSeverity' data-fmid=${
        lvl2F.id
      }  style='width:40px;  color:red;background-color: transparent;
      border: none;' id='initialSeverity' >${
        lvl2F.initialSeverity ? lvl2F.initialSeverity : "--"
      }</button>
      </td>
      <td class="${
        isSelected(lvl2F.id) ? "selected" : ""
      }" rowSpan=${maxConnections}>${lvl2F.name}</td>
      ${
        lvl3F[0]
          ? `<td class="${isSelected(lvl3F[0].id) ? "selected" : ""}">${
              lvl3F[0].name
            }</td>` + generateFCform(lvl3F[0], lvl2F.initialSeverity)
          : "<td></td>"
      }
    </tr>`;

      for (let i = 1; i < maxConnections; i++) {
        result += `<tr>
                    <td class="${isSelected(lvl1F[i]?.id) ? "selected" : ""}">${
          lvl1F[i] ? lvl1F[i].name : ""
        }</td>
                
                    ${
                      lvl3F[i]
                        ? `<td class="${
                            isSelected(lvl3F[i].id) ? "selected" : ""
                          }">${lvl3F[i].name}</td>` +
                          generateFCform(lvl3F[i], lvl2F.initialSeverity)
                        : "<td></td>"
                    }
                  </tr>`;
      }
      //console.log(result);
    }
    //console.log(result);
    return result;
  };

  return (
    <div className="table-container grid-item">
      {isLoading ? (
        <Spinner />
      ) : (
        JSON.stringify(data) !== "{}" && (
          <div className="scroll-container tables-container">
            <form onChange={handler} onSubmit={handler2}>
              <div id="table-to-xls-2">
                <table>
                  <thead>
                    <tr>
                      <th
                        colSpan={4}
                        style={{
                          textTransform: "uppercase",
                          backgroundColor: "whitesmoke",
                        }}
                        width={355}
                      >
                        Failure Analysis (Step 4)
                      </th>
                      <th
                        colSpan={5}
                        width={276}
                        style={{
                          textTransform: "uppercase",
                          backgroundColor: "whitesmoke",
                        }}
                      >
                        Risk Analysis (Step 5)
                      </th>
                      <th
                        colSpan={11}
                        width={685}
                        style={{
                          textTransform: "uppercase",
                          backgroundColor: "whitesmoke",
                        }}
                      >
                        OPTIMIZATION (Step 6)
                      </th>
                    </tr>
                  </thead>
                </table>
                {/* <ScrollContainer className="scroll-container"> */}
                <table>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#cacaca" }} width="140">
                        1. Failure Effects (FE) <br /> to the next higher level
                        and/or End User
                      </th>
                      <th
                        width="40"
                        style={{
                          writingMode: "vertical-rl",
                          backgroundColor: "#cacaca",
                        }}
                      >
                        Severity (S) <br /> of FE
                      </th>
                      <th width="180" style={{ backgroundColor: "#89e3f4" }}>
                        2. Failure Mode (FM) <br /> of the Focus Element
                      </th>
                      <th width="180" style={{ backgroundColor: "#fb92c7" }}>
                        {header.type?.name === "DFMEA"
                          ? parse(
                              `3. Failure Cause (FC) <br /> of the Next Lower Level Element or Characteristic`
                            )
                          : parse(
                              `3. Failure Cause (FC) <br /> of the Work Element`
                            )}
                      </th>

                      <th width="155" style={{ backgroundColor: "#e7e726" }}>
                        Current preventive control (PC) for FC
                      </th>
                      <th
                        width="40"
                        style={{
                          writingMode: "vertical-rl",
                          backgroundColor: "#e7e726",
                        }}
                      >
                        Occurence (O) <br /> of FC
                      </th>
                      <th width="155" style={{ backgroundColor: "#e7e726" }}>
                        Current detection control (DC) for FC or FM
                      </th>
                      <th
                        width="40"
                        style={{
                          writingMode: "vertical-rl",
                          backgroundColor: "#e7e726",
                        }}
                      >
                        Detection (D) <br /> of FC or FM
                      </th>
                      <th
                        width="30"
                        style={{
                          writingMode: "vertical-rl",
                          backgroundColor: "#e7e726",
                        }}
                      >
                        {header.type?.name === "DFMEA" ? "D" : "P"}FMEA AP
                      </th>

                      <th width="155" style={{ backgroundColor: "#50f424" }}>
                        {header.type?.name === "DFMEA" ? "D" : "P"}FMEA
                        Prevention Action
                      </th>
                      <th width="155" style={{ backgroundColor: "#50f424" }}>
                        {header.type?.name === "DFMEA" ? "D" : "P"}FMEA
                        Detection Action
                      </th>
                      <th width="155" style={{ backgroundColor: "#50f424" }}>
                        Responsible Persons Name
                      </th>
                      <th width="115" style={{ backgroundColor: "#50f424" }}>
                        Target Completion Date
                      </th>
                      <th width="50" style={{ backgroundColor: "#50f424" }}>
                        Status
                      </th>
                      <th width="155" style={{ backgroundColor: "#50f424" }}>
                        Action taken with Pointer to Evidence
                      </th>
                      <th width="115" style={{ backgroundColor: "#50f424" }}>
                        Completion Date
                      </th>
                      <th
                        width="40"
                        style={{
                          writingMode: "vertical-rl",
                          backgroundColor: "#50f424",
                        }}
                      >
                        Severity (S)
                      </th>
                      <th
                        width="40"
                        style={{
                          writingMode: "vertical-rl",
                          backgroundColor: "#50f424",
                        }}
                      >
                        Occurence (O)
                      </th>
                      <th
                        width="40"
                        style={{
                          writingMode: "vertical-rl",
                          backgroundColor: "#50f424",
                        }}
                      >
                        Detection (D)
                      </th>
                      <th
                        width="20"
                        style={{
                          writingMode: "vertical-rl",
                          backgroundColor: "#50f424",
                        }}
                      >
                        {header.type?.name === "DFMEA" ? "D" : "P"}FMEA AP
                      </th>
                    </tr>
                  </thead>
                  {/* </ScrollContainer> */}

                  <tbody
                    className="table-form-controls"
                    style={{ color: "red " }}
                  >
                    {parse(generateFailuresHTML())}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        )
      )}
    </div>
  );
};

export default Table;
