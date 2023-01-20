import React from "react";
import "./node.scss";
import "../treeGraph/treeGraph.css";
import { useDispatch, useSelector } from "react-redux";
import { setModalData, setModalIsOpen } from "../../store/modal/modal.actions";

const Node = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  addHandler,
  deleteHandler,
}) => {
  const dispatch = useDispatch();
  const opened = useSelector((state) => state.modal.isOpen);

  const toggleWindow = () => {
    dispatch(setModalIsOpen(!opened));
    dispatch(setModalData(nodeDatum));
  };

  return (
    <g>
      <rect width="500" height="500" />
      <foreignObject {...foreignObjectProps}>
        <div style={{ width: "500px", height: "500px" }}>
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
          <ul className="node-functions">
            {nodeDatum.functions &&
              nodeDatum.functions.map((f) => {
                return (
                  <div key={f.name}>
                    <li>{f.name}</li>
                    <ul className="node-effects">
                      {f.failures &&
                        f.failures.map((e) => (
                          <li key={e.name}>{e.name ? e.name : e}</li>
                        ))}
                    </ul>
                  </div>
                );
              })}
          </ul>

          {nodeDatum.children && nodeDatum.children.length > 0 && (
            <button className="node-buttton" onClick={toggleNode}>
              {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
            </button>
          )}

          {nodeDatum.__rd3t.depth < 2 && (
            <button
              className="node-buttton"
              onClick={addHandler}
              data-id={nodeDatum.id}
            >
              Add
            </button>
          )}

          {nodeDatum.__rd3t.depth > 0 && (
            <button
              className="node-buttton"
              onClick={deleteHandler}
              data-id={nodeDatum.id}
              data-depth={nodeDatum.__rd3t.depth}
            >
              Delete
            </button>
          )}
          {
            //<Button onClick={toggleWindow}>Open modal</Button>
            <button
              className="node-buttton"
              onClick={(e) => {
                toggleWindow();
              }}
              data-id={nodeDatum.id}
              data-depth={nodeDatum.__rd3t.depth}
            >
              Edit
            </button>
          }
        </div>
      </foreignObject>
    </g>
  );
};

export default Node;
