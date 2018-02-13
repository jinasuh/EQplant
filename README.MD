1. Run `yarn` to download all dependencies
2. `npm run build` will produce a final build
3. Copy the content inside `body` node of `dist\index.html`
4. Paste the whole content into the source view of the Mturk task designer
5. Look for `// INSERT CONFIG CODE HERE` in the content, and replace it with the following

    For Response Tasks

    ```
        window.tastType = "${TaskType}";
        window.data = {};
        window.data.conversationId = "${ConversationId}";
        window.data.treatmentType = "${TreatmentType}";
    ```

    For Judge Tasks

    ```
        window.tastType = "${TaskType}";
        window.data = {};
        window.data.conversationId = "${ConversationId}";
        window.data.response = "${Response}";
    ```
