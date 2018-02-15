import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { IStepStore } from 'src/store/stepStore';

const style = {
    icon: {
        lineHeight: '48px',
        marginLeft: '5px',
        fontSize: '12px'
    },
    stepContainer: {},
    progress: {
        display: 'inline-block',
        textAlign: 'center',
        lineHeight: '48px',
        height: '48px',
        padding: '0 10px',
        textTransform: 'uppercase',
        backgroundColor: '#26a69a'
    },
    tab: {
        padding: '0 10px'
    }
};

export interface IStepContainerProps {
    steps: IStepStore[];
    currentStepIndex: number;
    onRenderStep(step: IStepStore): JSX.Element;
    onSetStep(stepIndex: number): void;
}

@observer
export class StepContainer extends React.Component<IStepContainerProps, void> {
    public render() {
        const { steps, currentStepIndex, onRenderStep } = this.props;
        return (
            <div>
                <nav style={{ height: '48px' }}>
                    <ul className="tabs tabs-transparent">
                        <li className="disabled" style={style.progress}>
                            {`Step ${currentStepIndex + 1} of ${steps.length}`}
                        </li>
                        {steps.map((step, idx) => {
                            const className = 'tab' + (step.isVisible ? '' : ' disabled');
                            const tabStyle = step.isDone ? { backgroundColor: '#26a69a' } : {};
                            return (
                                <li className={className} key={`${step.id}`} style={tabStyle}>
                                    <a
                                        href={`#${step.id}`}
                                        className="breadcrumb"
                                        style={style.tab}
                                        onClick={() => this._setStep.bind(step.isVisible ? idx : currentStepIndex)}
                                        disabled={!step.isVisible}>
                                        {idx + 1}. {step.title}
                                        {step.isComplete ? (
                                            <i className="material-icons right" style={style.icon}>
                                                check_circle
                                            </i>
                                        ) : null}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                {steps.map(onRenderStep)}
            </div>
        );
    }

    @action.bound
    private _setStep(stepIndex: number) {
        this.props.onSetStep(stepIndex);
    }
}
