import { createContext, useState } from "react";
import { findObject } from "../helpers";
import { structure1 as treeData } from "../data/dataJS";
import { v4 as uuid } from "uuid";

export const FMEADataContext = createContext({
  data: [],
  addNodeToData: () => {},
  deleteNode: () => {},
  // toggleWindow: () => {},
});

const add = (nodes, setToNodeId) => {
  const [result] = findObject(nodes, "id", setToNodeId);
  let newid = uuid();

  !result["children"]
    ? (result.children = [
        {
          id: newid,
          depth: result.depth + 1,
          name: "Structure " + (result.depth + 2),
        },
      ])
    : result["children"].push({
        id: newid,
        depth: result.depth + 1,
        name: "Structure " + (result.depth + 2),
      });
  console.log(nodes);
  return [...nodes];
};
const deleteN = (nodes, nodeID, depth) => {
  console.log(nodeID);
  const [result] = findObject(nodes, "id", nodeID);
  console.log(nodes, result);
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
  const test = nodes.map((v) => {
    if (v.id === node.id) return node;
    return v;
  });

  console.log(test);

  return [...test];
};

export const FMEADataContextProvider = ({ children }) => {
  const [data, setData] = useState([treeData]);

  const addNodeToData = (nodes, setToNodeId) => {
    setData(add(nodes, setToNodeId));
  };

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
