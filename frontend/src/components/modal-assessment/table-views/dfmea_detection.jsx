export const getDFMEADetection = (handler, handler2, element, data) => {
  return (
    <form onChange={handler2}>
      <table className="side-table">
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
            <td rowSpan="2">Very Low</td>
            <td>Test procedure yet to be developed.</td>
            <td>Test method not defined</td>
            <td>{data.dfmeaExamples.detectionExamples[9]}</td>
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
            <td>{data.dfmeaExamples.detectionExamples[8]}</td>
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
            <td rowSpan="2">Low</td>
            <td>New test method; not proven.</td>
            <td>Pass-Fail, Test-to-Fail, Degradation Testing</td>
            <td>{data.dfmeaExamples.detectionExamples[7]}</td>
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
            <td rowSpan="3">
              Proven test method for verification of functionality or validation
              of performance, quality, reliability and durability; planned
              timing is later in the product development cycle such that test
              failures may result in production delays for re-design and/or
              re-tooling.
            </td>
            <td>Pass-Fail Testing</td>
            <td>{data.dfmeaExamples.detectionExamples[6]}</td>
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
            <td rowSpan="2">Moderate</td>
            <td>Test-to-Failure</td>
            <td>{data.dfmeaExamples.detectionExamples[5]}</td>
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
            <td>{data.dfmeaExamples.detectionExamples[4]}</td>
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
            <td rowSpan="3">High</td>
            <td rowSpan="3">
              Proven test for verification of functionality or validation of
              performance, quality, reliability and durability; planned timming
              is sufficient to modify production tools before release for
              production.
            </td>
            <td>Pass-Fail Testing</td>
            <td>{data.dfmeaExamples.detectionExamples[3]}</td>
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
            <td>{data.dfmeaExamples.detectionExamples[2]}</td>
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
            <td>{data.dfmeaExamples.detectionExamples[1]}</td>
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
            <td rowSpan="1">Very High</td>
            <td colSpan="2">
              Prior testing confirmed that failure mode or cause cannot occur,
              or detection methods proven to always detect the failure mode or
              failure cause.
            </td>
            <td>{data.dfmeaExamples.detectionExamples[0]}</td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
