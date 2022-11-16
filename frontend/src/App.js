import logo from "./logo.svg";
import "./App.css";

function App() {
  const allowDrop = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.preventDefault();
    console.log(e);

    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
  };

  return (
    <div className="App">
      <div className="grid-container">
        <div className="grid-item structure1">
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
      </div>
    </div>
  );
}

export default App;
