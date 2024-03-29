import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";

import "./treeGraph.css";

import Node from "../node/node";
import { useDispatch, useSelector } from "react-redux";
import {
  addNodeToData,
  deleteNodeFromData,
  deleteNodeFunctions,
  setMainFailures,
  setMainFunctions,
} from "../../store/fmea/fmea.actions";
import Spinner from "../spinner/spinner.component";
import { structure1 } from "../../data/dataJS";
import { findObject } from "../../helpers";
const TreeGraph = () => {
  //State init
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fmea.data);
  const functions = useSelector((state) => state.fmea.lvl2Functions);
  const failures = useSelector((state) => state.fmea.lvl2Failures);
  const isLoading = useSelector((state) => state.fmea.isLoading);

  const [treeData, setTreeData] = useState({});

  useEffect(() => {
    setTreeData({ ...data });
  }, [data]);

  // console.log(data, treeData);
  //Event handlers
  const AddNode = (e) => {
    dispatch(addNodeToData(data, e.target.dataset.id));
    setTreeData({ ...data });
  };

  const DeleteNode = (e) => {
    const [node] = findObject(data, "id", e.target.dataset.id);
    if (node.functions) {
      for (let i = 0; i < node.functions.length; i++) {
        dispatch(
          deleteNodeFunctions(
            node,
            functions,
            failures,
            node.functions[i].id,
            i
          )
        );
      }
    }

    dispatch(
      deleteNodeFromData(data, e.target.dataset.id, +e.target.dataset.depth)
    );
    console.log(data);
    setTreeData({ ...data });
  };

  //Graph modifications
  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }) => {
    return (
      <Node
        key={nodeDatum.__rd3t.id}
        nodeDatum={nodeDatum}
        toggleNode={toggleNode}
        foreignObjectProps={foreignObjectProps}
        addHandler={AddNode}
        deleteHandler={DeleteNode}
      />
    );
  };

  const straightPathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;

    return `M${source.x + 250},${source.y + 500}L${target.x + 250},${target.y}`;
  };

  //RETURN
  const nodeSize = { x: 600, y: 700 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
  };

  return (
    <div className="grid-item tree-graph">
      {isLoading ? (
        <Spinner />
      ) : (
        // <Skeleton variant="rectangular" width={210} height={60} />
        <Tree
          data={treeData}
          nodeSize={nodeSize}
          renderCustomNodeElement={(rd3tProps) => {
            return renderForeignObjectNode({
              ...rd3tProps,
              foreignObjectProps,
            });
          }}
          translate={{ x: 610.29, y: 10.605 }}
          zoom="0.2588162309603444"
          orientation="vertical"
          pathFunc={straightPathFunc}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
        />
      )}
    </div>
  );
};

export default TreeGraph;
