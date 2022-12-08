import React from "react";
import "./node.scss";
import "../treeGraph/treeGraph.css";
import { useContext } from "react";
import { ModalContext } from "../../context/modalWindowContext";

const Node = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  addHandler,
  deleteHandler,
}) => {
  const { setNode } = useContext(ModalContext);

  const window = document.querySelector(".add-recipe-window");
  const overlay = document.querySelector(".overlay");
  const toggleWindow = () => {
    setNode({ ...nodeDatum });
    overlay.classList.toggle("hidden");
    window.classList.toggle("hidden");
  };

  return (
    <g
      onClick={(e) => {
        toggleWindow();
      }}
    >
      <rect width="500" height="500" />
      <foreignObject {...foreignObjectProps}>
        <div style={{ width: "500px", height: "500px" }}>
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
          <ul className="node-functions">
            {nodeDatum.functions &&
              nodeDatum.functions.map((f) => {
                return (
                  <div>
                    <li>{f.name}</li>
                    <ul className="node-effects">
                      {f.failures &&
                        f.failures.map((e) => <li>{e.name ? e.name : e}</li>)}
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
        </div>
      </foreignObject>
    </g>
  );
};

export default Node;
