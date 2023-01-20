// const failureEffects = [
//   {
//     id: 0,
//     name: "Fitment Flush with Substrate",
//   },
//   {
//     id: 0,
//     name: "Wheel Flange",
//   },
// ];

// const failureCauses = [
//   {
//     id: 0,
//     name: "Fitment Flush with Substrate",
//     PreventionControl: "String",
//     Occurance: "Number",
//     DetectionControl: "String",
//     Detection: "Number",
//     ActionPriority: "String",
//     PreventionAction: "String",
//     DetectionAction: "String",
//     ResposiblePersons: ["String"],
//     TargetDate: "asdsa",
//     Status: "String,",
//     ActionTaken: "String,",
//     CompletionDate: "String",
//     Occurance2: "Number",
//     Detection2: "Number",
//     ActionPriority2: "String,",
//     Remarks: "String",
//   },
// ];

// const failureModes = [
//   {
//     id: 0,
//     name: "Fitment Flush with Substrate",
//     failureCauses: [failureCauses[0]],
//     failureEffects: [failureEffects[0]],
//   },
//   {
//     id: 0,
//     name: "Fitment Flush with Substrate",
//     failureCauses: [failureCauses[0]],
//     failureEffects: [failureEffects[0]],
//   },
// ];

// const functions3 = [
//   {
//     id: 0,
//     name: "Fitment Flush with Substrate",
//     failureCauses: [failureCauses[0]],
//   },
//   {
//     id: 0,
//     name: "Wheel Flange",
//     failureCauses: [failureCauses[0]],
//   },
// ];
// const functions1 = [
//   {
//     id: 0,
//     name: "Fitment Flush with Substrate",
//     failureEffects: [failureEffects[0]],
//   },
//   {
//     id: 0,
//     name: "Fitment Flush with Substrate",
//     failureEffects: [failureEffects[0]],
//   },
//   {
//     id: 0,
//     name: "Fitment Flush with Substrate",
//     functions1: [functions1[0]],
//     functions3: [functions3[0]],
//     failureModes: [failureModes[0]],
//   },
// ];
// const functions2 = [
//   {
//     id: 0,
//     name: "Fitment Flush with Substrate",
//     functions1: [functions1[0]],
//     functions3: [functions3[0]],
//     failureModes: [failureModes[0]],
//   },
// ];

// const structure3 = [
//   {
//     id: 0,
//     name: "Wheel Flange",
//     functions3: [functions3[0]],
//   },
//   {
//     id: 0,
//     name: "Wheel Flange",
//     functions3: [functions3[0]],
//   },
// ];

// const structure2 = [
//   {
//     id: 0,
//     name: "Wheel Flange",
//     functions2: [functions2[0]],
//     children: [structure3[0], structure3[1]],
//   },
//   {
//     id: 0,
//     name: "Wheel Flange",
//     functions2: [functions2[0]],
//     children: [structure3[0], structure3[1]],
//   },
// ];
// export const structure1 = {
//   id: 0,
//   name: "Wheel Flange",
//   functions1: [functions1[0]],
//   children: [structure2[0], structure2[1]],
// };

//collection + depth
const failures = [
  {
    id: 0,
    depth: 0,
    name: "failureEffect",
  },
  {
    id: 0,
    depth: 2,
    name: "Failure Cause",
    PreventionControl: "String",
    Occurance: "Number",
    DetectionControl: "String",
    Detection: "Number",
    ActionPriority: "String",
    PreventionAction: "String",
    DetectionAction: "String",
    ResposiblePersons: ["String"],
    TargetDate: "asdsa",
    Status: "String,",
    ActionTaken: "String,",
    CompletionDate: "String",
    Occurance2: "Number",
    Detection2: "Number",
    ActionPriority2: "String,",
    Remarks: "String",
  },
];
failures.push({
  id: 0,
  depth: 1,
  name: "FailureMode",
  failures: [failures[0], failures[1]],
});
const functions = [
  {
    id: 0,
    depth: 0,
    name: "Function lvl1",
    failures: [failures[0]],
  },
  {
    id: 0,
    depth: 2,
    name: "Function lvl3",
    failures: [failures[1]],
  },
];

functions.push({
  id: 0,
  depth: 1,
  name: "Function lvl2",
  functions: [functions[0], functions[1]],
  failures: [failures[2]],
});

const structure3 = [
  {
    id: '0',
    depth:2,
    name: "Structuer 3",
    functions: [functions[1]],
  },
];

const structure2 = [
  {
    id: '1',
    depth:1,
    name: "Strucutre 2",
    functions: [functions[2]],
    children: [structure3[0]],
  },
];
export const structure1 = {
  id: '2',
  depth:0,
  name: "Structure 1",
  functions: [functions[0]],
  children: [structure2[0]],
};
