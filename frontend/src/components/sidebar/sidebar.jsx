import "./sidebar.scss";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/spinner.component";
import parse from "html-react-parser";
const Sidebar = () => {
  const data = useSelector((state) => state.fmea.data);
  const isLoading = useSelector((state) => state.fmea.isLoading);
  const functions = useSelector((state) => state.fmea.lvl2Functions);
  const failures = useSelector((state) => state.fmea.lvl2Failures);
  const headerData = useSelector((state) => state.fmea.header);

  const [treeData, setTreeData] = useState(data);

  useEffect(() => {
    setTreeData({ ...data });
  }, [data]);

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
        continue;
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

  return (
    <div className="sidebar grid-item">
      {isLoading ? (
        <Spinner />
      ) : (
        JSON.stringify(treeData) !== "{}" && (
          <div className="tables-container">
            <form onChange={handler}>
              <table className="side-table" width={540}>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "gray" }} colSpan={4}>
                      Structure analysis(Step 2)
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th colSpan={2} width="40%">
                      {headerData.type.structure1}
                    </th>

                    <th width="25%">{headerData.type.structure2}</th>
                    <th width="35%">{headerData.type.structure3}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2} rowSpan={20}>
                      {treeData.name}
                    </td>
                  </tr>
                  {parse(generateStrcutureHTML())}
                </tbody>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "green" }} colSpan={4}>
                      Function analysis(Step 3)
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th colSpan={2}>{headerData.type.function1}</th>
                    <th>{headerData.type.function2}</th>
                    <th>{headerData.type.function3}</th>
                  </tr>
                </thead>

                <tbody>{parse(generateFunctionsHTML())}</tbody>
              </table>
            </form>
          </div>
        )
      )}
    </div>
  );
};

export default Sidebar;
