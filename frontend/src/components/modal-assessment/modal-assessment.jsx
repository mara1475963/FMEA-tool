import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./modal-assessment.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalSOD_IsOpen } from "../../store/modal/modal.actions";
import { mainSocket } from "../../socket";
import { updateNodeData } from "../../store/fmea/fmea.actions";

const ModalAssessment = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModalSOD_IsOpen(false));
    setOpen(false);
  };
  const opened = useSelector((state) => state.modal.sodIsOpen);
  const sod = useSelector((state) => state.modal.SOD);
  const nodes = useSelector((state) => state.fmea.data);

  const [open, setOpen] = useState(opened);
  const [data, setData] = useState();
  const [socket, setSocket] = useState();

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

  const handler = (e) => {
    console.log(e.target.innerHTML);
    data.children.forEach((child) => {
      child.functions.forEach((fce) => {
        fce.failures.forEach((f) => {
          if (f.id === 0) {
            f.initialSeverity = e.target.innerHTML;
          }
        });
      });
    });

    dispatch(updateNodeData(data, { ...data }));
    setData({ ...data });
    socket && socket.emit("send-changes", { ...data });

    console.log(document.querySelector("#initialSeverity"));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ width: 800 }}>
        <table className="side-table">
          <thead>
            <tr>
              <th width="10%">S</th>

              <th width="20%">Effect</th>
              <th width="40%">Severity criteria</th>
              <th width="30%">Corporate or Product Line Examples</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={{ cursor: "pointer" }} onClick={handler}>
                10
              </td>
              <td rowSpan={2}>Very High</td>
              <td>
                Affects safe operation of the vehicle and/or other vehicles, the
                health of driver or passenger(s) or road users or pedestrians
              </td>
              <td></td>
            </tr>
            <tr>
              <td style={{ cursor: "pointer" }} onClick={handler}>
                9
              </td>

              <td>Noncompliance with regulations</td>
              <td></td>
            </tr>
            <tr>
              <td style={{ cursor: "pointer" }} onClick={handler}>
                8
              </td>
              <td rowSpan={2}>Moderately High</td>

              <td>
                Loss of primary vehicle function necessary for normal driving
                during expected service life.
              </td>
              <td></td>
            </tr>
            <tr>
              <td style={{ cursor: "pointer" }} onClick={handler}>
                7
              </td>

              <td>
                Degradation of primary vehicle function necessary for normal
                driving during expected service life.
              </td>
              <td></td>
            </tr>
            <tr>
              <td style={{ cursor: "pointer" }} onClick={handler}>
                6
              </td>
              <td rowSpan={3}>Moderately Low</td>

              <td>Loss of secondary vehicle function.</td>
              <td></td>
            </tr>
            <tr>
              <td style={{ cursor: "pointer" }} onClick={handler}>
                5
              </td>

              <td>Degradation of secondary vehicle function.</td>
              <td></td>
            </tr>
            <tr>
              <td style={{ cursor: "pointer" }} onClick={handler}>
                5
              </td>

              <td>
                Very objectionable appearance, sound, vibration, harshness, or
                haptics.
              </td>
              <td></td>
            </tr>
            <tr>
              <td style={{ cursor: "pointer" }} onClick={handler}>
                3
              </td>
              <td rowSpan={2}>Low</td>

              <td>
                Moderately objectionable appearance, sound, vibration,
                harshness, or haptics.
              </td>
              <td></td>
            </tr>
            <tr>
              <td style={{ cursor: "pointer" }} onClick={handler}>
                2
              </td>

              <td>
                Slightily objectionable appearance, sound, vibration, harshness,
                or haptics.
              </td>
              <td></td>
            </tr>
            <tr>
              <td style={{ cursor: "pointer" }} onClick={handler}>
                1
              </td>
              <td>Very Low</td>

              <td>No discernable effect</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Modal>
  );
};

export default ModalAssessment;
