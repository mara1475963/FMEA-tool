import { createContext, useState } from "react";
import { useEffect } from "react";
import dataChart from "../data/data.json";
import { findObject } from "../helpers";
import { structure1 as treeData } from "../data/dataJS";

export const FMEADataContext = createContext({
  data: [],
  addNodeToData: () => {},
  deleteNode: () => {},
  count: null,
  // toggleWindow: () => {},
});

const add = (nodes, setToNodeId, count) => {
  const [result] = findObject(nodes, "id", setToNodeId);
  let newid = count;
  newid++;
  !result["children"]
    ? (result.children = [{ id: newid, name: "newone" }])
    : result["children"].push({
        id: newid,
        name: "newone",
      });

  return [...nodes];
};
const deleteN = (nodes, nodeID, depth) => {
  const [result] = findObject(nodes, "id", nodeID);

  let [nodeObj] = nodes;
  console.log(nodeObj.children.indexOf(result));

  if (depth === 1) {
    nodeObj.children.splice(nodeObj.children.indexOf(result), 1);
  } else {
    nodeObj.children.forEach((k) => {
      if (!k.children) return;
      k.children = k.children.filter((v) => v.id !== nodeID);
    });
  }

  return [...nodes];
};

const updateNode = (nodes, node) => {
  const [result] = findObject(nodes, "id", node.id);

  const test = nodes.map((v) => {
    if (v.id === node.id) return node;
    return v;
  });

  console.log(test);

  return [...test];
};

export const FMEADataContextProvider = ({ children }) => {
  const [data, setData] = useState([treeData]);
  const [count, setCount] = useState(4);

  const addNodeToData = (nodes, setToNodeId) => {
    setData(add(nodes, setToNodeId, count));
    setCount(++count);
  };

  console.log(data);

  const deleteNode = (nodes, nodeID, depth) => {
    setData(deleteN(nodes, nodeID, depth));
  };

  const update = (nodes, node) => {
    setData(updateNode(nodes, node));
  };

  const value = { data, setData, addNodeToData, deleteNode, update };
  return (
    <FMEADataContext.Provider value={value}>
      {children}
    </FMEADataContext.Provider>
  );
};
