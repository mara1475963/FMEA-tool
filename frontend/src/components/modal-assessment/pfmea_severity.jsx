export const getPFMEASeverity = (handler, element) => {
  return (
    <table className="side-table">
      <thead style={{ backgroundColor: "#cacaca" }}>
        <tr>
          <th width="50">S</th>

          <th width="80">Effect</th>
          <th width="350">Impact to your plant</th>

          <th width="450">Impact to ship-to-plant </th>
          <th width="150">Impact to End User </th>

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
          <td rowSpan={2}>High</td>
          <td>
            Failure may result in an acute health and/or safety risk for the
            manufacturing or assembly work.
          </td>
          <td>
            Failure may result in an acute health and/or safety risk for the
            manufacturing or assembly work.
          </td>
          <td>
            Affects safe operation of the vehicle and/or other vehicles, the
            health of driver or passenger(s) or road users or pedestrians.
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
            className={+element.innerHTML === 9 ? "selected" : ""}
            onClick={handler}
          >
            9
          </td>
          <td>Failure may result in in-plant regualatory noncompliance.</td>
          <td>Failure may result in in-plant regualatory noncompliance.</td>
          <td>Noncompliance with regulations.</td>
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
          <td rowSpan={2}>Moderately High</td>
          <td>
            100% of production run affected may to be scrapped. Failure may
            result in in-plant regulatory noncompliance or may have a chronic
            health and/or safety risk for the manufacturer or assembly worker.
          </td>
          <td>
            Line shutdown greater than normal production shift; Stop shippment
            possible; field repair or replacement required (Assembly to End
            User) other than for regulatory noncompliance) Failure may result in
            in-plant regulatory noncompliance or may have a chronic health
            and/or safety risk for the manufacturer or assembly worker.
          </td>
          <td>
            Loss of primary vehicle function necessary for normal driving during
            expected service life.{" "}
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

          <td>
            Production may have to be sorted and a portion (less than 100%
            scapped) Deviation from primary process. Decreased from line speed
            or added manpower
          </td>
          <td>
            Line shutdown from one hour up to full production shift; Stop
            shippment possible; field repair or replacement required (Assembly
            to End User) other than for regulatory noncompliance
          </td>
          <td>
            Degradation of primary vehicle function necessary for normal driving
            during expected service life.{" "}
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
          <td rowSpan={3}>Moderately Low</td>
          <td>
            100% of production may have to be reworked off line and accepted
          </td>
          <td>Line shutdown up to one hour</td>
          <td>Loss of secondary vehicle function</td>
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
          <td>
            A portion of the production run may have to be reworked and accepted
          </td>
          <td>
            Less than 100% of product affected; strong possibility for
            additional defective product; sort required; no line shutdown
          </td>
          <td>Degradation of secondary vehicle function.</td>

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
            100% of production run may have to be reworked in station before it
            is processed
          </td>
          <td>
            Deffective product triggers significant reaction plan; additional
            defective products not likely; sort not required
          </td>
          <td>
            Very objectionable appearance, sound, vibration, harshness, or
            haptics
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
          <td rowSpan={2}>Low</td>
          <td>
            A portion of the production run may have to be reworked in station
            before it is processed
          </td>
          <td>
            Deffective product triggers minor reactios plan; additional
            defective products not likely; sort not required.
          </td>
          <td>
            Moderately objectionable appearance, sound, vibration, harshness, or
            haptics
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
          <td>
            A portion of the production run may have to be reworked in station
            before it is processed
          </td>
          <td>
            Deffective product triggers minor reactios plan; additional
            defective products not likely; sort not required.
          </td>
          <td>
            Moderately objectionable appearance, sound, vibration, harshness, or
            haptics
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
            className={+element.innerHTML === 1 ? "selected" : ""}
            onClick={handler}
          >
            1
          </td>
          <td>Very Low</td>
          <td>No discernable effect</td>
          <td>No discernable effect or no effect</td>
          <td>No discernable effect</td>
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
