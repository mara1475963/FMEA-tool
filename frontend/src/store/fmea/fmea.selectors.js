import { createSelector } from "reselect";

const selectFMEAReducer = (state) => state.fmea;

export const selectFMEAIsLoading = createSelector(
  [selectFMEAReducer],
  (fmea) => fmea.isLoading
);

export const selectFMEAHeader = createSelector(
  [selectFMEAReducer],
  (fmea) => fmea.header
);

export const selectFMEAData = createSelector(
  [selectFMEAReducer],
  (fmea) => fmea.data
);

export const selectNodeIDs = createSelector([selectFMEAReducer], (data) => {
  let IDs = [];
  IDs.push(data.selectedNode.id);
  data.selectedNode.functions?.forEach((func) => {
    IDs.push(func.id);
    func.failures?.forEach((fail) => {
      IDs.push(fail.id);
    });
  });
  return IDs;
});

export const selectMainFunctions = createSelector([selectFMEAData], (data) =>
  data?.children?.reduce((acc, cur) => {
    cur.functions && acc.push(...cur.functions);
    return acc;
  }, [])
);

const selectFailures = (data) => {
  let failures = [];
  data?.children?.forEach((child) => {
    child.functions &&
      failures.push(
        ...child.functions.reduce((acc, cur) => {
          if (cur.failures) {
            cur.failures.forEach((f) => {
              f["nodeID"] = child.id;
            });

            acc.push(...cur.failures);
          }
          return acc;
        }, [])
      );
  });
  return failures;
};

export const selectMainFailures = createSelector(
  [selectFMEAData],
  selectFailures
);

export const selectInitialAPs = createSelector([selectFMEAData], (data) => {
  const failures = selectFailures(data);
  const initialAPs = [0, 0, 0];
  failures.forEach((fm) => {
    fm.failures
      ?.filter((f) => f.depth === 2)
      .forEach((fc) => {
        if (fc.initialAP && fc.initialAP <= 250) {
          initialAPs[0]++;
        } else if (fc.initialAP > 250 && fc.initialAP <= 500) {
          initialAPs[1]++;
        } else if (fc.initialAP > 500 && fc.initialAP <= 1000) {
          initialAPs[2]++;
        }
      });
  });
  return initialAPs;
});

export const selectFinalAPs = createSelector([selectFMEAData], (data) => {
  const failures = selectFailures(data);
  const finalAPs = [0, 0, 0];
  failures.forEach((fm) => {
    fm.failures
      ?.filter((f) => f.depth === 2)
      .forEach((fc) => {
        if (fc.finalAP && fc.finalAP <= 250) {
          finalAPs[0]++;
        } else if (fc.finalAP > 250 && fc.finalAP <= 500) {
          finalAPs[1]++;
        } else if (fc.finalAP > 500 && fc.finalAP <= 1000) {
          finalAPs[2]++;
        }
      });
  });
  return finalAPs;
});
