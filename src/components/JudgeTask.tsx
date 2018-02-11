import * as React from 'react';
import { observer } from 'mobx-react';
import {
    DataId,
    studySetting,
    demographicQuestions,
    empathyQuestion,
    StudyInputId,
    TreatmentType,
    getConversation
} from 'src/store';
import { MultipleChoiceQuestion, Header, Paragraph, SubHeader, Prompt, Card, NotAccepted } from 'src/components/common';
import { Messenger } from 'src/components/dialog/Messenger';

export const phoneShellUrl = require('src/assets/iPhone_shell_1.svg') as string;

export interface IJudgeTaskProps {
    addData: (key: DataId, data: string) => void;
    getStudyInput: (key: StudyInputId) => string;
    canSubmit: boolean;
    accepted: boolean;
}

@observer
export class JudgeTask extends React.Component<IJudgeTaskProps, void> {
    public render() {
        const { canSubmit, accepted } = this.props;
        return (
            <div className="container">
                <form>
                    <div className="row">{this._renderIntroduction()}</div>
                    {accepted ? (
                        <div>
                            <div className="row">{this._renderTask()}</div>
                            <div className="row">{this._renderSurvey()}</div>
                            <a className="waves-effect waves-light btn" disabled={!canSubmit}>
                                Submit
                            </a>
                        </div>
                    ) : (
                        <NotAccepted />
                    )}
                </form>
            </div>
        );
    }

    private _renderIntroduction() {
        const { compensation, duration } = studySetting;
        return (
            <div>
                <Header>Introduction</Header>
                <Paragraph>
                    Your task is to judge whether or not the provided response is <i>empathetic</i> given a conversation
                    thread from text messaging communications between two people. Your task should take {duration} to
                    complete. You will be compensated {compensation}.
                </Paragraph>

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
        const { getStudyInput, addData } = this.props;
        const sender = getStudyInput('senderName');
        const responder = getStudyInput('responderName');
        const response = getStudyInput('response');
        const conversationId = getStudyInput('conversationId');
        const conversation = getConversation(conversationId);

        return (
            <div>
                <Header>Task</Header>
                <Paragraph>
                    Please read the conversation between {sender} and {responder} on the left.{' '}
                </Paragraph>
                <div className="col s4">
                    <Messenger conversation={conversation} treatmentType={TreatmentType.None} />
                </div>
                <div className="col s8">
                    <Paragraph>
                        To the last message that {sender} sent, {responder} has responded with the message below.
                    </Paragraph>
                    <Card>"{response}"</Card>
                    <MultipleChoiceQuestion {...empathyQuestion} onSelect={addData} />
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
