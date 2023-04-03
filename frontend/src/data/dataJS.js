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
    id: "0",
    depth: 0,
    name: "failureEffect",
  },
  {
    id: "1",
    depth: 2,
    closed: false,
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
  id: "2",
  depth: 1,
  name: "FailureMode",
  initialSeverity: 5,
  failures: [failures[0], failures[1]],
});
const functions = [
  {
    id: "3",
    depth: 0,
    name: "Function lvl1",
    failures: [failures[0]],
  },
  {
    id: "4",
    depth: 2,
    name: "Function lvl3",
    failures: [failures[1]],
  },
];

functions.push({
  id: "5",
  depth: 1,
  name: "Function lvl2",
  functions: [functions[0], functions[1]],
  failures: [failures[2]],
});

const structure3 = [
  {
    id: "6",
    depth: 2,
    name: "Structure 3",
    functions: [functions[1]],
  },
];

const structure2 = [
  {
    id: "7",
    depth: 1,
    name: "Structure 2",
    functions: [functions[2]],
    children: [structure3[0]],
  },
];

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
  companyName: "",
  location: "",
  customerName: "",
  modelYear: "",
  subject: "",
  responsibility: "",
  fmeaStartDate: "",
  fmeaRevisionDate: "",
  fmeaIDNumber: "",
  confidentialityLevel: "",
  crossfunctionalTeam: "",
  type: pfmeaHeaders,
  //analysis: structure1,
};

export const structure1 = {
  id: "8",
  depth: 0,
  name: "Structure 1",
  // functions: [functions[0]],
  // children: [structure2[0]],
  logs: [
    {
      date: "1/1/2001",
      description: "nvm",
      relatedDocuments: "asdsad",
      updated: true,
    },
  ],
  header: header,
  dfmeaExamples: {
    severityExamples: ["", "", "", "", "", "", "", "", "", ""],
    occuranceExamples: ["", "", "", "", "", "", "", "", "", ""],
    detectionExamples: ["", "", "", "", "", "", "", "", "", ""],
  },
  pfmeaExamples: {
    severityExamples: ["", "", "", "", "", "", "", "", "", ""],
    occuranceExamples: ["", "", "", "", "", "", "", "", "", ""],
    detectionExamples: ["", "", "", "", "", "", "", "", "", ""],
  },
  functions: [],
  children: [],
};

export const severity = {
  effects: [
    {
      name: "Very High",
      numValues: [10, 9],
      criteria: [
        "Affects safe operation of the vehicle and/or other vehicles, the health of driver or passenger(s) or road users or pedestrians",
        "Noncompliance with regulations",
      ],
      examples: [``, ``],
    },
    {
      name: "Moderately High",
      numValues: [8, 7],
      criteria: [
        "Loss of primary vehicle function necessary for normal driving during expected service life.",
        "Degradation of primary vehicle function necessary for normal driving during expected service life.",
      ],
      examples: [``, ``],
    },
    {
      name: "Moderately Low",
      numValues: [6, 5, 4],
      criteria: [
        "Loss of secondary vehicle function.",
        "Degradation of secondary vehicle function.",
        "Very objectionable appearance, sound, vibration, harshness, or haptics.",
      ],
      examples: [``, ``, ``],
    },
    {
      name: "Low",
      numValues: [3, 2],
      criteria: [
        "Moderately objectionable appearance, sound, vibration, harshness, or haptics.",
        "Slightily objectionable appearance, sound, vibration, harshness, or haptics.",
      ],
      examples: [``, ``],
    },
    {
      name: "Very Low",
      numValues: [1],
      criteria: ["No discernable effect"],
      examples: [``],
    },
  ],
};

