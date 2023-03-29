import React from "react";
import "./node.scss";
import "../treeGraph/treeGraph.css";
import { useDispatch, useSelector } from "react-redux";
import { setModalData, setModalIsOpen } from "../../store/modal/modal.actions";
import { setSelectedNode } from "../../store/fmea/fmea.actions";
import { selectNodeIDs } from "../../store/fmea/fmea.selectors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const NodeToExport = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  addHandler,
  deleteHandler,
}) => {
  const dispatch = useDispatch();
  const opened = useSelector((state) => state.modal.isOpen);
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

  const toggleWindow = () => {
    dispatch(setModalIsOpen(!opened));
    dispatch(setModalData(nodeDatum));
  };

  const selectNode = (e) => {
    e.preventDefault();
    if (selectedNodeID && selectedNodeID === nodeDatum.id) {
      dispatch(setSelectedNode({}));
    } else {
      dispatch(setSelectedNode(nodeDatum));
    }
  };

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
