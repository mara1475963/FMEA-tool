export const getPFMEAOccurance = (handler, element) => {
  return (
    <table className="side-table">
      <thead style={{ backgroundColor: "#cacaca" }}>
        <tr>
          <th width="50">O</th>

          <th width="120">Prediction of failure cause occuring</th>
          <th width="150">Type of Control</th>

          <th width="400">Prevention Controls</th>
          <th width="300">Corporate or Product Line Examples</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td
            style={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
            className={+element.innerHTML === 10 ? "selected" : ""}
            onClick={handler}
          >
            10
          </td>
          <td>Extremly High</td>
          <td>None</td>
          <td>No prevention controls.</td>
          <td>
            <textarea
              id="w3review"
              name="w3review"
              style={{ width: "100%", height: 30 }}
            ></textarea>
          </td>
        </tr>
        <tr>
          <td
            style={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
            className={+element.innerHTML === 9 ? "selected" : ""}
            onClick={handler}
          >
            9
          </td>
          <td rowSpan={2}>Very High</td>
          <td>Behavioral</td>
          <td>
            Prevention Controls will have little effect in preventing failure
            cause.
          </td>

          <td>
            <textarea
              id="w3review"
              name="w3review"
              style={{ width: "100%", height: 30 }}
            ></textarea>
          </td>
        </tr>
        <tr>
          <td
            style={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
            className={+element.innerHTML === 8 ? "selected" : ""}
            onClick={handler}
          >
            8
          </td>

          <td>Behavioral</td>
          <td>
            Prevention Controls will have little effect in preventing failure
            cause.
          </td>

          <td>
            <textarea
              id="w3review"
              name="w3review"
              style={{ width: "100%", height: 30 }}
            ></textarea>
          </td>
        </tr>
        <tr>
          <td
            style={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
            className={+element.innerHTML === 7 ? "selected" : ""}
            onClick={handler}
          >
            7
          </td>
          <td rowSpan={2}>High</td>
          <td rowSpan={4}>Behavioral or Technical</td>
          <td rowSpan={2}>
            Prevention controls somewhat effective in preventing the failure
            cause.
          </td>

          <td>
            <textarea
              id="w3review"
              name="w3review"
              style={{ width: "100%", height: 30 }}
            ></textarea>
          </td>
        </tr>
        <tr>
          <td
            style={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
            className={+element.innerHTML === 6 ? "selected" : ""}
            onClick={handler}
          >
            6
          </td>

          <td>
            <textarea
              id="w3review"
              name="w3review"
              style={{ width: "100%", height: 30 }}
            ></textarea>
          </td>
        </tr>
        <tr>
          <td
            style={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
            className={+element.innerHTML === 5 ? "selected" : ""}
            onClick={handler}
          >
            5
          </td>
          <td rowSpan={2}>Moderate</td>
          <td rowSpan={2}>
            Prevention controls are effective in preventing the failure cause.
          </td>

          <td>
            <textarea
              id="w3review"
              name="w3review"
              style={{ width: "100%", height: 30 }}
            ></textarea>
          </td>
        </tr>
        <tr>
          <td
            style={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
            className={+element.innerHTML === 4 ? "selected" : ""}
            onClick={handler}
          >
            4
          </td>

          <td>
            <textarea
              id="w3review"
              name="w3review"
              style={{ width: "100%", height: 30 }}
            ></textarea>
          </td>
        </tr>
        <tr>
          <td
            style={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
            className={+element.innerHTML === 3 ? "selected" : ""}
            onClick={handler}
          >
            3
          </td>
          <td>Low</td>
          <td rowSpan={2}>"Best Practices: Behavioral or Technical"</td>
          <td rowSpan={2}>
            Prevention controls are highly effective in preventing the failure
            cause.
          </td>

          <td>
            <textarea
              id="w3review"
              name="w3review"
              style={{ width: "100%", height: 30 }}
            ></textarea>
          </td>
        </tr>
        <tr>
          <td
            style={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
            className={+element.innerHTML === 2 ? "selected" : ""}
            onClick={handler}
          >
            2
          </td>
          <td>Very Low</td>

          <td>
            <textarea
              id="w3review"
              name="w3review"
              style={{ width: "100%", height: 30 }}
            ></textarea>
          </td>
        </tr>
        <tr>
          <td
            style={{
              cursor: "pointer",
              fontWeight: "bold",
            }}
            className={+element.innerHTML === 1 ? "selected" : ""}
            onClick={handler}
          >
            1
          </td>
          <td>Extremly Low</td>
          <td>Technical</td>
          <td>
            Prevention controls are extremely effective in preventing the
            failure cause due to design (e.g. Part geometry) or process (e.g.
            Fixture or Tool design). Intent of prevention controls - Failure
            Mode cannot be physically produced due to the Failure Cause.
          </td>

          <td>
            <textarea
              id="w3review"
              name="w3review"
              style={{ width: "100%", height: 30 }}
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