export const occurence = {
  effects: [
    {
      name: "Extremly High",
      numValues: [10],
      criteria: [
        `First application of new technology whithout operating experience and/or uncontrolled operating conditions. No product verfication and/ or validation experience.
        Standards do not exist and best practices have not yet been determined. Prevention controls not able to predict field performance or do not exist.`,
      ],
      examples: [``],
    },
    {
      name: "Very High",
      numValues: [9, 8],
      criteria: [
        `First use of design with technical innovations or materials within the company. New application or change in duty cycle / operating conditions. No product verification and/or validation experience. 
      Prevention controls not targeted to identify performance to specific requirements.`,
        `First use of design with technical innovations or materials in a new application. New application or change in duty cycle/ operating conditions. No product verification and/or validation experience.
      Few existing standards and best practices, not directly applicable for this design. Prevention controls not a realible indicator of field performance.`,
      ],
      examples: [``, ``],
    },
    {
      name: "High",
      numValues: [7, 6],
      criteria: [
        `New design based on similar technology and materials. New application or change in duty cycle/ operating conditions. No product verification and/or validation experience.
      Standards, best practices, and design rules apply to the baseline design, but not the innovations. Prevention controls provide limited indication of performance.`,
        `Similar to previous designs, using existing technology and materials. Similar application, with changes in duty cycle or operating conditions. Previous testing or field experience.
      Standards and design rules exist but are insufficient to ensure that the failure cause will not occur. Prevention controls provide some ability to prevent a failure cause.`,
      ],
      examples: [``, ``],
    },
    {
      name: "Moderate",
      numValues: [5, 4],
      criteria: [
        `Detail changes to previous design, using proven technology and materials. Similar application, duty cycle or operating conditions. Previous testing or field experience, or new design with some test experience related to te failure.
      Design addresses lessons learned from previous designs. Best practices re-evaluated for this design but have not yet been proven. Prevention controls capable of finding deficiens `,
        ``,
      ],
      examples: [``, ``],
    },
    {
      name: "Low",
      numValues: [3],
      criteria: [
        `Detail changes to known design (same application, with minor change in duty cycle or operating conditions) and testing or field experience under comparable operating conditions, or new design with  succesfully completed test procedure.
      Design expected to conform to Standards and Best Practices`,
      ],
      examples: [``],
    },
    {
      name: "Very Low",
      numValues: [2],
      criteria: [
        `Almost identical mature design with long term field exposure. Same application, with comparable duty cycle and operating conditions. Testing or field experience under comparable operating conditions.
      Design expected to conform to standards and best practices, considering Lessons Learned from previous design, with significant margin of confidence. Prevention controls capable of finding defincies in the product related to the failure cause and indicate confidence in design conformance.`,
      ],
      examples: [``],
    },
    {
      name: "Extremly Low",
      numValues: [1],
      criteria: [
        `Failure eliminated through prevention control and failure cause is not possible by design.`,
      ],
      examples: [``],
    },
  ],
};

// export const detection = {
//   effects: [
//     {
//       name: "Very Low",
//       numValues: [10, 9],
//       criteria: [
//         `Test procedure yet to be developed.`,
//         `Test method not designed specifically to detect failure mode or cause.`,
//       ],
//       opportunity: [
//         `Test method not defined`,
//         `Pass-Fail, Test-to-Fail, Degradation Testing`,
//       ],
//       examples: [``, ``],
//     },
//     {
//       name: "Low",
//       numValues: [8, 7],
//       criteria: [`New test method; not proven.`, ``],
//       opportunity: [
//         `Pass-Fail, Test-to-Fail, Degradation Testing`,
//         `Pass-Fail Testing`,
//       ],
//       examples: [``, ``],
//     },
//     {
//       name: "Moderate",
//       numValues: [6, 5],
//       criteria: [
//         `Proven test method for verification of functionality or validation of performance, quality, reliability and durability; planned timing is later in the product development cycle such that test failures may result in production delays for re-design and/or re-tooling.`,
//         ``,
//       ],
//       opportunity: [`Test-to-Failure`, `Degradation Testing`],
//       examples: [``, ``],
//     },
//     {
//       name: "High",
//       numValues: [4, 3, 2],
//       criteria: [
//         `Proven test for verification of functionality or validation of performance, quality, reliability and durability; planned timming is sufficient to modify production tools before release for production.`,
//         ``,
//         ``,
//       ],
//       opportunity: [
//         `Pass-Fail Testing`,
//         `Test-to-Failure`,
//         `Degradation Testing`,
//       ],
//       examples: [``, ``, ``],
//     },
//     {
//       name: "Very High",
//       numValues: [1],
//       criteria: [
//         `Prior testing confirmed that failure mode or cause cannot occur, or detection methods  proven to always detect the failure mode or failure cause.`,
//       ],
//       opportunity: [``],
//       examples: [``],
//     },
//   ],
// };

// export const header = {
//   companyName: "ABC Gmbh",
//   location: "Bratislava",
//   customerName: "VW Group",
//   modelYear: "2006",
//   subject: "instrument J77",
//   responsibility: "Product Eng.",
//   fmeaStartDate: "1.1.2023",
//   fmeaRevisionDate: "2.2.2023",
//   fmeaIDNumber: "1",
//   confidentialityLevel: "Proprietary",
//   crossfunctionalTeam: "Product Eng, AT,...",
//   type: pfmeaHeaders,
//   //analysis: structure1,
// };
