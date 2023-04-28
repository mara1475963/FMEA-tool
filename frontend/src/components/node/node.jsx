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

const Node = ({
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
            border: "solid 5px black",
            strokeWidth: 0,
          }}
        >
          <span style={{ textAlign: "center" }}>
            <b>{nodeDatum.name}</b>
          </span>

          <div className="node-controls">
            {nodeDatum.children && nodeDatum.children.length > 0 && (
              <button className="node-buttton expand" onClick={toggleNode}>
                {nodeDatum.__rd3t.collapsed ? "+" : "-"}
              </button>
            )}

            {nodeDatum.__rd3t.depth < 2 && (
              <div
                className="node"
                data-toggle="tooltip"
                data-placement="top"
                title="Add Node"
              >
                <button
                  className="node-buttton"
                  onClick={addHandler}
                  data-id={nodeDatum.id}
                >
                  <AddCircleOutlineIcon />
                </button>
              </div>
            )}
            {
              <div
                className="node"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit Node"
              >
                <button
                  className="node-buttton"
                  onClick={(e) => {
                    toggleWindow();
                  }}
                  data-id={nodeDatum.id}
                  data-depth={nodeDatum.__rd3t.depth}
                >
                  <EditOutlinedIcon />
                </button>
              </div>
            }

            {
              <div
                className="node"
                data-toggle="tooltip"
                data-placement="top"
                title="Highlight Node"
              >
                <button
                  className="node-buttton"
                  onClick={selectNode}
                  data-id={nodeDatum.id}
                >
                  <StarBorderIcon />
                </button>
              </div>
            }
            {nodeDatum.__rd3t.depth > 0 && (
              <div
                className="node"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete Node"
              >
                <button
                  className="node-buttton"
                  onClick={deleteHandler}
                  data-id={nodeDatum.id}
                  data-depth={nodeDatum.__rd3t.depth}
                >
                  <DeleteOutlineIcon fontSize="large" />
                </button>
              </div>
            )}
          </div>
        </div>
      </foreignObject>
    </g>
  );
};

export default Node;
