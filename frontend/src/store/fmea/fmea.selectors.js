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

export const selectMainFunctions = createSelector([selectFMEAData], (data) =>
  data?.children?.reduce((acc, cur) => {
    cur.functions && acc.push(...cur.functions);
    return acc;
  }, [])
);

export const selectMainFailures = createSelector([selectFMEAData], (data) => {
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
});
