# EQplant Experiments

There are 3 rounds of experiments in EQplant.

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
        window.tastType = "${TaskType}";
        window.data = {};
        window.data.conversationId = "${ConversationId}";
        window.data.treatmentType = "${TreatmentType}";
    ```

    For Round 1 Judge Tasks

    ```
        window.tastType = "${TaskType}";
        window.data = {};
        window.data.conversationId = "${ConversationId}";
        window.data.response = "${Response}";
    ```
