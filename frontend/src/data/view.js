{
    id: String
    depth: Number
    name: String
    functions: [{
        id: String
        depth: Number
        name: String
        failures: [{
            id: String
            depth: Number
            name: String
          }]
      }]
    children: [{
        id: String
        depth: Number
        name: String
        functions: [{
          id: String
          depth: Number
          name: String
          failures: [{
            id: String
            depth: Number
            name: String
            initialSeverity: Number
            failures: Object[]
          }]
        }]
        children: [{
            id: String
            depth: Number
            name: String
            functions: {
              id: String
              depth: Number
              name: String
              failures: [{
                id: String
                depth: Number
                closed: Boolean
                name: String
                currentPreventionControl: String
                intialOccurance: Number
                currentDetectionControl: String
                initialDetection: Number
                initialRPN: Number
                preventionAction: String
                detectionAction: String
                resposiblePersons: String
                targetDate: String
                status: String
                actionTaken: String
                completionDate: String
                finalSeverity: Number
                finalOccurance: Number
                finalDetection: Number
                finalRPN: Number
              }]
            }
          }]
      }]
    logs: Object[]
    header: Object
    dfmeaExamples: Object[]
    pfmeaExamples: Object[]
  };