import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";

import "./treeGraph.css";

import Node from "../node/node";
import { useDispatch, useSelector } from "react-redux";
import {
  addNodeToData,
  deleteNodeFromData,
} from "../../store/fmea/fmea.actions";
import Spinner from "../spinner/spinner.component";
const TreeGraph = () => {
  //State init

  // const { data, setData, addNodeToData, deleteNode } =
  //   useContext(FMEADataContext);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.fmea.data);
  const isLoading = useSelector((state) => state.fmea.isLoading);

  const [treeData, setTreeData] = useState(data);

  useEffect(() => {
    setTreeData(data);
  }, [data]);

  //Event handlers
  const AddNode = (e) => {
    dispatch(addNodeToData(treeData, e.target.dataset.id));
    setTreeData({ ...treeData });
  };

  const DeleteNode = (e) => {
    dispatch(
      deleteNodeFromData(treeData, e.target.dataset.id, +e.target.dataset.depth)
    );
    setTreeData({ ...treeData });
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
    x: 0,
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
          zoom="0.16493848884661172"
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

/*
   translate={{ x: 369, y: 201 }}
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
