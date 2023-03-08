export const getPFMEADetection = (handler, handler2, element, data) => {
  return (
    <form onChange={handler2}>
      <table className="side-table">
        <thead style={{ backgroundColor: "#cacaca" }}>
          <tr>
            <th width="50">D</th>

            <th width="80">Ability to Detect</th>
            <th width="250">Detection Method maturity</th>

            <th width="500">Opportunity for Detection</th>

            <th width="200">Corporate or Product Line Examples</th>
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
            <td rowSpan={2}>Very Low</td>
            <td>
              No testing or inspection method has been established or is known.
            </td>
            <td>The failure mode will not or cannot be detected.</td>

            <td>
              <textarea
                data-index={9}
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
              It is unlikely that the testing or inspection method will detect
              the failure mode.
            </td>
            <td>
              The failure mode is not easily detected through random or sporadic
              audits.
            </td>

            <td>
              <textarea
                data-index={8}
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
            <td rowSpan={2}>Low</td>
            <td rowSpan={2}>
              Test or inspection method has not been proven to be effective and
              reliable (e.g. plant has little or no experience with method,
              gauge R&R results marginal on comparable process or this
              application..)
            </td>
            <td>
              Human inspection (visual, tactile, audible), or use of manual
              gauging (attribute or variable) that should detect the failure
              mode or failure cause.
            </td>

            <td>
              <textarea
                data-index={7}
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

            <td>
              Machine-based detection (automated or semi-automated with
              notification by light, buzzer, etc.) or use of inspection
              equipment such as coordinate measuring machine that should detect
              failure mode or failure cause.
            </td>
            <td>
              <textarea
                data-index={6}
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
            <td rowSpan={2}>Moderate</td>
            <td rowSpan={2}>
              Test or inspection method has been proven to be effective and
              reliable (e.g. plant has experience with method on identicial
              process or this application, gauge R&R results are acceptable ..)
            </td>
            <td>
              Human inspection (visual, tactile, audible), or use of manual
              gauging (attribute or variable) that will detect the failure mode
              or failure cause.
            </td>

            <td>
              <textarea
                data-index={5}
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

            <td>
              Machine-based detection (automated or semi-automated with
              notification by light, buzzer, etc.) or use of inspection
              equipment such as coordinate measuring machine that will detect
              failure mode or failure cause.
            </td>
            <td>
              <textarea
                data-index={4}
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
            <td rowSpan={3}>High</td>
            <td rowSpan={2}>
              System has been proven to be effective and reliable (e.g. plant
              has experience with method, gauge R&R results are acceptable on
              comparable process or this application..)
            </td>
            <td>
              Machine based method that will detect the failure mode downstream,
              prevent further processing or system will identify the product as
              discrepant and allow it automatically move forward in the process
              until the designated reject unload area. Discrepant products will
              be controlled by a robust system that will prevent the outflow of
              the product from the facility.
            </td>

            <td>
              <textarea
                data-index={3}
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

            <td>
              Machine based detection that will detect the failure mode
              in-station, prevent further processing, or system will identify
              the product as discrepant and allow it automatically move forward
              in the process until the designated reject unload area. Discrepant
              products will be controlled by a robust system that will prevent
              the outflow of the product from the facility.
            </td>
            <td>
              <textarea
                data-index={2}
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

            <td>
              Detection has been proven to be effective and reliable (e.g. plant
              has experience with method, error-proofing verifications, etc.).
            </td>
            <td>
              Machine detection that will detect the cause and prevent the
              failure mode (discrepant part) from being produced.
            </td>
            <td>
              <textarea
                data-index={1}
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
            <td>Very High</td>
            <td colSpan={2}>
              Failure mode cannot be physically produced as-designed or
              processed, or detection methods proven to always detect the
              failure mode or failure cause.
            </td>

            <td>
              <textarea
                data-index={0}
                style={{ width: "100%", height: 30 }}
                defaultValue={data.detectionExamples[0]}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
