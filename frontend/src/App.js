import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchFMEAData } from "./store/fmea/fmea.actions";
import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";

import "./App.css";
import Navigation from "./components/navigation/navigation";
import Sidebar from "./components/sidebar/sidebar";
import TreeGraph from "./components/treeGraph/treeGraph";
import Table from "./components/table/table";
import Header from "./components/header/header";

import { setCurrentUser } from "./store/user/user.action";
import ModalSOD from "./components/modal/modal-SOD/modal-sod";
import ModalLoad from "./components/modal/modal-load-analysis/modal-load";
import ModalLogger from "./components/modal/modal-logging/modal-logging";
import ModalResults from "./components/modal/modal-results/modal-results";
import ModalWindow from "./components/modal/modal-edit/modal-edit";
import ModalAssessment from "./components/modal/modal-assessment/modal-assessment";
import ModalAccount from "./components/modal/modal-account/modal-account";
import ToastComponent from "./components/toast/toast";

function App() {
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    dispatch(fetchFMEAData("DFMEA"));
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <ToastComponent />
      <div className="grid-container">
        <Navigation graphRef={ref} />

        <Sidebar />
        <Header />
        <TreeGraph graphRef={ref} toExport={false} />
        <Table />
      </div>
      <ModalWindow />
      <ModalLoad />
      <ModalAssessment />
      <ModalResults />
      <ModalAccount />
      <ModalLogger />
      <ModalSOD />
      <TreeGraph graphRef={ref} toExport={true} />
    </div>
  );
}

export default App;
