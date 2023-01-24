import React, { useEffect, useState } from "react";
import "./table.scss";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/spinner.component";
import parse from "html-react-parser";

const Table = () => {
  //State init
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fmea.data);
  const isLoading = useSelector((state) => state.fmea.isLoading);

  const [treeData, setTreeData] = useState(data);

  useEffect(() => {
    setTreeData(data);
  }, [data]);

  const generateStrcutureHTML = () => {
    let result = "";

    for (let lvl2 of treeData.children) {
      result += `<tr><td rowSpan=${lvl2.children && lvl2.children.length + 1}>${
        lvl2.name
      }</td></tr>`;

      if (lvl2.children) {
        for (let lvl3 of lvl2.children) {
          result += `<tr><td>${lvl3.name}</td></tr>`;
        }
      }
    }

    return result;
  };

  return (
    <div className="table-container grid-item">
      {isLoading ? (
        <Spinner />
      ) : (
        JSON.stringify(treeData) !== "{}" && (
          <table>
            <thead>
              <tr>
                <th colSpan={3}>Structure analysis(Step 2)</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>1. Next Higher Level</th>
                <th>2. Focus Element</th>
                <th>3. Next Lower Level</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td rowSpan={20}> MAIN</td>
              </tr>
              <tr>
                <td rowSpan={4}>Second</td>
              </tr>
              <tr>
                <td>Third</td>
              </tr>
              <tr>
                <td>Third</td>
              </tr>
              <tr>
                <td>Third</td>
              </tr>
              <tr>
                <td rowSpan={4}>Second</td>
              </tr>
              <tr>
                <td>Third</td>
              </tr>
              <tr>
                <td>Third</td>
              </tr>
              <tr>
                <td>Third</td>
              </tr> */}
              <tr>
                <td rowSpan={20}>{treeData.name}</td>
              </tr>
              {parse(generateStrcutureHTML())}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default Table;
