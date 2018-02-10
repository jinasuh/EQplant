import * as React from 'react';
import { observer } from 'mobx-react';
import { IStepStore } from 'src/store/stepStore';
import { TaskStore, DataId } from 'src/store';

const style = {
    container: {
        margin: '25px'
    }
};

export interface IStepProps {
    stepStore: IStepStore;
    index: number;
    addData: (key: DataId, data: string) => void;
}

@observer
export class Step extends React.Component<IStepProps & { store: TaskStore }, void> {
    public render() {
        const { store, stepStore, index } = this.props;
        const { completeStep, accepted, addData } = store;
        const { stepView, completeText, canProceed } = stepStore;

        const StepView = stepView;

        return (
            <div style={style.container}>
                <StepView stepStore={stepStore} index={index} addData={addData} />
                <div className="divider" style={{ marginBottom: '10px' }} />
                {!accepted ? (
                    <a disabled className="waves-effect waves-light btn" onClick={() => completeStep(index)}>
                        You must accept the task to continue
                    </a>
                ) : null}
                {accepted && canProceed ? (
                    <a className="waves-effect waves-light btn" onClick={() => completeStep(index)}>
                        {completeText}
                    </a>
                ) : null}
            </div>
        );
    }
}
