import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "./modal-sod.scss";

import { useDispatch, useSelector } from "react-redux";
import { setModalSODSetupUpIsOpen } from "../../../store/modal/modal.actions";
import { selectFMEAData } from "../../../store/fmea/fmea.selectors";
import { mainSocket } from "../../../socket";
import { updateNodeData } from "../../../store/fmea/fmea.actions";

function TabPanel(props) {
  const dispatch = useDispatch();
  let { children, value, index, type, ...other } = props;
  const data = useSelector(selectFMEAData);
  const [socket, setSocket] = useState();

  const [examples, setExamples] = useState(data.dfmeaExamples.severityExamples);

  useEffect(() => {
    setSocket(mainSocket);

    return () => {
      mainSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (type === "DFMEA") {
      if (children.includes("Severity"))
        setExamples(data.dfmeaExamples.severityExamples);
      else if (children.includes("Occurance"))
        setExamples(data.dfmeaExamples.occuranceExamples);
      else if (children.includes("Detection"))
        setExamples(data.dfmeaExamples.detectionExamples);
    } else {
      if (children.includes("Severity"))
        setExamples(data.pfmeaExamples.severityExamples);
      else if (children.includes("Occurance"))
        setExamples(data.pfmeaExamples.occuranceExamples);
      else if (children.includes("Detection"))
        setExamples(data.pfmeaExamples.detectionExamples);
    }
  }, [data, children, type]);

  const handler2 = (e) => {
    const element = e.target;
    const idx = element.dataset.index;

    if (type === "DFMEA") {
      if (children.includes("Severity"))
        data.dfmeaExamples.severityExamples[idx] = element.value;
      else if (children.includes("Occurance"))
        data.dfmeaExamples.occuranceExamples[idx] = element.value;
      else if (children.includes("Detection"))
        data.dfmeaExamples.detectionExamples[idx] = element.value;
    } else {
      if (children.includes("Severity"))
        data.pfmeaExamples.severityExamples[idx] = element.value;
      else if (children.includes("Occurance"))
        data.pfmeaExamples.occuranceExamples[idx] = element.value;
      else if (children.includes("Detection"))
        data.pfmeaExamples.detectionExamples[idx] = element.value;
    }

    dispatch(updateNodeData(data, { ...data }));
    mainSocket && socket.emit("send-changes", data);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && examples && (
        <form onChange={handler2}>
          <table className="side-table">
            <thead style={{ backgroundColor: "#cacaca" }}>
              <tr>
                <th width="50">{children}</th>

                <th width="600">Corporate or Product Line Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{children.includes("Detection") ? "1" : "10"}</td>

                <td>
                  <textarea
                    data-index="0"
                    defaultValue={examples[0]}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>{children.includes("Detection") ? "2" : "9"}</td>

                <td>
                  <textarea
                    data-index="1"
                    defaultValue={examples[1]}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>{children.includes("Detection") ? "3" : "8"}</td>

                <td>
                  <textarea
                    data-index="2"
                    defaultValue={examples[2]}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>{children.includes("Detection") ? "4" : "7"}</td>

                <td>
                  <textarea
                    data-index="3"
                    defaultValue={examples[3]}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>{children.includes("Detection") ? "5" : "6"}</td>

                <td>
                  <textarea
                    data-index="4"
                    defaultValue={examples[4]}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>{children.includes("Detection") ? "6" : "5"}</td>

                <td>
                  <textarea
                    data-index="5"
                    defaultValue={examples[5]}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>{children.includes("Detection") ? "7" : "4"}</td>

                <td>
                  <textarea
                    data-index="6"
                    defaultValue={examples[6]}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>{children.includes("Detection") ? "8" : "3"}</td>

                <td>
                  <textarea
                    data-index="7"
                    defaultValue={examples[7]}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>{children.includes("Detection") ? "9" : "2"}</td>

                <td>
                  <textarea
                    data-index="8"
                    defaultValue={examples[8]}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>{children.includes("Detection") ? "10" : "1"}</td>

                <td>
                  <textarea
                    data-index="9"
                    defaultValue={examples[9]}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ModalSOD = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModalSODSetupUpIsOpen(false));
  };

  const opened = useSelector((state) => state.modal.sodSetUpIsOpen);

  const [value, setValue] = React.useState(0);
  const [type, setType] = React.useState("DFMEA");
  const data = useSelector(selectFMEAData);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setType(data?.header.type.name);
  }, [data]);

  return (
    <Modal
      open={opened}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ width: 700 }}>
        <div className="sod-container">
          <div className="tabs-container">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Severity" {...a11yProps(0)} />
              <Tab label="Occurance" {...a11yProps(1)} />
              <Tab label="Detection" {...a11yProps(2)} />
            </Tabs>
            {data?.header.type.name}
          </div>
          <div className="tabs-content">
            <TabPanel value={value} index={0} type={type}>
              Severity
            </TabPanel>
            <TabPanel value={value} index={1} type={type}>
              Occurance
            </TabPanel>
            <TabPanel value={value} index={2} type={type}>
              Detection
            </TabPanel>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalSOD;
