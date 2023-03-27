import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./modal-assessment.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalSOD_IsOpen } from "../../store/modal/modal.actions";
import { mainSocket } from "../../socket";
import { updateNodeData } from "../../store/fmea/fmea.actions";
import { severity, occurence } from "../../data/dataJS";
import { findObject } from "../../helpers";
import { selectFMEAData } from "../../store/fmea/fmea.selectors";
import { getPFMEASeverity } from "./table-views/pfmea_severity";
import { getPFMEAOccurance } from "./table-views/pfmea_occurance";
import { getPFMEADetection } from "./table-views/pfmea_detection";
import { getDFMEADetection } from "./table-views/dfmea_detection";

const ModalAssessment = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModalSOD_IsOpen(false));
    setOpen(false);
  };
  const nodes = useSelector(selectFMEAData);
  const opened = useSelector((state) => state.modal.sodIsOpen);
  const element = useSelector((state) => state.modal.SODobject);
  const type = useSelector((state) => state.modal.SODtype);

  const [open, setOpen] = useState(opened);
  const [data, setData] = useState();
  const [socket, setSocket] = useState();
  const [SODtype, setSODtype] = useState(null);

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
      case "finalSeverity":
        setSODtype(severity);
        return;
      case "initialOccurance":
      case "finalOccurance":
        setSODtype(occurence);
        return;
      default:
        setSODtype(occurence);
        return;
    }
  }, [type]);

  const handler = (e) => {
    if (type.includes("Severity")) {
      data.children.forEach((child) => {
        child.functions?.forEach((fce) => {
          fce.failures?.forEach((f) => {
            if (f.id === +element.dataset.fmid) {
              f[type] = +e.target.innerHTML;
            }
          });
        });
      });

      dispatch(updateNodeData(data, { ...data }));
      setData({ ...data });
      socket && socket.emit("send-changes", { ...data });
    }

    const id =
      element.parentElement.parentElement.querySelector(
        "#failure-cause-id"
      ).value;

    const [result] = findObject(data, "id", id);
    result[element.id] = +e.target.innerHTML;

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

    if (S.innerHTML && O.innerHTML && D.innerHTML) {
      let APproduct = 0;
      if (type.includes("Severity")) {
        APproduct = +e.target.innerHTML * +O.innerHTML * +D.innerHTML;
      } else if (type.includes("Occurance")) {
        APproduct = S.innerHTML * +e.target.innerHTML * +D.innerHTML;
      } else if (type.includes("Detection")) {
        APproduct = S.innerHTML * +O.innerHTML * +e.target.innerHTML;
      } else {
        APproduct = +S.innerHTML * +O.innerHTML * +D.innerHTML;
      }

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
      dispatch(updateNodeData(data, { ...data }));
      setData({ ...data });
    }

    if (!S2.innerHTML || !O2.innerHTML || !D2.innerHTML) {
    } else {
      let APproduct2 = 0;
      if (type.includes("Severity")) {
        APproduct2 = +e.target.innerHTML * +O2.innerHTML * +D2.innerHTML;
      } else if (type.includes("Occurance")) {
        APproduct2 = S2.innerHTML * +e.target.innerHTML * +D2.innerHTML;
      } else if (type.includes("Detection")) {
        APproduct2 = S2.innerHTML * +O2.innerHTML * +e.target.innerHTML;
      } else {
        APproduct2 = +S2.innerHTML * +O2.innerHTML * +D2.innerHTML;
      }
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
  };

  const handler2 = (e) => {
    const element = e.target;
    const index = element.dataset.index;

    if (type.includes("Severity")) data.severityExamples[index] = element.value;
    else if (type.includes("Occurance"))
      data.occuranceExamples[index] = element.value;
    else if (type.includes("Detection"))
      data.detectionExamples[index] = element.value;

    dispatch(updateNodeData(data, { ...data }));
    setData({ ...data });
    socket && socket.emit("send-changes", data);
  };

  let counter = -1;

  return (
    SODtype &&
    type && (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ width: 1000, maxHeight: 650, overflowY: "auto" }}>
          {nodes.header.type.name === "DFMEA" ? (
            type.includes("Detection") ? (
              getDFMEADetection(handler, handler2, element, data)
            ) : (
              <form onChange={handler2}>
                <table className="side-table">
                  <thead style={{ backgroundColor: "#cacaca" }}>
                    <tr>
                      <th width="50">
                        {(type.includes("Severity") && "S") ||
                          (type.includes("Occurance") && "O")}
                      </th>

                      <th width="120">
                        {(type.includes("Severity") && "Effect") ||
                          (type.includes("Occurance") &&
                            "Prediction of Failure Cause Occurring")}
                      </th>
                      <th width="450">
                        {(type.includes("Severity") && "Severity Criteria") ||
                          (type.includes("Occurance") && "Occurrence criteria")}
                      </th>

                      <th width="300">Corporate or Product Line Examples</th>
                    </tr>
                  </thead>

                  <tbody>
                    {SODtype.effects.map((effect, i) => {
                      const criteria = effect.criteria.filter(
                        (_, idx) => idx !== 0
                      );
                      const opportunities = effect.opportunity?.filter(
                        (_, idx) => idx !== 0
                      );
                      const numValues = effect.numValues.filter(
                        (_, idx) => idx !== 0
                      );

                      counter++;

                      return (
                        <React.Fragment key={i}>
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
                            <td rowSpan={effect.criteria.length}>
                              {effect.name}
                            </td>
                            <td>{effect.criteria[0]}</td>

                            <td>
                              {type.includes("Severity")
                                ? data.dfmeaExamples.severityExamples[counter]
                                : data.dfmeaExamples.occuranceExamples[counter]}
                            </td>
                          </tr>

                          {criteria.map((c, idx) => {
                            counter++;
                            return (
                              <tr key={idx}>
                                <td
                                  style={{
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                  }}
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
                                  {data.dfmeaExamples.severityExamples[counter]}
                                </td>
                              </tr>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </form>
            )
          ) : (
            (type.includes("Severity") &&
              getPFMEASeverity(handler, handler2, element, data)) ||
            (type.includes("Occurance") &&
              getPFMEAOccurance(handler, handler2, element, data)) ||
            (type.includes("Detection") &&
              getPFMEADetection(handler, handler2, element, data))
          )}
        </Box>
      </Modal>
    )
  );
};

export default ModalAssessment;
