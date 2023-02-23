import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import Spinner from "../spinner/spinner.component";
import "./sidebar.scss";

const Sidebar = ({ tableReference }) => {
  const tableRef = tableReference;
  const data = useSelector((state) => state.fmea.data);
  const isLoading = useSelector((state) => state.fmea.isLoading);
  const headerData = useSelector((state) => state.fmea.header);

  let functions = [];

  functions = data?.children?.reduce((acc, cur) => {
    if (cur.functions) {
      acc.push(...cur.functions);
    }
    return acc;
  }, []);

  console.log();

  const [treeData, setTreeData] = useState(data);

  useEffect(() => {
    setTreeData({ ...data });
  }, [data]);

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

  const generateStrcutureHTML = () => {
    if (treeData) {
      let result = `<tr>
      <td rowSpan=${getNumberOfTreeNodes(treeData)}>
      ${treeData.name}
    </td>`;

      console.log(treeData);
      if (treeData.children) {
        result += ` <td rowSpan=${treeData?.children[0].children?.length}>
      ${treeData?.children[0].name}   
      </td>`;
      }

      if (treeData.children[0].children) {
        result += `<td>${treeData.children[0].children[0].name}</td>`;
      }
      result += `</tr>`;

      for (let j = 1; j < treeData.children[0].children?.length; j++) {
        result += `<tr><td>${treeData.children[0].children[j].name}</td></tr>`;
      }

      for (let i = 1; i < treeData.children.length; i++) {
        result += `<tr>
        <td rowSpan=${treeData.children[i].children?.length}>${treeData.children[i].name}</td>`;
        if (treeData.children[i].children) {
          console.log(treeData.children[i]);
          result += `<td>${treeData.children[i].children[0].name}</td>`;
        }
        result += `</tr>`;

        if (treeData.children[i].children) {
          for (let j = 1; j < treeData.children[i].children?.length; j++) {
            result += `<tr><td>${treeData.children[i].children[j].name}</td></tr>`;
          }
        }
      }

      return result;
    }
    return "";
  };
  const generateFunctionsHTML = () => {
    //console.log("functions", functions);
    let result = "";

    for (let lvl2F of functions) {
      //console.log(lvl2F);
      if (!lvl2F.functions) {
        result += `<tr>
        <td></td>
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
      <td >${lvl1F[0] ? lvl1F[0].name : ""}</td>
      <td rowSpan=${maxConnections}>${lvl2F.name}</td>
      <td>${lvl3F[0] ? lvl3F[0].name : ""}</td>
    </tr>`;
      for (let i = 1; i < maxConnections; i++) {
        result += `<tr>
                    <td >${lvl1F[i] ? lvl1F[i].name : ""}</td>              
                    <td>${lvl3F[i] ? lvl3F[i].name : ""}</td>
                  </tr>`;
      }
      //console.log(result);
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
                <table ref={tableRef} className="side-table">
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
            <div id="table-to-xls" style={{ display: "none" }}>
              <table ref={tableRef} className="side-table">
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
                <tbody>{parse(generateStrcutureHTML())}</tbody>
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
                  {parse(generateFunctionsHTML())}
                </tbody>
              </table>

              {document.querySelector("#table-to-xls-2") &&
                parse(document.querySelector("#table-to-xls-2").innerHTML)}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Sidebar;
