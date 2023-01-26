import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Sidebar from "./components/sidebar/sidebar";
import TreeGraph from "./components/treeGraph/treeGraph";
import Table from "./components/table/table";
import Header from "./components/header/header";
import ModalWindow from "./components/modal/modal";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchFMEAData, fetchFMEADataAsync } from "./store/fmea/fmea.actions";
import FormPropsTextFields from "./components/test";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFMEAData());
  }, []);

  return (
    <div className="App">
      <div className="grid-container">
        <Navigation />
        <Sidebar />
        <Header />
        <TreeGraph />
        <Table />
      </div>
      <ModalWindow />
    </div>
  );
}

export default App;

{
  /* <div className="grid-item structure1">
          <h2> Structure 1</h2>
          <div className="high-level">
            <div draggable="true"> High Level</div>
          </div>
        </div>
        <div className="grid-item structure2">
          <h2> Structure 2</h2>
          <div onDragOver={allowDrop} onDrop={drop}></div>
        </div>
        <div className="grid-item structure3">
          <h2> Structure 3</h2>
        </div>
      </div> */
}
