import * as React from 'react';
import { observer } from 'mobx-react';
import { demographicQuestions, getEmpathyQuestion, TreatmentType, getConversation } from 'src/store';
import { DataId, studySetting } from 'src/round1/store';
import {
    MultipleChoiceQuestion,
    Header,
    Paragraph,
    SubHeader,
    Prompt,
    NotAccepted,
    Message,
    Messenger,
    Warning
} from 'src/components';
import { leftTopBox } from 'src/styles';

export interface IJudgeTaskProps {
    addData: (key: DataId, data: string) => void;
    conversationId: number;
    response: string;
    canSubmit: boolean;
    accepted: boolean;
}

@observer
export class JudgeTask extends React.Component<IJudgeTaskProps, void> {
    public render() {
        const { accepted } = this.props;
        return (
            <div className="container">
                <div className="section">{this._renderIntroduction()}</div>
                <div className="divider" />
                {accepted ? (
                    <div>
                        <div className="section">{this._renderTask()}</div>
                        <div className="divider" />
                        <div className="section">{this._renderSurvey()}</div>
                    </div>
                ) : (
                    <NotAccepted />
                )}
            </div>
        );
    }

    private _renderIntroduction() {
        const { compensation, duration } = studySetting;
        return (
            <div>
                <Header>Introduction</Header>
                <Paragraph>
                    Your task is to determine whether a response in a conversation is appropriate. You will be presented
                    with different scenarios of conversations conducted through text messages between two people. You
                    will be asked to determine whether the latest message in the conversation is appropriate given the
                    context. Your task should take {duration} to complete. You will be compensated {compensation}.
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

    private _renderTask() {
        const { response, conversationId, addData } = this.props;
        const conversation = getConversation(conversationId);
        const { from, to } = conversation;
        const empathyQuestion = getEmpathyQuestion(from, to);

        return (
            <div>
                <div style={leftTopBox}>
                    <Messenger conversation={conversation} treatmentType={TreatmentType.None} />
                    <div>
                        <Header>Task</Header>
                        <Paragraph>
                            Please read the conversation on the left between {from} and {to}.
                        </Paragraph>
                        <Paragraph>
                            This was {to}'s' most recent response to {from}:
                        </Paragraph>
                        <div style={{ maxWidth: '300px', margin: '30px 0' }}>
                            <Message
                                from={conversation.from}
                                message={response}
                                received={false}
                                treatmentType={TreatmentType.None}
                            />
                        </div>
                        <MultipleChoiceQuestion {...empathyQuestion} onSelect={addData} />
                    </div>
                </div>
            </div>
        );
    }

    private _renderSurvey() {
        const { addData } = this.props;
        const questions = demographicQuestions;

        const questionViews = questions.map(question => {
            return (
                <li key={question.name}>
                    <MultipleChoiceQuestion {...question} onSelect={addData} />
                </li>
            );
        });
        return (
            <div>
                <Header>Survey</Header>
                <Paragraph>Please answer a few more questions, and you are all set!</Paragraph>
                <ol className="browser-default">
                    {questionViews}
                    <li>
                        <Prompt required={false}>
                            Do you have any general comment you would like to provide? (optional)
                        </Prompt>
                        <textarea
                            type="text"
                            name="comment"
                            className="materialize-textarea"
                            placeholder="Your comments go here..."
                            onChange={this._onChange.bind(this)}
                        />
                    </li>
                </ol>
            </div>
        );
    }

    private _onChange(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        const { addData } = this.props;
        addData('response', event.currentTarget.value);
    }
}
