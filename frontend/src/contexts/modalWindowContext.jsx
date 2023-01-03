import { createContext, useState } from "react";

export const ModalContext = createContext({
  node: {},
  // toggleWindow: () => {},
});

const addA = (newNode) => {
  return { ...newNode };
};

export const ModalWindowContextProvider = ({ children }) => {
  const [node, setNode] = useState({});

  const add = (newNode) => {
    setNode(addA(newNode));
  };
  console.log('context node' , node)

  const value = { node, setNode, add };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
