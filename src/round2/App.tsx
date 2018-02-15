import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { StepContainer } from 'src/components/StepContainer';
import { IStepStore } from 'src/store/stepStore';
import { IStoreProps } from 'src/round2/store';
import { renderStep } from 'src/round2/steps';

@observer
export class App extends React.Component<IStoreProps, void> {
    public render() {
        const { store } = this.props;
        const { steps, currentStepIndex } = store;
        return (
            <StepContainer
                currentStepIndex={currentStepIndex}
                steps={steps}
                onRenderStep={this._renderStep}
                onSetStep={this._setStep}
            />
        );
    }

    @action.bound
    private _setStep(stepIndex: number) {
        this.props.store.currentStepIndex = stepIndex;
    }

    @action.bound
    private _renderStep(stepStore: IStepStore) {
        const { store } = this.props;
        return renderStep(stepStore, store);
    }
}
