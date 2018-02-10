import * as React from 'react';
import { observer } from 'mobx-react';
import { StepStoreBase, studySetting } from 'src/store';
import { IStepProps } from 'src/components/common/Step';

export class WelcomeStore extends StepStoreBase {
    constructor() {
        super('Welcome', Welcome, 'I understand the requirements');
        this.isVisible = true;
        this.canProceed = true;
    }
}

@observer
export class Welcome extends React.Component<IStepProps, void> {
    public render() {
        const { compensation, duration } = studySetting;
        return (
            <div>
                <h5>Introduction</h5>
                <p>
                    Your task is to provide a <i>realistic</i> response to a conversation thread from text messaging
                    communications between two people. Other workers will judge whether your response is appropriate for
                    the conversation. Your task should take {duration} to complete. You will be compensated{' '}
                    {compensation}.
                </p>

                <h5>Eligibility</h5>
                <p>
                    Anyone within US is eligible to complete this task. You must have professional or native English
                    proficiency.
                </p>

                <h5>Data Collection</h5>
                <p>
                    The data you submit will be anonymized and used solely for research purposes at the University of
                    Washington.
                </p>
            </div>
        );
    }
}
