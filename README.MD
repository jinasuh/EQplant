# EQplant Experiments

## To start the dev server

1. Run `yarn` to download all dependencies (do this once)
2. `npm run start` will run round 1 experiment by default. `npm run round1` will run round 1, and `npm run round2` will run round 2.
3. Open the browser and navigate to http://localhost:3000?assignmentId=foo

## To produce a build

1. Run `yarn` to download all dependencies (do this once)
2. `npm run build` will produce a final build
3. Copy the content inside `body` node of the html file of your choice (e.g., `dist\round1.html`)
4. Paste the whole content into the source view of the Mturk task designer
5. Look for `// INSERT CONFIG CODE HERE` in the content, and replace it with the following

    For Round 1 Response Tasks

    ```
    window.taskType = ${TaskType};
    window.data = {};
    window.data.conversationId = ${ConversationId};
    window.data.treatmentType = ${TreatmentType};
    ```

    For Round 1 Judge Tasks

    ```
    window.taskType = ${TaskType};
    window.data = {};
    window.data.responseId = "${ResponseId}";
    window.data.conversationId = ${ConversationId};
    window.data.treatmentType = ${TreatmentType};
    window.data.response = "${Response}";
    ```

    For Round 2 Response Tasks

    ```
    window.taskType = ${TaskType};
    window.data = {};
    window.data.precision = "${Precision}";
    window.data.conversationIds = "${ConversationIds}";
    window.data.treatmentTypes = "${TreatmentTypes}";
    ```

    For Round 2 Judge Tasks

    ```
    window.taskType = ${TaskType};
    window.data = {};
    window.data.responseId = "${ResponseId}";
    window.data.precision = "${Precision}";
    window.data.conversationId = "${ConversationId}";
    window.data.treatmentType = "${TreatmentType}";
    window.data.response = "${Response}";
    ```

    For Round 3 Response Tasks

    ```
    window.taskType = ${TaskType};
    window.data = {};
    window.data.confidence = "${Confidence}";
    window.data.conversationIds = "${ConversationIds}";
    window.data.treatmentTypes = "${TreatmentTypes}";
    ```

    For Round 3 Judge Tasks

    ```
    window.taskType = ${TaskType};
    window.data = {};
    window.data.responseId = "${ResponseId}";
    window.data.confidence = "${Confidence}";
    window.data.conversationId = "${ConversationId}";
    window.data.treatmentType = "${TreatmentType}";
    window.data.response = "${Response}";
    ```

## Rounds

There are 3 rounds of experiments in EQplant.
You can generate the input files via

```
node tools/generateInput.js
```

Copy the output text into appropriate csv file.

### Conversations

There are 15 conversations.

* 1-5 are high-confidence angry conversations.
* 6-10 are low-confidence angry conversations.
* 11-15 are non-angry conversations.

### Round 1

#### Part 1

* 1 task = 1 conversation, 1 condition
* 10 conversations x 2 conditions = 20 tasks in input file
* 10 participants per task = 10 assignments per HIT
* Each row will have TaskType,TreatmentType,ConversationId
* 200 assignments x $0.05 = $10

#### Part 2

* 1 task = 1 response
* 200 responses from part 1 = 200 tasks in input file
* 3 participants per task = 3 assignments per HIT
* Each row will have TaskType,TreatmentType,ConversationId,ResponseId,Response
* ResponseId is the AssignmentId from which the response was pulled
* 600 assignments x $0.05 = $30

### Round 2

#### Part 1a

* 1 task = 15 conversations, 1 condition
* 4 conditions \* 10 randomized order = 40 tasks in input file
* 1 participant per task = 1 assignment per HIT
* Each row will have TaskType,Precision,TreatmentTypes,ConversationIds
* 40 assignments x $1 = $40

#### Part 1b

* 1 task = 15 conversations, 1 condition
* 4 conditions = 4 tasks in input file
* 10 participant per task = 10 assignment per HIT
* Each row will have TaskType,Precision,TreatmentTypes,ConversationIds
* 40 assignments x $1 = $40

#### Part 2

* 1 task = 1 response
* 600 responses from part 1 = 600 tasks in input file
* 3 participants per response = 3 assignments per HIT
* Each row will have TaskType,Precision,TreatmentType,ConversationId,ResponseId,Response
* ResponseId is the AssignmentId from which the response was pulled
* 1800 assignments x $0.05 = $90

### Round 3

#### Part 1a

* 1 task = 15 conversations, 1 condition
* 3 conditions \* 10 randomized order = 30 tasks in input file
* 1 participant per task = 1 assignment per HIT
* Each row will have TaskType,Confidence,TreatmentTypes,ConversationIds
* 30 assignments x $1 = $30

#### Part 1b

* 1 task = 15 conversations, 1 condition
* 3 conditions = 3 tasks in input file
* 10 participant per task = 10 assignment per HIT
* Each row will have TaskType,Confidence,TreatmentTypes,ConversationIds
* 30 assignments x $1 = $30

#### Part 2

* 1 task = 1 response
* 450 responses from part 1 = 450 tasks in input file
* 3 participants per response = 3 assignments per HIT
* Each row will have TaskType,Confidence,TreatmentType,ConversationId,ResponseId,Response
* ResponseId is the AssignmentId from which the response was pulled
* 1350 assignments x $0.05 = $67.5

Total Cost = $267.5 x 1.2 = **$321**
