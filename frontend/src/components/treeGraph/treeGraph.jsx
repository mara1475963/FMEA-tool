import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import { mainSocket } from "../../socket";
import "./treeGraph.css";

import Node from "../node/node";
import { useDispatch, useSelector } from "react-redux";
import {
  addNodeToData,
  deleteNodeFromData,
  updateNodeData,
} from "../../store/fmea/fmea.actions";
import Spinner from "../spinner/spinner.component";
import { useParams } from "react-router-dom";
import {
  selectFMEAData,
  selectFMEAIsLoading,
} from "../../store/fmea/fmea.selectors";

import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import NodeToExport from "../node-export/node";
import { display } from "@mui/system";

const TreeGraph = ({ graphRef, toExport }) => {
  //State init
  const ref = graphRef;
  const dispatch = useDispatch();
  const data = useSelector(selectFMEAData);
  const isLoading = useSelector(selectFMEAIsLoading);

  const { id: analysesId } = useParams();

  const [treeData, setTreeData] = useState({});
  const [socket, setSocket] = useState();

  const zoom = (event) => {
    if (typeof event.zoom === "string") return;
    const zoomValue = event.zoom * 100 + "%";
    document.querySelector(".zoom-slider").style.width = zoomValue;
  };

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
    const element = e.target.closest("button");
    dispatch(addNodeToData(data, element.dataset.id));
    setTreeData({ ...data });
    socket && socket.emit("send-changes", data);
  };

  const DeleteNode = (e) => {
    const element = e.target.closest("button");
    dispatch(
      deleteNodeFromData(data, element.dataset.id, +element.dataset.depth)
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

  const renderForeignObjectNodeExport = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }) => {
    return (
      <NodeToExport
        key={nodeDatum.__rd3t.id}
        nodeDatum={nodeDatum}
        toggleNode={toggleNode}
        foreignObjectProps={foreignObjectProps}
      />
    );
  };

  const straightPathFunc = (linkDatum) => {
    const { source, target } = linkDatum;

    return `M${source.x + 350},${source.y + 400}L${target.x + 350},${target.y}`;
  };

  //RETURN
  const nodeSize = { x: 750, y: 600 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
  };

  return (
    <div
      className={toExport ? "hidden" : "grid-item tree-graph"}
      // style={toExport ? { display: "none" } : { display: "block" }}
    >
      {isLoading ? (
        <Spinner />
      ) : toExport ? (
        <Tree
          ref={ref}
          data={treeData}
          nodeSize={nodeSize}
          renderCustomNodeElement={(rd3tProps) => {
            return renderForeignObjectNodeExport({
              ...rd3tProps,
              foreignObjectProps,
            });
          }}
          translate={{ x: 610.29, y: 10.605 }}
          zoom="0.15"
          orientation="vertical"
          pathFunc={straightPathFunc}
          // rootNodeClassName="node__root"
          // branchNodeClassName="node__branch"
          // leafNodeClassName="node__leaf"
        />
      ) : (
        <Tree
          onUpdate={zoom}
          data={treeData}
          nodeSize={nodeSize}
          renderCustomNodeElement={(rd3tProps) => {
            return renderForeignObjectNode({
              ...rd3tProps,
              foreignObjectProps,
            });
          }}
          translate={{ x: 610.29, y: 10.605 }}
          zoom="0.1"
          orientation="vertical"
          pathFunc={straightPathFunc}
          // rootNodeClassName="node__root"
          // branchNodeClassName="node__branch"
          // leafNodeClassName="node__leaf"
        />
      )}

      <div className="zoom-slider" style={{ width: "10%" }}></div>
    </div>
  );
};

export default TreeGraph;
