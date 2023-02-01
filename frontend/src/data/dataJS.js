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
    id: 1,
    depth: 2,
    name: "Failure Cause",
    currentPreventionControl: "",
    intialOccurance: "",
    currentDetectionControl: "",
    initialDetection: "",
    initialAP: "",
    preventionAction: "",
    detectionAction: "",
    resposiblePersons: "",
    targetDate: "",
    status: "",
    actionTaken: "",
    completionDate: "",
    finalSeverity: "",
    finalOccurance: "",
    finalDetection: "",
    finalAP: "",
  },
];
failures.push({
  id: 2,
  depth: 1,
  name: "FailureMode",
  initialSeverity: 5,
  failures: [failures[0], failures[1]],
});
const functions = [
  {
    id: 3,
    depth: 0,
    name: "Function lvl1",
    failures: [failures[0]],
  },
  {
    id: 4,
    depth: 2,
    name: "Function lvl3",
    failures: [failures[1]],
  },
];

functions.push({
  id: 5,
  depth: 1,
  name: "Function lvl2",
  functions: [functions[0], functions[1]],
  failures: [failures[2]],
});

const structure3 = [
  {
    id: 6,
    depth: 2,
    name: "Structure 3",
    functions: [functions[1]],
  },
];

const structure2 = [
  {
    id: 7,
    depth: 1,
    name: "Structure 2",
    functions: [functions[2]],
    children: [structure3[0]],
  },
];
export const structure1 = {
  id: 8,
  depth: 0,
  name: "Structure 1",
  functions: [],
  children: [],
};

export const dfmeaHeaders = {
  name: "DFMEA",
  structure1: "1. Next Higher Level",
  structure2: "2.Focus Element",
  structure3: "3. Next Lower Level of Characteristic Type",
  function1: "1. Next Higher Level Function and Requirement",
  function2: "2. Focus Element Function and Requirement",
  function3: "3. Next Lower Level Function and Requirement of Characteristic",
};
export const pfmeaHeaders = {
  name: "PFMEA",
  structure1:
    "1. Process Item System, Subsystem, Part Element or Name of Process",
  structure2: "2. Process Step No. And Name of Focus Element",
  structure3: "3. Process Work Element 4M Type",
  function1:
    "1. Function of the Process Item Function of System, Subsystem, Part Element or Name of Process",
  function2:
    "2. Function of the Process Step and Product Characteristics (Quantitative value is optional)",
  function3:
    "3. Function of the Process Work Element and Process Characteristics",
};

export const header = {
  companyName: "ABC Gmbh",
  location: "Bratislava",
  customerName: "VW Group",
  modelYear: "2006",
  subject: "instrument J77",
  responsibility: "Product Eng.",
  fmeaStartDate: "1.1.2023",
  fmeaRevisionDate: "2.2.2023",
  fmeaIDNumber: "1",
  confidentialityLevel: "Proprietary",
  crossfunctionalTeam: "Product Eng, AT,...",
  type: pfmeaHeaders,
  //analysis: structure1,
};
