import React from "react";
import "./modal.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { ModalContext } from "../../context/modalWindowContext";
import { FMEADataContext } from "../../context/fmeaDataContext";

const ModalWindow = () => {
  const { node, setNode, add } = useContext(ModalContext);
  const { data, update } = useContext(FMEADataContext);

  console.log(data);
  const toggleWindow = () => {
    document.querySelector(".add-recipe-window").classList.toggle("hidden");
    document.querySelector(".overlay").classList.toggle("hidden");
    update(data, node);
  };

  const onChangeHandler = (e) => {
    const element = e.target;
    console.log(e.target);
    node[element.name] = element.value;
    add(node);
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
                    <>
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
                    </>
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
