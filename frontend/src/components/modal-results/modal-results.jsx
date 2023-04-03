import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./modal-results.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalResultsIsOpen } from "../../store/modal/modal.actions";

import { updateNodeData } from "../../store/fmea/fmea.actions";
import {
  selectFinalAPs,
  selectFMEAData,
  selectInitialAPs,
  selectMainFailures,
} from "../../store/fmea/fmea.selectors";
import parse from "html-react-parser";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { findObject } from "../../helpers";
import { mainSocket } from "../../socket";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ModalResults = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModalResultsIsOpen(false));
    setOpen(false);
  };
  const failures = useSelector(selectMainFailures);
  const opened = useSelector((state) => state.modal.resultsIsOpen);

  const initialAPs = useSelector(selectInitialAPs);
  const finalAPs = useSelector(selectFinalAPs);
  const mainData = useSelector(selectFMEAData);

  const [open, setOpen] = useState(opened);
  let finished = true;
  const [data2, setData] = useState(null);
  const [socket, setSocket] = useState();

  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  useEffect(() => {
    setData({ ...mainData });
  }, [mainData]);

  useEffect(() => {
    setSocket(mainSocket);

    return () => {
      mainSocket.disconnect();
    };
  }, []);

  const generateFailuresResults = () => {
    let result = "";
    let id = 0;

    for (const [idx, lvl2F] of Object.entries(failures)) {
      const lvl3F = lvl2F.failures?.filter((f) => f.depth === 2);

      if (lvl3F) {
        for (const lvl3 of lvl3F) {
          if (!lvl3.closed && !lvl3.finalAP) {
            finished = false;
          }
          result += `<tr>
                            <td>${++id}</td>
                            <td>${lvl2F.name + "=>" + lvl3.name}</td>
                            <td>${
                              lvl2F.initialSeverity
                                ? lvl2F.initialSeverity
                                : "--"
                            }</td>
                            <td>${
                              lvl3.initialOccurance
                                ? lvl3.initialOccurance
                                : "--"
                            }</td>
                            <td>${
                              lvl3.initialDetection
                                ? lvl3.initialDetection
                                : "--"
                            }</td>
                            <td>${lvl3.initialAP ? lvl3.initialAP : "--"}</td>
                            ${
                              lvl3.finalAP
                                ? `
                                <td>Optimization has been set</td>
                                <td>${lvl3.finalSeverity}</td>
                                <td>${lvl3.finalOccurance}</td>
                                <td>${lvl3.finalDetection}</td>
                                <td>${lvl3.finalAP}</td>`
                                : `<td><input data-id=${
                                    lvl3.id
                                  } type="checkbox" ${
                                    lvl3.closed ? "checked" : ""
                                  } /></td>
                                    <td></td><td></td><td></td><td></td>
                                `
                            }</tr>`;
        }
      }
      //console.log(result);
    }
    // console.log(result);
    return result;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Action priorities",
      },
    },
  };

  const labels = ["L", "M", "H"];

  const data = {
    labels,
    datasets: [
      {
        label: "initial AP",
        data: initialAPs,
        backgroundColor: "orange",
      },
      {
        label: "final AP",
        data: finalAPs,
        backgroundColor: "green",
      },
    ],
  };

  const handler = (e) => {
    const [result] = findObject(data2, "id", e.target.dataset.id);
    result.closed = e.target.checked;

    data2.children.forEach((child) => {
      child.children &&
        child.children.forEach((ch) => {
          ch.functions &&
            ch.functions.forEach((fce) => {
              fce.failures.forEach((f) => {
                if (f.id === result.id) {
                  f["closed"] = e.target.checked;
                }
              });
            });
        });
    });
    data2.children.forEach((child) => {
      child.functions &&
        child.functions.forEach((fce) => {
          fce.failures.forEach((f) => {
            f.failures &&
              f.failures.forEach((fc) => {
                if (fc.id === result.id) {
                  fc["closed"] = e.target.checked;
                }
              });
          });
        });
    });

    dispatch(updateNodeData(data2, { ...data2 }));
    setData({ ...data2 });
    socket && socket.emit("send-changes", { ...data2 });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ width: 700 }}>
        <div className="grapth-container">
          <Bar options={options} data={data} />
        </div>
        <form onChange={handler}>
          <table className="result-table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>{"Failure Mode=>FailureCause"}</th>
                <th>S1</th>
                <th>O1</th>
                <th>D1</th>
                <th>AP1</th>
                <th>No Optimization needed</th>
                <th>S2</th>
                <th>O2</th>
                <th>D2</th>
                <th>AP2</th>
              </tr>
            </thead>
            <tbody>{parse(generateFailuresResults())}</tbody>
          </table>
        </form>

        {finished ? (
          <h4 style={{ color: "green" }}>All risks solved</h4>
        ) : (
          <h4 style={{ color: "red" }}>Some risks unsolved</h4>
        )}
      </Box>
    </Modal>
  );
};

export default ModalResults;
