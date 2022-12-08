import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import dataChart from "../../data/data.json";

import "./treeGraph.css";
import { findObject } from "../../helpers.js";
import Node from "../node/node";
import { useContext } from "react";
import { FMEADataContext } from "../../context/fmeaDataContext";

const TreeGraph = () => {
  //State init

  const { data, setData, addNodeToData, deleteNode } =
    useContext(FMEADataContext);

  //Event handlers
  const AddNode = (e) => {
    addNodeToData(data, +e.target.dataset.id);
  };

  const DeleteNode = (e) => {
    deleteNode(data, +e.target.dataset.id, +e.target.dataset.depth);
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
  const click = (e) => {
    console.log(e);
  };

  //RETURN
  const nodeSize = { x: 600, y: 700 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: 0,
  };

  return (
    <div className="grid-item tree-graph">
      <Tree
        data={data}
        nodeSize={nodeSize}
        renderCustomNodeElement={(rd3tProps) => {
          return renderForeignObjectNode({ ...rd3tProps, foreignObjectProps });
        }}
        translate={{ x: 369, y: 201 }}
        zoom="0.16493848884661172"
        orientation="vertical"
        pathFunc={straightPathFunc}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
      />
    </div>
  );
};

export default TreeGraph;

/*
"children": [
  {
    "id": 8,
    "name": "Tool Setter",
    "attributes": {
      "department": "Fabrication"
    }
  },
  {
    "id": 9,
    "name": "Slide Stop",
    "attributes": {
      "department": "Fabrication"
    }
  },
  {
    "id": 10,
    "name": "Coolant system",
    "attributes": {
      "department": "Fabrication"
    }
  }
]
*/
