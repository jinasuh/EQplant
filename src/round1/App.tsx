import * as React from 'react';
import { observer } from 'mobx-react';
import { TaskType } from 'src/store';
import { IStoreProps } from 'src/round1/store';
import { ResponseTask } from 'src/round1/ResponseTask';
import { JudgeTask } from 'src/round1/JudgeTask';

@observer
export class App extends React.Component<IStoreProps, void> {
    public render() {
        const {
            addData,
            canSubmitResponseTask,
            canSubmitJudgeTask,
            accepted,
            conversationId,
            treatmentType,
            submittedResponse,
            taskType
        } = this.props.store;

        const getTask = () => {
            switch (taskType) {
                case TaskType.Response:
                    return (
                        <ResponseTask
                            addData={addData}
                            canSubmit={canSubmitResponseTask}
                            accepted={accepted}
                            conversationId={conversationId}
                            treatmentType={treatmentType}
                        />
                    );
                case TaskType.Judge:
                    return (
                        <JudgeTask
                            addData={addData}
                            canSubmit={canSubmitJudgeTask}
                            accepted={accepted}
                            conversationId={conversationId}
                            response={submittedResponse}
                        />
                    );
            }
        };
        return <div>{getTask()}</div>;
    }
}
