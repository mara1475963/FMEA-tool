import React, { useEffect, useState } from "react";
import "./table.scss";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/spinner.component";
import parse from "html-react-parser";

const Table = () => {
  const data = useSelector((state) => state.fmea.data);
  const isLoading = useSelector((state) => state.fmea.isLoading);
  const functions = useSelector((state) => state.fmea.lvl2Functions);
  const failures = useSelector((state) => state.fmea.lvl2Failures);

  const [treeData, setTreeData] = useState(data);

  useEffect(() => {
    setTreeData({ ...data });
  }, [data]);

  //const sideTable = document.querySelector(".side-table").offsetWidth;
  // console.log(data, treeData);

  const generateStrcutureHTML = () => {
    let result = "";

    for (let lvl2 of treeData.children) {
      result += `<tr><td  rowSpan=${
        lvl2.children && lvl2.children.length + 1
      }>${lvl2.name}</td></tr>`;

      if (lvl2.children) {
        for (let lvl3 of lvl2.children) {
          result += `<tr><td>${lvl3.name}</td></tr>`;
        }
      }
    }

    return result;
  };
  const generateFunctionsHTML = () => {
    //console.log("functions", functions);
    let result = "";

    for (let lvl2F of functions) {
      //console.log(lvl2F);
      if (!lvl2F.functions) {
        result += `<tr>
        <td colSpan=${2}></td>
        <td>${lvl2F.name}</td>
        <td></td>
        </tr>`;
        return result;
      }
      const lvl1F = lvl2F.functions.filter((f) => f.depth === 0);
      const lvl3F = lvl2F.functions.filter((f) => f.depth === 2);
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
      <td colSpan=${2}>${lvl1F[0] ? lvl1F[0].name : ""}</td>
      <td rowSpan=${maxConnections}>${lvl2F.name}</td>
      <td>${lvl3F[0] ? lvl3F[0].name : ""}</td>
    </tr>`;
      for (let i = 1; i < maxConnections; i++) {
        result += `<tr>
                    <td colSpan=${2}>${
          lvl1F[i] ? lvl1F[i].name : ""
        }</td>              
                    <td>${lvl3F[i] ? lvl3F[i].name : ""}</td>
                  </tr>`;
      }
      //console.log(result);
    }
    return result;
  };
  const calculateAP = () => {
    const S = document.querySelector("#initial-severity");
    const O = document.querySelector("#initial-occurance");
    const D = document.querySelector("#initial-detection");
    console.log(S, O, D);
  };
  const handler = (e) => {
    const element = e.target;
    if (
      element.id !== "initial-severity" &&
      element.id !== "initial-occurance" &&
      element.id !== "initial-detection"
    ) {
      return;
    }
    const S = document.querySelector("#initial-severity");
    const O = document.querySelector("#initial-occurance");
    const D = document.querySelector("#initial-detection");
    const AP = document.querySelector("#initial-AP");
    AP.innerHTML = S.value * O.value * D.value;
    console.log(AP.value);
  };

  const generateFailuresHTML = () => {
    console.log("failures", failures);
    let result = "";
    const FCform = `
    <td><input type='text' /></td>
    <td><input min='1' max='10' type='number' id='initial-occurance' style='width:40px'/></td>
    <td><input type='text' /></td>
    <td><input type='text' /></td>
    <td><input min='1' max='10' type='number' id='initial-detection' style='width:40px'/></td>
    <td id='initial-AP'>--</td>
    <td><input type='text' /></td>
    <td><input type='text' /></td>
    <td><input type='text' /></td>
    <td><input type='date' /></td>
    <td><input type='text' /></td>
    <td><input type='date' /></td>
    <td><input min='1' max='10' type='number' style='width:40px'/></td>
    <td><input min='1' max='10' type='number' style='width:40px'/></td>
    <td><input min='1' max='10' type='number' style='width:40px'/></td>
    <td>999</td>
    `;

    for (let lvl2F of failures) {
      console.log(lvl2F);
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
      <input min='1' max='10' type='number'  style='width:40px' id='initial-severity' value=${
        lvl2F.severity
      }  />
      </td>
      <td rowSpan=${maxConnections}>${lvl2F.name}</td>
      ${lvl3F[0] ? `<td>${lvl3F[0].name}</td>` + FCform : "<td></td>"}
    </tr>`;
      for (let i = 1; i < maxConnections; i++) {
        result += `<tr>
                    <td>${lvl1F[i] ? lvl1F[i].name : ""}</td>
                
                    ${
                      lvl3F[i]
                        ? `<td>${lvl3F[i].name}</td>` + FCform
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
          <div className="tables-container">
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
                      colSpan={10}
                      width="50%"
                    >
                      OPTIMIZATION (Step 6)
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th>1. Failure Effects (FE)</th>
                    <th style={{ writingMode: "vertical-rl", width: "25px" }}>
                      Severity (S) of FE
                    </th>
                    <th>2. Failure Mode (FM)</th>
                    <th>3. Failure Cause (FC)</th>

                    <th>Current preventive control (PC) for FC</th>
                    <th>Occurence (O) of FC</th>
                    <th>Current detection control (DC) for FC or FM</th>
                    <th>Current detection control (DC) for FC or FM</th>
                    <th>Detection (D) of FC or FM</th>
                    <th>D FMEA AP</th>

                    <th>DFMEA Prevention Action</th>
                    <th>DFMEA Detection Action</th>
                    <th>Responsible Persons Name</th>
                    <th>Target Completion Date</th>
                    <th>Status</th>
                    <th>Completion Date</th>
                    <th>Severity (S)</th>
                    <th>Occurence (O)</th>
                    <th>Detection (D)</th>
                    <th>D FMEA AP</th>
                  </tr>
                </thead>

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
