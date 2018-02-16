import * as React from 'react';
import { observer } from 'mobx-react';
import { studySetting } from 'src/round2/store';
import { Header, Paragraph, SubHeader, Warning } from 'src/components';

@observer
export class Introduction extends React.Component<{}, void> {
    public render() {
        const { compensation, duration } = studySetting;
        return (
            <div>
                <Header>Introduction</Header>
                <Paragraph>
                    Your task is to provide a <i>realistic</i> response to a conversation thread between two people. You
                    will be presented with different scenarios of conversations conducted through text messages, and you
                    will be asked to respond to the last message. Your task should take {duration} to complete. You will
                    be compensated {compensation}.
                </Paragraph>
                <Warning>
                    You may only accept one HIT in this group of tasks. We will only pay one unique assignment from one
                    worker.
                </Warning>
                <SubHeader>Eligibility</SubHeader>
                <Paragraph>
                    Anyone within US is eligible to complete this task. You must have professional or native English
                    proficiency.
                </Paragraph>

                <SubHeader>Data Collection</SubHeader>
                <Paragraph>
                    The data you submit will be anonymized and used solely for research purposes at the University of
                    Washington.
                </Paragraph>
            </div>
        );
    }
}
