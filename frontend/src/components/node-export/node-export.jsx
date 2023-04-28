import React from "react";
import "./node-export.scss";
import "../treeGraph/treeGraph.css";
import { useSelector } from "react-redux";

import { selectNodeIDs } from "../../store/fmea/fmea.selectors";

const NodeToExport = ({ nodeDatum, foreignObjectProps }) => {
  const selectedNodeID = useSelector(selectNodeIDs)[0];

  let nodeColor = "";
  switch (nodeDatum.__rd3t.depth) {
    case 0:
      nodeColor = "#cacaca";
      break;
    case 1:
      nodeColor = "#89e3f4";
      break;
    case 2:
      nodeColor = "#fb92c7";
      break;
    default:
      nodeColor = "gray";
  }
  if (selectedNodeID === nodeDatum.id) nodeColor = "#ffd433";

  return (
    <g className="test" style={{ fill: nodeColor }}>
      <rect width="700" height="400" />
      <foreignObject {...foreignObjectProps}>
        <div
          style={{
            width: "700px",
            height: "400px",
            border: "solid 3px black",
            strokeWidth: 0,
            display: "flex",
          }}
        >
          <span
            style={{
              textAlign: "center",
              fontSize: "80px",
              lineHeight: "80px",
              margin: "auto",
            }}
          >
            <b>{nodeDatum.name}</b>
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

export default NodeToExport;
