import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import { mainSocket } from "../../socket";
import "./treeGraph.css";

import Node from "../node/node";
import { useDispatch, useSelector } from "react-redux";
import {
  addNodeToData,
  deleteNodeFromData,
  deleteNodeFunctions,
  setMainFailures,
  setMainFunctions,
  updateNodeData,
} from "../../store/fmea/fmea.actions";
import Spinner from "../spinner/spinner.component";
import { structure1 } from "../../data/dataJS";
import { findObject } from "../../helpers";
import { useParams } from "react-router-dom";
const TreeGraph = () => {
  //State init
  const dispatch = useDispatch();
  const { id: analysesId } = useParams();

  const data = useSelector((state) => state.fmea.data);
  const isLoading = useSelector((state) => state.fmea.isLoading);

  const [treeData, setTreeData] = useState({});
  const [socket, setSocket] = useState();
  const [updated, setUpdated] = useState(true);

  useEffect(() => {
    setSocket(mainSocket);

    return () => {
      mainSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;

    socket.emit("get-analysis", analysesId);
  }, [socket, analysesId]);

  useEffect(() => {
    setTreeData({ ...data });
  }, [data]);

  useEffect(() => {
    if (socket == null) return;
    const handler = (newData) => {
      dispatch(updateNodeData(data, { ...newData }));
    };

    socket.on("receive-changes", handler);
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket]);

  //Event handlers
  const AddNode = (e) => {
    dispatch(addNodeToData(data, e.target.dataset.id));
    setTreeData({ ...data });
    socket && socket.emit("send-changes", data);
  };

  const DeleteNode = (e) => {
    dispatch(
      deleteNodeFromData(data, e.target.dataset.id, +e.target.dataset.depth)
    );
    setTreeData({ ...data });
    socket && socket.emit("send-changes", data);
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
