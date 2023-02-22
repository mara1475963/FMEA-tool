import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./modal-assessment.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalSOD_IsOpen } from "../../store/modal/modal.actions";
import { mainSocket } from "../../socket";
import { updateNodeData } from "../../store/fmea/fmea.actions";
import { severity, occurence, detection } from "../../data/dataJS";
import { findObject } from "../../helpers";
import { TextField } from "@mui/material";

const ModalAssessment = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModalSOD_IsOpen(false));
    setOpen(false);
  };
  const opened = useSelector((state) => state.modal.sodIsOpen);
  const element = useSelector((state) => state.modal.SODobject);
  const nodes = useSelector((state) => state.fmea.data);
  const type = useSelector((state) => state.modal.SODtype);

  const [open, setOpen] = useState(opened);
  const [data, setData] = useState();
  const [socket, setSocket] = useState();
  const [SODtype, setSODtype] = useState(null);

  //console.log(object);

  useEffect(() => {
    setSocket(mainSocket);

    return () => {
      mainSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  useEffect(() => {
    setData(nodes);
  }, [nodes]);

  useEffect(() => {
    switch (type) {
      case "initialSeverity":
        setSODtype(severity);
        return;
      case "initialOccurance":
        setSODtype(occurence);
        return;
      case "initialDetection":
        setSODtype(detection);
        return;
    }
  }, [type]);

  const handler = (e) => {
    let result = {};
    if (type === "initialSeverity") {
      console.log(e.target.innerHTML);

      data.children.forEach((child) => {
        child.functions?.forEach((fce) => {
          fce.failures?.forEach((f) => {
            if (f.id === +element.dataset.fmid) {
              f.initialSeverity = +e.target.innerHTML;
            }
          });
        });
      });

      console.log(data);

      dispatch(updateNodeData(data, { ...data }));
      setData({ ...data });
      socket && socket.emit("send-changes", { ...data });
    }

    const id =
      element.parentElement.parentElement.querySelector(
        "#failure-cause-id"
      ).value;

    [result] = findObject(data, "id", id);

    result[element.id] = +e.target.innerHTML;
    console.log(result);

    const S =
      element.parentElement.parentElement.querySelector("#initialSeverity");
    const O =
      element.parentElement.parentElement.querySelector("#initialOccurance");
    const D =
      element.parentElement.parentElement.querySelector("#initialDetection");
    const S2 =
      element.parentElement.parentElement.querySelector("#finalSeverity");
    const O2 =
      element.parentElement.parentElement.querySelector("#finalOccurance");
    const D2 =
      element.parentElement.parentElement.querySelector("#finalDetection");

    console.log(S.innerHTML);

    if (!S.innerHTML || !O.innerHTML || !D.innerHTML) {
    } else {
      //console.log(+S.innerHTML, +O.innerHTML, +D.innerHTML);
      const APproduct = +S.innerHTML * +O.innerHTML * +D.innerHTML;

      // AP.innerHTML = APproduct;
      data.children.forEach((child) => {
        child.children?.forEach((ch) => {
          ch.functions?.forEach((fce) => {
            fce.failures?.forEach((f) => {
              if (f.id === result.id) {
                f["initialAP"] = APproduct;
              }
            });
          });
        });
      });
      data.children?.forEach((child) => {
        child.functions?.forEach((fce) => {
          fce.failures?.forEach((f) => {
            f.failures &&
              f.failures.forEach((fc) => {
                if (fc.id === result.id) {
                  fc["initialAP"] = APproduct;
                }
              });
          });
        });
      });
      console.log(data);
      dispatch(updateNodeData(data, { ...data }));
      setData({ ...data });
    }
    if (!S2.innerHTML || !O2.innerHTML || !D2.innerHTML) {
    } else {
      const APproduct2 = +S2.innerHTML * +O2.innerHTML * +D2.innerHTML;
      //AP2.innerHTML = APproduct2;
      data.children?.forEach((child) => {
        child.children?.forEach((ch) => {
          ch.functions?.forEach((fce) => {
            fce.failures?.forEach((f) => {
              if (f.id === result.id) {
                f["finalAP"] = APproduct2;
              }
            });
          });
        });
      });
      data.children.forEach((child) => {
        child.functions?.forEach((fce) => {
          fce.failures?.forEach((f) => {
            f.failures &&
              f.failures.forEach((fc) => {
                if (fc.id === result.id) {
                  fc["finalAP"] = APproduct2;
                }
              });
          });
        });
      });
      dispatch(updateNodeData(data, { ...data }));
      setData({ ...data });
    }

    data.children.forEach((child) => {
      child.children &&
        child.children.forEach((ch) => {
          ch.functions &&
            ch.functions.forEach((fce) => {
              fce.failures.forEach((f) => {
                if (f.id === result.id) {
                  f[element.id] = +e.target.innerHTML;
                }
              });
            });
        });
    });
    data.children.forEach((child) => {
      child.functions &&
        child.functions.forEach((fce) => {
          fce.failures.forEach((f) => {
            f.failures &&
              f.failures.forEach((fc) => {
                if (fc.id === result.id) {
                  fc[element.id] = +e.target.innerHTML;
                }
              });
          });
        });
    });

    dispatch(updateNodeData(data, { ...data }));
    setData({ ...data });
    socket && socket.emit("send-changes", data);

    handleClose();

    //console.log(document.querySelector("#initialSeverity"));
  };

  return (
    SODtype && (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ width: 1000, maxHeight: 650, overflowY: "auto" }}>
          <table className="side-table">
            <thead style={{ backgroundColor: "#cacaca" }}>
              <tr>
                <th width="50">
                  {(type === "initialSeverity" && "S") ||
                    (type === "initialOccurance" && "O") ||
                    (type === "initialDetection" && "D")}
                </th>

                <th width="120">
                  {(type === "initialSeverity" && "Effect") ||
                    (type === "initialOccurance" &&
                      "Prediction of Failure Cause Occurring") ||
                    (type === "initialDetection" && "Ability to Detect")}
                </th>
                <th width="450">
                  {(type === "initialSeverity" && "Severity Criteria") ||
                    (type === "initialOccurance" && "Occurrence criteria") ||
                    (type === "initialDetection" &&
                      "Detection Method Maturity")}
                </th>
                {type === "initialDetection" && (
                  <th width="200">Opportunity for Detection </th>
                )}
                <th width="300">Corporate or Product Line Examples</th>
              </tr>
            </thead>

            <tbody>
              {SODtype.effects.map((effect, i) => {
                const criteria = effect.criteria.filter((_, idx) => idx !== 0);
                const opportunities = effect.opportunity?.filter(
                  (_, idx) => idx !== 0
                );
                const numValues = effect.numValues.filter(
                  (_, idx) => idx !== 0
                );
                const examples = effect.examples.filter((_, idx) => idx !== 0);

                return (
                  <>
                    <tr key={i}>
                      <td
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                        className={
                          +element.innerHTML === effect.numValues[0]
                            ? "selected"
                            : ""
                        }
                        onClick={handler}
                      >
                        {effect.numValues[0]}
                      </td>
                      <td rowSpan={effect.criteria.length}>{effect.name}</td>
                      <td>{effect.criteria[0]}</td>
                      {type === "initialDetection" && (
                        <td>{effect.opportunity && effect.opportunity[0]}</td>
                      )}
                      <td>
                        <textarea
                          id="w3review"
                          name="w3review"
                          style={{ width: "100%", height: 30 }}
                        >
                          {effect.examples[0]}
                        </textarea>
                      </td>
                    </tr>
                    {criteria.map((c, idx) => {
                      return (
                        <tr key={idx}>
                          <td
                            style={{ cursor: "pointer", fontWeight: "bold" }}
                            className={
                              +element.innerHTML === numValues[idx]
                                ? "selected"
                                : ""
                            }
                            onClick={handler}
                          >
                            {numValues[idx]}
                          </td>

                          <td>{criteria[idx]}</td>
                          {type === "initialDetection" && (
                            <td>{opportunities && opportunities[idx]}</td>
                          )}
                          <td>
                            <textarea
                              id="w3review"
                              name="w3review"
                              style={{ width: "100%", height: 30 }}
                            >
                              {examples[idx]}
                            </textarea>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Modal>
    )
  );
};

export default ModalAssessment;
