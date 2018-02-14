import * as React from 'react';
import { observer } from 'mobx-react';
import { DataId, studySetting, demographicQuestions, StudyInputId, TreatmentType, getConversation } from 'src/store';
import { MultipleChoiceQuestion, Header, Paragraph, SubHeader, Prompt, NotAccepted, Messenger } from 'src/components';
import { leftTopBox } from 'src/styles';

export interface IResponseTaskProps {
    addData: (key: DataId, data: string) => void;
    getStudyInput: (key: StudyInputId) => string;
    canSubmit: boolean;
    accepted: boolean;
}

@observer
export class ResponseTask extends React.Component<IResponseTaskProps, void> {
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
                    Your task is to provide a <i>realistic</i> response to a conversation thread between two people. You
                    will be presented with different scenarios of conversations conducted through text messages, and you
                    will be asked to respond to the last message. Your task should take {duration} to complete. You will
                    be compensated {compensation}.
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
        const { getStudyInput } = this.props;
        const treatmentType = Number(getStudyInput('treatmentType'));
        const treatment = treatmentType !== TreatmentType.None;
        const conversationId = getStudyInput('conversationId');
        const conversation = getConversation(conversationId);
        const { from, to } = conversation;

        const getHeader = () => {
            if (treatment) {
                return (
                    <div>
                        <Header>Task</Header>
                        <Paragraph>
                            You are using a new chat app to communicate with someone. As you use the app, the chat
                            assistant will help you understand more about your contacts as you chat with them.
                        </Paragraph>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Header>Task</Header>
                    </div>
                );
            }
        };

        return (
            <div>
                <div style={leftTopBox}>
                    <Messenger conversation={conversation} treatmentType={treatmentType} />
                    <div>
                        {getHeader()}
                        <Paragraph>
                            You are {to}. You are chatting with {from} through text messages.
                        </Paragraph>
                        <div style={{ marginTop: '40px' }}>
                            <Prompt>
                                Please read the conversation to the left. Consider the context of the messages and write
                                a realistic and appropriate response to the latest message from {from}.
                            </Prompt>
                        </div>
                        <textarea
                            name="response"
                            placeholder="Your response goes here..."
                            className="materialize-textarea"
                            onChange={this._onChange.bind(this)}
                        />
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
