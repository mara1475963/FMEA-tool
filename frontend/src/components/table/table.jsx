import React, { useEffect, useState } from "react";
import "./table.scss";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/spinner.component";
import parse from "html-react-parser";
//import ScrollContainer from "react-indiana-drag-scroll";
import { findObject } from "../../helpers";
import { updateNodeData } from "../../store/fmea/fmea.actions";

const Table = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fmea.data);
  const isLoading = useSelector((state) => state.fmea.isLoading);
  const headerData = useSelector((state) => state.fmea.header);

  let failures = [];
  if (JSON.stringify(data) !== "{}") {
    data.children.forEach((child) => {
      if (child.functions) {
        failures.push(
          ...child.functions.reduce((acc, cur) => {
            if (cur.failures) {
              cur.failures.forEach((f) => {
                f["nodeID"] = child.id;
              });

              acc.push(...cur.failures);
            }
            return acc;
          }, [])
        );
      }
    });
  }

  const [header, setHeader] = useState(headerData);
  const [treeData, setTreeData] = useState(data);

  useEffect(() => {
    setTreeData({ ...data });
  }, [data]);

  useEffect(() => {
    setHeader({ ...headerData });
  }, [headerData]);

  const handler = (e) => {
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
      const AP =
        element.parentElement.parentElement.querySelector("#initialAP");
      const AP2 = element.parentElement.parentElement.querySelector("#finalAP");

      if (!S.value || !O.value || !D.value) {
        AP.innerHTML = "--";
      } else {
        const APproduct = S.value * O.value * D.value;
        AP.innerHTML = APproduct;
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
      }
      if (!S2.value || !O2.value || !D2.value) {
        AP2.innerHTML = "--";
      } else {
        const APproduct2 = S2.value * O2.value * D2.value;
        AP2.innerHTML = APproduct2;
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
      }
    }
    data.children.forEach((child) => {
      child.children.forEach((ch) => {
        ch.functions.forEach((fce) => {
          fce.failures.forEach((f) => {
            if (f.id === result.id) {
              f[element.id] = element.value;
            }
          });
        });
      });
    });

    console.log(data);
    dispatch(updateNodeData(data, { ...data }));
  };

  const generateFCform = (fc, initialSeverity) => {
    const FCform = `
    <td ><input id='failure-cause-id'  type='hidden' value='${
      fc.id
    }' /><input id='initialSeverity'   type='hidden' value='${initialSeverity}' />
    <input id='currentPreventionControl' type='text' value='${
      fc.currentPreventionControl ? fc.currentPreventionControl : ""
    }' /></td>
    <td><input id='initialOccurance' min='1' max='10' type='number' value='${
      fc.initialOccurance ? fc.initialOccurance : ""
    }'   style='width:40px'/></td>
    <td><input id='currentDetectionControl' type='text' value='${
      fc.currentDetectionControl ? fc.currentDetectionControl : ""
    }'  /></td>
    <td><input id='initialDetection' min='1' max='10' type='number' value='${
      fc.initialDetection ? fc.initialDetection : ""
    }'   style='width:40px'/></td>
    <td id='initialAP' value='${
      fc.initialAP ? fc.initialAP : ""
    }' style='color:black;' ></td>
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
    <td><input id='status' type='text' value='${
      fc.status ? fc.status : ""
    }' /></td>
    <td><input id='actionTaken' type='text' value='${
      fc.actionTaken ? fc.actionTaken : ""
    }'  /></td>
    <td><input id='completionDate' type='date' value='${
      fc.completionDate ? fc.completionDate : ""
    }' /></td>
    <td><input id='finalSeverity' min='1' max='10' type='number' value='${
      fc.finalSeverity ? fc.finalSeverity : ""
    }'  style='width:40px'/></td>
    <td><input id='finalOccurance' min='1' max='10' type='number' value='${
      fc.finalOccurance ? fc.finalOccurance : ""
    }'  style='width:40px'/></td>
    <td><input id='finalDetection' min='1' max='10' type='number' value='${
      fc.finalDetection ? fc.finalDetection : ""
    }'  style='width:40px'/></td>
    <td id='finalAP' value='${
      fc.finalAP ? fc.finalAP : ""
    }' style='color:black;'>--</td>
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
        <td>${lvl2F.name}</td>
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
      <td>${lvl1F[0] ? lvl1F[0].name : ""}</td>
      <td rowSpan=${maxConnections}>
      <input name='initialSeverity' data-fmid=${
        lvl2F.id
      } name= min='1' max='10' type='number'  style='width:40px; color:red;' id='initialSeverity' value=${
        lvl2F.initialSeverity
      }  />
      </td>
      <td rowSpan=${maxConnections}>${lvl2F.name}</td>
      ${
        lvl3F[0]
          ? `<td>${lvl3F[0].name}</td>` +
            generateFCform(lvl3F[0], lvl2F.initialSeverity)
          : "<td></td>"
      }
    </tr>`;

      for (let i = 1; i < maxConnections; i++) {
        result += `<tr>
                    <td>${lvl1F[i] ? lvl1F[i].name : ""}</td>
                
                    ${
                      lvl3F[i]
                        ? `<td>${lvl3F[i].name}</td>` +
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
        JSON.stringify(treeData) !== "{}" && (
          <div className="scroll-container tables-container">
            <form onChange={handler}>
              <table>
                <thead>
                  <tr>
                    <th style={{ textTransform: "uppercase" }} width={355}>
                      Failure Analysis (Step 4)
                    </th>
                    <th width={275} style={{ textTransform: "uppercase" }}>
                      Risk Analysis (Step 5)
                    </th>
                    <th width={685} style={{ textTransform: "uppercase" }}>
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
                      {header.type.name === "DFMEA"
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
                      {header.type.name === "DFMEA" ? "D" : "P"}FMEA AP
                    </th>

                    <th width="155" style={{ backgroundColor: "#50f424" }}>
                      {header.type.name === "DFMEA" ? "D" : "P"}FMEA Prevention
                      Action
                    </th>
                    <th width="155" style={{ backgroundColor: "#50f424" }}>
                      {header.type.name === "DFMEA" ? "D" : "P"}FMEA Detection
                      Action
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
                      {header.type.name === "DFMEA" ? "D" : "P"}FMEA AP
                    </th>
                  </tr>
                </thead>
                {/* </ScrollContainer> */}

                <tbody style={{ color: "red " }}>
                  {parse(generateFailuresHTML())}
                </tbody>
              </table>
            </form>
          </div>
        )
      )}
    </div>
  );
};

export default Table;
