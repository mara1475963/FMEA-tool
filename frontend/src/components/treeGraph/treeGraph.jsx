import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import dataChart from "../../data/data.json";
import "./treeGraph.css";
import { findObject } from "../../helpers.js";
import Node from "../node/node";

const TreeGraph = () => {
  //State init

  const [data, setData] = useState(dataChart);
  const [count, setCount] = useState(7);
  useEffect(() => {
    setData(dataChart);
  }, [data]);

  //Event handlers
  const AddNode = (e) => {
    const [result] = findObject(data, "id", +e.target.dataset.id);
    let newid = count;
    newid++;
    !result["children"]
      ? (result.children = [{ id: newid, name: "newone" }])
      : result["children"].push({
          id: newid,
          name: "newone",
        });
    console.log(newid);

    setCount(newid);
    setData({ dataChart });
  };

  const DeleteNode = (e) => {
    const [result] = findObject(data, "id", +e.target.dataset.id);

    if (+e.target.dataset.depth === 1) {
      dataChart.children.splice(data.children.indexOf(result), 1);
    } else {
      dataChart.children.forEach((k) => {
        if (!k.children) return;
        k.children = k.children.filter((v) => v.id !== +e.target.dataset.id);
      });
    }
    setData({ dataChart });
  };

  //Graph modifications
  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }) => {
    return (
      <Node
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

    return `M${source.y + 500},${source.x + 250}L${target.y},${target.x + 250}`;
  };
  const click = (e) => {
    console.log(e);
  };

  //RETURN
  const nodeSize = { x: 1000, y: 550 };
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
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        translate={{ x: 369, y: 201 }}
        zoom="0.16493848884661172"
        orientation="horizontal"
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
