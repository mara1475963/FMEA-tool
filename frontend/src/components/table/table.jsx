import React, { useEffect, useState } from "react";
import "./table.scss";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/spinner.component";
import parse from "html-react-parser";
import ScrollContainer from "react-indiana-drag-scroll";
import { findObject } from "../../helpers";
import { updateNodeData } from "../../store/fmea/fmea.actions";

const Table = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fmea.data);
  const isLoading = useSelector((state) => state.fmea.isLoading);
  const failures = useSelector((state) => state.fmea.lvl2Failures);

  const [treeData, setTreeData] = useState(data);

  useEffect(() => {
    setTreeData({ ...data });
  }, [data]);

  //const sideTable = document.querySelector(".side-table").offsetWidth;
  // console.log(data, treeData);

  const calculateAP = () => {
    const S = document.querySelector("#initialSeverity");
    const O = document.querySelector("#initialOccurance");
    const D = document.querySelector("#initialDetection");
  };
  const handler = (e) => {
    const element = e.target;
    let result = {};
    if (element.id === "initialSeverity") {
      [result] = findObject(data, "id", element.dataset.fmid);
      result.initialSeverity = element.value;
      dispatch(updateNodeData(data, result));
    } else {
      const id =
        element.parentElement.parentElement.querySelector(
          "#failure-cause-id"
        ).value;

      [result] = findObject(data, "id", id);

      result[element.id] = element.value;
    }

    if (
      element.id !== "initialSeverity" &&
      element.id !== "initialOccurance" &&
      element.id !== "initialDetection" &&
      element.id !== "finalSeverity" &&
      element.id !== "finalOccurance" &&
      element.id !== "finalDetection"
    ) {
      return;
    }
    console.log(element.parentElement.parentElement);
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
    const AP = element.parentElement.parentElement.querySelector("#initialAP");
    const AP2 = element.parentElement.parentElement.querySelector("#finalAP");

    if (!S.value || !O.value || !D.value) {
      AP.innerHTML = "--";
    }
    const APproduct = S.value * O.value * D.value;
    AP.innerHTML = APproduct;
    result.initialAP = APproduct;
    if (!S2.value || !O2.value || !D2.value) {
      AP2.innerHTML = "--";
    }
    const APproduct2 = S2.value * O2.value * D2.value;
    AP2.innerHTML = APproduct2;
    result.finalAP = APproduct2;

    dispatch(updateNodeData(data, result));
  };

  const generateFCform = (fc, initialSeverity) => {
    console.log(initialSeverity);
    const FCform = `
    <td ><input id='failure-cause-id'  type='hidden' value='${
      fc.id
    }' /><input id='initialSeverity'  type='hidden' value='${initialSeverity}' />
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
    <td id='initialAP' value='${fc.initialAP ? fc.initialAP : ""}' ></td>
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
    <td id='finalAP' value='${fc.finalAP ? fc.finalAP : ""}' >--</td>
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
        return result;
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
      } name= min='1' max='10' type='number'  style='width:40px' id='initialSeverity' value=${
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
              <table width={2500}>
                <thead>
                  <tr>
                    <th
                      style={{ backgroundColor: "red" }}
                      colSpan={4}
                      width="20%"
                    >
                      Failure Analysis (Step 4)
                    </th>
                    <th
                      style={{ backgroundColor: "#dcdc09" }}
                      colSpan={6}
                      width="30%"
                    >
                      Risk Analysis (Step 5)
                    </th>
                    <th
                      style={{ backgroundColor: "#00ffff" }}
                      colSpan={11}
                      width="50%"
                    >
                      OPTIMIZATION (Step 6)
                    </th>
                  </tr>
                </thead>
                {/* <ScrollContainer className="scroll-container"> */}
                <thead>
                  <tr>
                    <th>1. Failure Effects (FE)</th>
                    <th style={{ writingMode: "vertical-rl", width: "25px" }}>
                      Severity (S) <br /> of FE
                    </th>
                    <th>2. Failure Mode (FM)</th>
                    <th>3. Failure Cause (FC)</th>

                    <th>Current preventive control (PC) for FC</th>
                    <th style={{ writingMode: "vertical-rl", width: "25px" }}>
                      Occurence (O) <br /> of FC
                    </th>
                    <th>Current detection control (DC) for FC or FM</th>
                    <th style={{ writingMode: "vertical-rl", width: "25px" }}>
                      Detection (D) <br /> of FC or FM
                    </th>
                    <th style={{ writingMode: "vertical-rl", width: "25px" }}>
                      DFMEA AP
                    </th>

                    <th>DFMEA Prevention Action</th>
                    <th>DFMEA Detection Action</th>
                    <th>Responsible Persons Name</th>
                    <th>Target Completion Date</th>
                    <th>Status</th>
                    <th>Action taken with Pointer to Evidence</th>
                    <th>Completion Date</th>
                    <th style={{ writingMode: "vertical-rl", width: "25px" }}>
                      Severity (S)
                    </th>
                    <th style={{ writingMode: "vertical-rl", width: "25px" }}>
                      Occurence (O)
                    </th>
                    <th style={{ writingMode: "vertical-rl", width: "25px" }}>
                      Detection (D)
                    </th>
                    <th style={{ writingMode: "vertical-rl", width: "25px" }}>
                      D FMEA AP
                    </th>
                  </tr>
                </thead>
                {/* </ScrollContainer> */}

                <tbody>{parse(generateFailuresHTML())}</tbody>
              </table>
            </form>
          </div>
        )
      )}
    </div>
  );
};

export default Table;
