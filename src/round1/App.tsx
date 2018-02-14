import * as React from 'react';
import { observer } from 'mobx-react';
import { IStoreProps, TaskType } from 'src/store';
import { ResponseTask } from 'src/round1/ResponseTask';
import { JudgeTask } from 'src/round1/JudgeTask';

@observer
export class App extends React.Component<IStoreProps, void> {
    public render() {
        const {
            addData,
            getStudyInput,
            canSubmitResponseTask,
            canSubmitJudgeTask,
            accepted,
            studyInput: { taskType }
        } = this.props.store;

        const getTask = () => {
            switch (taskType) {
                case TaskType.Response:
                    return (
                        <ResponseTask
                            addData={addData}
                            getStudyInput={getStudyInput}
                            canSubmit={canSubmitResponseTask}
                            accepted={accepted}
                        />
                    );
                case TaskType.Judge:
                    return (
                        <JudgeTask
                            addData={addData}
                            getStudyInput={getStudyInput}
                            canSubmit={canSubmitJudgeTask}
                            accepted={accepted}
                        />
                    );
            }
        };
        return <div>{getTask()}</div>;
    }
}
