export const pfmeaOccurance = (
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
        <td>10</td>
        <td>Extremly High</td>
        <td>None</td>
        <td>No prevention controls.</td>
        <td></td>
      </tr>
      <tr>
        <td>9</td>
        <td rowSpan={2}>Very High</td>
        <td>Behavioral</td>
        <td>
          Prevention Controls will have little effect in preventing failure
          cause.
        </td>

        <td></td>
      </tr>
      <tr>
        <td>8</td>

        <td>Behavioral</td>
        <td>
          Prevention Controls will have little effect in preventing failure
          cause.
        </td>

        <td></td>
      </tr>
      <tr>
        <td>7</td>
        <td rowSpan={2}>High</td>
        <td rowSpan={4}>Behavioral or Technical</td>
        <td rowSpan={2}>
          Prevention controls somewhat effective in preventing the failure
          cause.
        </td>

        <td></td>
      </tr>
      <tr>
        <td>6</td>

        <td></td>
      </tr>
      <tr>
        <td>5</td>
        <td rowSpan={2}>Moderate</td>
        <td rowSpan={2}>
          Prevention controls are effective in preventing the failure cause.
        </td>

        <td></td>
      </tr>
      <tr>
        <td>4</td>

        <td></td>
      </tr>
      <tr>
        <td>3</td>
        <td>Low</td>
        <td rowSpan={2}>"Best Practices: Behavioral or Technical"</td>
        <td rowSpan={2}>
          Prevention controls are highly effective in preventing the failure
          cause.
        </td>

        <td></td>
      </tr>
      <tr>
        <td>2</td>
        <td>Very Low</td>

        <td></td>
      </tr>
      <tr>
        <td>1</td>
        <td>Extremly Low</td>
        <td>Technical</td>
        <td>
          Prevention controls are extremely effective in preventing the failure
          cause due to design (e.g. Part geometry) or process (e.g. Fixture or
          Tool design). Intent of prevention controls - Failure Mode cannot be
          physically produced due to the Failure Cause.
        </td>

        <td></td>
      </tr>
    </tbody>
  </table>
);
