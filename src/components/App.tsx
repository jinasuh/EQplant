import * as React from 'react';
import { observer } from 'mobx-react';
import { IStoreProps } from 'src/store';
import { Step } from 'src/components/common/Step';

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

@observer
export class App extends React.Component<IStoreProps, void> {
    public componentDidMount() {
        $('.collapsible').collapsible();
    }

    public render() {
        const { steps, setStep, currentStepId, addData } = this.props.store;
        const stepCount = steps.length;

        return (
            <div>
                <nav style={{ height: '48px' }}>
                    <ul className="tabs tabs-transparent">
                        <li className="disabled" style={style.progress}>
                            {`Step ${currentStepId + 1} of ${stepCount}`}
                        </li>
                        {steps.map((step, idx) => {
                            const className = 'tab' + (step.isVisible ? '' : ' disabled');
                            const tabStyle = step.isDone ? { backgroundColor: '#26a69a' } : {};
                            return (
                                <li className={className} key={`step${idx}`} style={tabStyle}>
                                    <a
                                        href={`#step${idx}`}
                                        className="breadcrumb"
                                        style={style.tab}
                                        onClick={setStep.bind(this.props.store, step.isVisible ? idx : currentStepId)}
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
                {steps.map((step, idx) => {
                    return (
                        <div id={`step${idx}`} key={`step${idx}`} style={style.stepContainer}>
                            <Step {...this.props} stepStore={step} index={idx} addData={addData} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
