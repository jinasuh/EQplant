import * as React from 'react';
import { observer } from 'mobx-react';
import { IStoreProps, TaskType } from 'src/store';
import { ResponseTask } from 'src/components/ResponseTask';
import { JudgeTask } from 'src/components/JudgeTask';

@observer
export class App extends React.Component<IStoreProps, void> {
    public componentDidMount() {
        $('.collapsible').collapsible();
    }

    public render() {
        const {
            addData,
            getStudyInput,
            canSubmitResponseTask,
            canSubmitJudgeTask,
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
                        />
                    );
                case TaskType.Judge:
                    return <JudgeTask addData={addData} getStudyInput={getStudyInput} canSubmit={canSubmitJudgeTask} />;
            }
        };
        return <div>{getTask()}</div>;
    }
}
