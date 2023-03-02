export const dmfmeaDetection = (
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
        <td class="">10</td>
        <td rowspan="2">Very Low</td>
        <td>Test procedure yet to be developed.</td>
        <td>Test method not defined</td>
        <td>
          <textarea id="w3review" name="w3review"></textarea>
        </td>
      </tr>
      <tr>
        <td class="">9</td>
        <td>
          Test method not designed specifically to detect failure mode or cause.
        </td>
        <td>Pass-Fail, Test-to-Fail, Degradation Testing</td>
        <td>
          <textarea id="w3review" name="w3review"></textarea>
        </td>
      </tr>
      <tr>
        <td class="">8</td>
        <td rowspan="2">Low</td>
        <td>New test method; not proven.</td>
        <td>Pass-Fail, Test-to-Fail, Degradation Testing</td>
        <td>
          <textarea id="w3review" name="w3review"></textarea>
        </td>
      </tr>
      <tr>
        <td class="">7</td>
        <td rowspan="3">
          Proven test method for verification of functionality or validation of
          performance, quality, reliability and durability; planned timing is
          later in the product development cycle such that test failures may
          result in production delays for re-design and/or re-tooling.
        </td>
        <td>Pass-Fail Testing</td>
        <td>
          <textarea id="w3review" name="w3review"></textarea>
        </td>
      </tr>
      <tr>
        <td class="">6</td>
        <td rowspan="2">Moderate</td>
        <td>Test-to-Failure</td>
        <td>
          <textarea id="w3review" name="w3review"></textarea>
        </td>
      </tr>
      <tr>
        <td class="">5</td>
        <td>Degradation Testing</td>
        <td>
          <textarea id="w3review" name="w3review"></textarea>
        </td>
      </tr>
      <tr>
        <td class="">4</td>
        <td rowspan="3">High</td>
        <td rowspan="3">
          Proven test for verification of functionality or validation of
          performance, quality, reliability and durability; planned timming is
          sufficient to modify production tools before release for production.
        </td>
        <td>Pass-Fail Testing</td>
        <td>
          <textarea id="w3review" name="w3review"></textarea>
        </td>
      </tr>
      <tr>
        <td class="">3</td>
        <td>Test-to-Failure</td>
        <td>
          <textarea id="w3review" name="w3review"></textarea>
        </td>
      </tr>
      <tr>
        <td class="">2</td>
        <td>Degradation Testing</td>
        <td>
          <textarea id="w3review" name="w3review"></textarea>
        </td>
      </tr>
      <tr>
        <td class="">1</td>
        <td rowspan="1">Very High</td>
        <td colspan="2">
          Prior testing confirmed that failure mode or cause cannot occur, or
          detection methods proven to always detect the failure mode or failure
          cause.
        </td>
        <td>
          <textarea id="w3review" name="w3review"></textarea>
        </td>
      </tr>
    </tbody>
  </table>
);
