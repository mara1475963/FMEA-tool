import React from "react";
import "./node.css";
import "../treeGraph/treeGraph.css";

const Node = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  addHandler,
  deleteHandler,
}) => {
  return (
    <g onClick={(e) => console.log(e)}>
      <rect width="500" height="500" />
      <foreignObject {...foreignObjectProps}>
        <div style={{ width: "500px", height: "500px" }}>
          <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
          <ul className="node-functions">
            {nodeDatum.functions &&
              nodeDatum.functions.map((f) => {
                return (
                  <>
                    <li>{f.name}</li>
                    <ul className="node-effects">
                      {f.failureEffects &&
                        f.failureEffects.map((e) => <li>{e}</li>)}
                    </ul>
                  </>
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
