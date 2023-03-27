import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./modal-results.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalResultsIsOpen } from "../../store/modal/modal.actions";

import { updateNodeData } from "../../store/fmea/fmea.actions";
import {
  selectFinalAPs,
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

  const [open, setOpen] = useState(opened);

  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  const generateFailuresResults = () => {
    let result = "";
    let id = 0;

    for (const [idx, lvl2F] of Object.entries(failures)) {
      const lvl3F = lvl2F.failures?.filter((f) => f.depth === 2);

      if (lvl3F) {
        for (const lvl3 of lvl3F) {
          console.log(lvl3);
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
                                : `<td><input data-id=${lvl3.id} type="checkbox" /></td>
                                    <td></td><td></td><td></td><td></td>
                                `
                            }
                            
                            </tr>
                            `;
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
    console.log(e.target.checked, e.target.dataset.id);
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
          <table className="result-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>{"Failure Mode:FailureCause"}</th>
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
      </Box>
    </Modal>
  );
};

export default ModalResults;
