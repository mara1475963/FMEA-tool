import React from "react";
import "./modal.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { ModalContext } from "../../contexts/modalWindowContext";
import { FMEADataContext } from "../../contexts/fmeaDataContext";
import { useSelector } from "react-redux";

const ModalWindow = () => {
  //const { node, setNode, add } = useContext(ModalContext);
  const { data, update } = useContext(FMEADataContext);
  const node = useSelector(state => state.nodeReducer.node)

  
  const toggleWindow = () => {
    document.querySelector(".add-recipe-window").classList.toggle("hidden");
    document.querySelector(".overlay").classList.toggle("hidden");
    update(data, node);
  };

  useEffect(()=>{
    console.log('modal node', node)

  },[node])



  const onChangeHandler = (e) => {
    const element = e.target;
    console.log(e.target);
    node[element.name] = element.value;
  };

  return (
    <div>
      <div className="overlay hidden"></div>
      <div className="add-recipe-window hidden">
        <button className="btn--close-modal" onClick={() => toggleWindow()}>
          &times;
        </button>
        <form className="upload">
          <div className="upload__column">
            <div className="modal-header">
              <label>Process Item</label>
              <input
                defaultValue={node.name}
                type="text"
                name="name"
                onChange={onChangeHandler}
              />
            </div>
            <span>Functions</span>
            <ul className="node-functions">
              {node.functions &&
                node.functions.map((f) => {
                  return (
                    <div key={f.name}>
                      <li>
                        <input
                          defaultValue={f.name}
                          type="text"
                          onChange={onChangeHandler}
                        />
                      </li>
                      <span>Failures</span>

                      {f.failures &&
                        f.failures.map((e) => (
                          <div className="modal-header">
                            <input
                              defaultValue={e.name ? e.name : e}
                              type="text"
                              onChange={onChangeHandler}
                            />
                          </div>
                        ))}
                    </div>
                  );
                })}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWindow;
