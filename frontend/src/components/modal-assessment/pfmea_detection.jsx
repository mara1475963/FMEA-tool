export const pfmeaDetection = (
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
        <td>10</td>
        <td rowSpan={2}>Very Low</td>
        <td>
          No testing or inspection method has been established or is known.
        </td>
        <td>The failure mode will not or cannot be detected.</td>

        <td></td>
      </tr>
      <tr>
        <td>9</td>

        <td>
          It is unlikely that the testing or inspection method will detect the
          failure mode.
        </td>
        <td>
          The failure mode is not easily detected through random or sporadic
          audits.
        </td>

        <td></td>
      </tr>
      <tr>
        <td>8</td>
        <td rowSpan={2}>Low</td>
        <td rowSpan={2}>
          Test or inspection method has not been proven to be effective and
          reliable (e.g. plant has little or no experience with method, gauge
          R&R results marginal on comparable process or this application..)
        </td>
        <td>
          Human inspection (visual, tactile, audible), or use of manual gauging
          (attribute or variable) that should detect the failure mode or failure
          cause.
        </td>

        <td></td>
      </tr>
      <tr>
        <td>7</td>

        <td>
          Machine-based detection (automated or semi-automated with notification
          by light, buzzer, etc.) or use of inspection equipment such as
          coordinate measuring machine that should detect failure mode or
          failure cause.
        </td>
        <td></td>
      </tr>
      <tr>
        <td>6</td>
        <td rowSpan={2}>Moderate</td>
        <td rowSpan={2}>
          Test or inspection method has been proven to be effective and reliable
          (e.g. plant has experience with method on identicial process or this
          application, gauge R&R results are acceptable ..)
        </td>
        <td>
          Human inspection (visual, tactile, audible), or use of manual gauging
          (attribute or variable) that will detect the failure mode or failure
          cause.
        </td>

        <td></td>
      </tr>
      <tr>
        <td>5</td>

        <td>
          Machine-based detection (automated or semi-automated with notification
          by light, buzzer, etc.) or use of inspection equipment such as
          coordinate measuring machine that will detect failure mode or failure
          cause.
        </td>
        <td></td>
      </tr>
      <tr>
        <td>4</td>
        <td rowSpan={3}>High</td>
        <td rowSpan={2}>
          System has been proven to be effective and reliable (e.g. plant has
          experience with method, gauge R&R results are acceptable on comparable
          process or this application..)
        </td>
        <td>
          Machine based method that will detect the failure mode downstream,
          prevent further processing or system will identify the product as
          discrepant and allow it automatically move forward in the process
          until the designated reject unload area. Discrepant products will be
          controlled by a robust system that will prevent the outflow of the
          product from the facility.
        </td>

        <td></td>
      </tr>
      <tr>
        <td>3</td>

        <td>
          Machine based detection that will detect the failure mode in-station,
          prevent further processing, or system will identify the product as
          discrepant and allow it automatically move forward in the process
          until the designated reject unload area. Discrepant products will be
          controlled by a robust system that will prevent the outflow of the
          product from the facility.
        </td>
        <td></td>
      </tr>
      <tr>
        <td>2</td>

        <td>
          Detection has been proven to be effective and reliable (e.g. plant has
          experience with method, error-proofing verifications, etc.).
        </td>
        <td>
          Machine detection that will detect the cause and prevent the failure
          mode (discrepant part) from being produced.
        </td>
        <td></td>
      </tr>
      <tr>
        <td>1</td>
        <td>Very High</td>
        <td colSpan={2}>
          Failure mode cannot be physically produced as-designed or processed,
          or detection methods proven to always detect the failure mode or
          failure cause.
        </td>

        <td></td>
      </tr>
    </tbody>
  </table>
);
