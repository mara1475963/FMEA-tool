import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import Spinner from "../spinner/spinner";
import "./sidebar.scss";
import {
  selectFMEAData,
  selectFMEAHeader,
  selectFMEAIsLoading,
  selectMainFunctions,
  selectNodeIDs,
} from "../../store/fmea/fmea.selectors";

const Sidebar = () => {
  const isLoading = useSelector(selectFMEAIsLoading);
  const data = useSelector(selectFMEAData);
  const headerData = useSelector(selectFMEAHeader);
  const functions = useSelector(selectMainFunctions);
  const selectedIDs = useSelector(selectNodeIDs);

  const [treeData, setTreeData] = useState(data);

  useEffect(() => {
    setTreeData({ ...data });
  }, [data]);

  const replaceInputsFromTable = (node) => {
    if (!node) return;
    if (!node.children) return;
    for (let child of node.children) {
      if (child.children[0]?.tagName?.toLowerCase() === "input") {
        if (child.children[0].type === "hidden") {
          child.innerHTML =
            child.children[0].nextElementSibling.nextElementSibling.value;
        } else {
          child.innerHTML = child.children[0].value;
        }
      }
      replaceInputsFromTable(child.children);
    }
  };

  const table2 = document.querySelector("#table-to-xls-2")?.cloneNode(true);
  const tableBody = table2?.querySelector(".table-form-controls");

  if (tableBody) {
    for (const tr of tableBody.children) {
      replaceInputsFromTable(tr);
    }
  }

  const isSelected = (id) => {
    if (id === undefined) return false;
    return selectedIDs.includes(id);
  };

  const getNumberOfTreeNodes = (data) => {
    let count = 0;
    data?.children?.forEach((child) => {
      if (!child.children) {
        count++;
      }
      child.children?.forEach((_) => {
        count++;
      });
    });

    return count;
  };

  const generateStrcutureHTML = (excelFormat) => {
    if (treeData) {
      let result = `<tr>
      <td class="${
        isSelected(treeData.id) ? "selected" : ""
      }" style='textAlign: center;' colspan=${
        excelFormat ? "2" : "1"
      } rowSpan=${getNumberOfTreeNodes(treeData)}>
      ${treeData.name}
    </td>`;

      if (treeData.children && treeData.children.length !== 0) {
        result += ` <td class="${
          isSelected(treeData?.children[0].id) ? "selected" : ""
        }" style='textAlign: center;' rowSpan=${
          treeData?.children[0].children?.length
        }>
      ${treeData?.children[0].name}   
      </td>`;
      } else {
        return result;
      }

      if (treeData.children[0].children) {
        result += `<td class="${
          isSelected(treeData.children[0].children[0].id) ? "selected" : ""
        }" style='textAlign: center;'>${
          treeData.children[0].children[0].name
        }</td>`;
      }
      result += `</tr>`;

      for (let j = 1; j < treeData.children[0].children?.length; j++) {
        result += `<tr><td class="${
          isSelected(treeData.children[0].children[j].id) ? "selected" : ""
        }" style='textAlign: center;'>${
          treeData.children[0].children[j].name
        }</td></tr>`;
      }

      for (let i = 1; i < treeData.children.length; i++) {
        result += `<tr>
        <td class="${
          isSelected(treeData.children[i].id) ? "selected" : ""
        }" style='textAlign: center;' rowSpan=${
          treeData.children[i].children?.length
        }>${treeData.children[i].name}</td>`;
        if (treeData.children[i].children) {
          result += `<td class="${
            isSelected(treeData.children[i].children[0].id) ? "selected" : ""
          }" style='textAlign: center;'>${
            treeData.children[i].children[0].name
          }</td>`;
        }
        result += `</tr>`;

        if (treeData.children[i].children) {
          for (let j = 1; j < treeData.children[i].children?.length; j++) {
            result += `<tr><td class="${
              isSelected(treeData.children[i].children[j].id) ? "selected" : ""
            }" style='textAlign: center;'>${
              treeData.children[i].children[j].name
            }</td></tr>`;
          }
        }
      }

      return result;
    }
    return "";
  };

  const generateFunctionsHTML = (excelFormat) => {
    let result = "";

    if (functions) {
      for (let lvl2F of functions) {
        if (!lvl2F.functions) {
          result += `<tr>
                      <td colspan=${excelFormat ? "2" : ""} ></td>
                      <td class="${isSelected(lvl2F.id) ? "selected" : ""}">${
            lvl2F.name
          }</td>
                      <td></td>
                    </tr>`;
          continue;
        }
        const lvl1F = lvl2F.functions.filter((f) => f.depth === 0);
        const lvl3F = lvl2F.functions.filter((f) => f.depth === 2);

        let maxConnections = 0;

        if (lvl1F.length >= lvl3F.length) {
          maxConnections = lvl1F.length;
        }
        if (lvl1F.length < lvl3F.length) {
          maxConnections = lvl3F.length;
        }
        result += `<tr>
                    <td class="${
                      isSelected(lvl1F[0]?.id) ? "selected" : ""
                    }" colspan=${excelFormat ? "2" : ""} class="${
          isSelected(lvl1F[0]?.id) ? "selected" : ""
        }"  >${lvl1F[0] ? lvl1F[0].name : ""}</td>
                    <td class="${
                      isSelected(lvl2F.id) ? "selected" : ""
                    }" rowSpan=${maxConnections}>${lvl2F.name}</td>
                    <td class="${isSelected(lvl3F[0]?.id) ? "selected" : ""}">${
          lvl3F[0] ? lvl3F[0].name : ""
        }</td>
                  </tr>`;
        for (let i = 1; i < maxConnections; i++) {
          result += `<tr>
                      <td class="${
                        isSelected(lvl1F[i]?.id) ? "selected" : ""
                      }">${lvl1F[i] ? lvl1F[i].name : ""}</td>              
                      <td class="${
                        isSelected(lvl3F[i]?.id) ? "selected" : ""
                      }">${lvl3F[i] ? lvl3F[i].name : ""}</td>
                    </tr>`;
        }
      }
    }
    return result;
  };

  return (
    <div className="sidebar grid-item">
      {isLoading ? (
        <Spinner />
      ) : (
        JSON.stringify(treeData) !== "{}" && (
          <div className="tables-container">
            <form>
              <div id="table-to-xls-1">
                <table className="side-table">
                  <thead>
                    <tr>
                      <th
                        style={{
                          textTransform: "uppercase",
                          backgroundColor: "whitesmoke",
                        }}
                        colSpan={3}
                      >
                        Structure analysis(Step 2)
                      </th>
                    </tr>

                    <tr>
                      <th style={{ backgroundColor: "#cacaca" }} width="33%">
                        {headerData.type.structure1}
                      </th>

                      <th style={{ backgroundColor: "#89e3f4" }} width="34%">
                        {headerData.type.structure2}
                      </th>
                      <th style={{ backgroundColor: "#fb92c7" }} width="33%">
                        {headerData.type.structure3}
                      </th>
                    </tr>
                  </thead>
                  <tbody>{parse(generateStrcutureHTML())}</tbody>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textTransform: "uppercase",
                          backgroundColor: "whitesmoke",
                        }}
                        colSpan={3}
                      >
                        Function analysis(Step 3)
                      </th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#cacaca" }}>
                        {headerData.type.function1}
                      </th>
                      <th style={{ backgroundColor: "#89e3f4" }}>
                        {headerData.type.function2}
                      </th>
                      <th style={{ backgroundColor: "#fb92c7" }}>
                        {headerData.type.function3}
                      </th>
                    </tr>
                  </thead>

                  <tbody style={{ color: "green" }}>
                    {parse(generateFunctionsHTML())}
                  </tbody>
                </table>
              </div>
            </form>

            {/* TABLE TO EXPORT */}
            <div id="table-to-xls" style={{ display: "none" }}>
              <table className="side-table">
                <thead>
                  <tr>
                    <th
                      style={{
                        textTransform: "uppercase",
                        backgroundColor: "whitesmoke",
                      }}
                      colSpan={4}
                    >
                      Structure analysis(Step 2)
                    </th>
                  </tr>

                  <tr>
                    <th
                      colSpan={2}
                      style={{ backgroundColor: "#cacaca" }}
                      width="33%"
                    >
                      {headerData.type.structure1}
                    </th>

                    <th style={{ backgroundColor: "#89e3f4" }} width="34%">
                      {headerData.type.structure2}
                    </th>
                    <th style={{ backgroundColor: "#fb92c7" }} width="33%">
                      {headerData.type.structure3}
                    </th>
                  </tr>
                </thead>
                <tbody>{parse(generateStrcutureHTML(true))}</tbody>
                <thead>
                  <tr>
                    <th
                      style={{
                        textTransform: "uppercase",
                        backgroundColor: "whitesmoke",
                      }}
                      colSpan={4}
                    >
                      Function analysis(Step 3)
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th colSpan={2} style={{ backgroundColor: "#cacaca" }}>
                      {headerData.type.function1}
                    </th>
                    <th style={{ backgroundColor: "#89e3f4" }}>
                      {headerData.type.function2}
                    </th>
                    <th style={{ backgroundColor: "#fb92c7" }}>
                      {headerData.type.function3}
                    </th>
                  </tr>
                </thead>

                <tbody style={{ color: "green" }}>
                  {parse(generateFunctionsHTML(true))}
                </tbody>
              </table>

              {table2 && parse(table2.innerHTML)}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Sidebar;
