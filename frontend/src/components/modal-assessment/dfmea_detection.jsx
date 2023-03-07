export const getDFMEADetection = (handler, element, data) => {
  return (
    <table class="side-table">
      <thead>
        <tr>
          <th width="50">D</th>
          <th width="120">Ability to Detect</th>
          <th width="450">Detection Method Maturity</th>
          <th width="200">Opportunity for Detection </th>
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
          <td rowspan="2">Very Low</td>
          <td>Test procedure yet to be developed.</td>
          <td>Test method not defined</td>
          <td>
            <textarea
              style={{ width: "100%", height: 30 }}
              defaultValue={data.detectionExamples[9]}
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
          <td>
            Test method not designed specifically to detect failure mode or
            cause.
          </td>
          <td>Pass-Fail, Test-to-Fail, Degradation Testing</td>
          <td>
            <textarea
              style={{ width: "100%", height: 30 }}
              defaultValue={data.detectionExamples[8]}
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
          <td rowspan="2">Low</td>
          <td>New test method; not proven.</td>
          <td>Pass-Fail, Test-to-Fail, Degradation Testing</td>
          <td>
            <textarea
              style={{ width: "100%", height: 30 }}
              defaultValue={data.detectionExamples[7]}
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
          <td rowspan="3">
            Proven test method for verification of functionality or validation
            of performance, quality, reliability and durability; planned timing
            is later in the product development cycle such that test failures
            may result in production delays for re-design and/or re-tooling.
          </td>
          <td>Pass-Fail Testing</td>
          <td>
            <textarea
              style={{ width: "100%", height: 30 }}
              defaultValue={data.detectionExamples[6]}
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
          <td rowspan="2">Moderate</td>
          <td>Test-to-Failure</td>
          <td>
            <textarea
              style={{ width: "100%", height: 30 }}
              defaultValue={data.detectionExamples[5]}
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
          <td>Degradation Testing</td>
          <td>
            <textarea
              style={{ width: "100%", height: 30 }}
              defaultValue={data.detectionExamples[4]}
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
          <td rowspan="3">High</td>
          <td rowspan="3">
            Proven test for verification of functionality or validation of
            performance, quality, reliability and durability; planned timming is
            sufficient to modify production tools before release for production.
          </td>
          <td>Pass-Fail Testing</td>
          <td>
            <textarea
              style={{ width: "100%", height: 30 }}
              defaultValue={data.detectionExamples[3]}
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
          <td>Test-to-Failure</td>
          <td>
            <textarea
              style={{ width: "100%", height: 30 }}
              defaultValue={data.detectionExamples[2]}
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
          <td>Degradation Testing</td>
          <td>
            <textarea
              style={{ width: "100%", height: 30 }}
              defaultValue={data.detectionExamples[1]}
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
          <td rowspan="1">Very High</td>
          <td colspan="2">
            Prior testing confirmed that failure mode or cause cannot occur, or
            detection methods proven to always detect the failure mode or
            failure cause.
          </td>
          <td>
            <textarea
              style={{ width: "100%", height: 30 }}
              defaultValue={data.detectionExamples[0]}
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
